
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

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  age: z.coerce.number().min(18, 'Você deve ter pelo menos 18 anos.').max(99, 'Idade inválida.'),
  gender: z.enum(['Masculino', 'Feminino', 'Outro'], { required_error: 'Selecione seu gênero.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function Step2() {
  const router = useRouter();
  const { answers, setAnswer } = useQuiz();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: answers.name || '',
      age: answers.age || undefined,
      gender: answers.gender,
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
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      {['Masculino', 'Feminino', 'Outro'].map((gender) => (
                        <FormItem key={gender}>
                          <FormControl>
                            <RadioGroupItem value={gender} id={gender} className="sr-only peer"/>
                          </FormControl>
                           <Label htmlFor={gender} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-16 cursor-pointer">
                            {gender}
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
