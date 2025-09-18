
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const genderEnum = z.enum(['Masculino', 'Feminino'], { required_error: 'Selecione seu gênero.' });

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  age: z.coerce.number().min(18, 'Você deve ter pelo menos 18 anos.').max(99, 'Idade inválida.'),
  gender: genderEnum,
});

type FormData = z.infer<typeof formSchema>;

const genderOptions = [
  { value: 'Masculino', icon: <User className="h-8 w-8" /> },
  { value: 'Feminino', icon: <User className="h-8 w-8" /> },
];

export default function Step2() {
  const router = useRouter();
  const { answers, setAnswer } = useQuiz();
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);


  useEffect(() => {
    async function fetchLocation() {
      setLoadingLocation(true);
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        setUserLocation(`${data.city}, ${data.region_code}`);
      } catch (error) {
        console.error("Error fetching user's location:", error);
        // Don't set a message on error, just hide the component
        setUserLocation(null);
      } finally {
        setLoadingLocation(false);
      }
    }

    fetchLocation();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: answers.name || '',
      age: answers.age || undefined,
      gender: answers.gender ? genderEnum.parse(answers.gender) : undefined,
    },
  });

  function onSubmit(data: FormData) {
    setAnswer('name', data.name);
    setAnswer('age', data.age);
    setAnswer('gender', data.gender);
    router.push('/quiz/3');
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Conte-nos sobre você</CardTitle>
        <CardDescription>Preencha seu perfil para ver se existem conexões reais e cristãs perto de você.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="h-12"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua idade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="25" {...field} className="h-12"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
                {loadingLocation && <Skeleton className="h-12 w-full" />}
                {!loadingLocation && userLocation && (
                    <div className="bg-accent/50 border border-accent rounded-lg p-3 text-center text-sm text-accent-foreground">
                        <p className="font-semibold flex items-center justify-center gap-2">
                           <MapPin className="h-4 w-4" /> Detectamos que você está em {userLocation}
                        </p>
                        <p className="text-xs">Há cristãos perto de você... Vamos buscar quem está próximo e compartilha da mesma fé.</p>
                    </div>
                )}
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Seu gênero</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {genderOptions.map((option) => (
                        <FormItem key={option.value}>
                          <FormControl>
                            <RadioGroupItem value={option.value} id={option.value} className="sr-only peer"/>
                          </FormControl>
                           <Label htmlFor={option.value} className="flex flex-col items-center justify-center space-y-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-24 cursor-pointer">
                            {option.icon}
                            <span className="font-semibold">{option.value}</span>
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center pt-4">
              <Button type="submit" size="lg" className="btn-gradient px-12 py-8 rounded-full shadow-lg text-lg">
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
