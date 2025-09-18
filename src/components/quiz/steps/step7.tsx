'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

const locationOptions = [
    'Sim, seria perfeito conhecer alguém por aqui',
    'Estou disposto(a) a expandir meu círculo social',
    'Gostaria de participar de grupos cristãos locais',
    'Acredito que Deus pode usar qualquer meio',
];

export default function Step7() {
  const router = useRouter();
  const { toast } = useToast();
  const { answers, setAnswer } = useQuiz();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(answers.location);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        setUserLocation(`${data.city}, ${data.country_name}`);
      } catch (error) {
        console.error("Error fetching user's location:", error);
        setUserLocation('Não foi possível obter a localização');
      } finally {
        setLoadingLocation(false);
      }
    }

    fetchLocation();
  }, []);


  const handleSelect = (option: string) => {
    setSelectedLocation(option);
  };

  const handleSubmit = () => {
    if (selectedLocation) {
      setAnswer('location', selectedLocation);
      router.push('/quiz/8');
    } else {
      toast({
        title: "Seleção necessária",
        description: "Por favor, escolha uma opção para continuar.",
        variant: "destructive"
      })
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Está aberto a se conectar com alguém da sua região?</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
            {loadingLocation ? (
              <Skeleton className="h-5 w-48" />
            ) : (
              <>
                <MapPin className="h-4 w-4" /> {userLocation}
              </>
            )}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {locationOptions.map((option) => (
              <Button
                key={option}
                variant={selectedLocation === option ? 'default' : 'outline'}
                className="text-md h-auto min-h-16 w-full whitespace-normal p-4 justify-center text-center"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>

        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit} size="lg" className="btn-gradient px-12 py-8 rounded-full shadow-lg text-lg">
            Analisar Perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
