'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Coffee, UtensilsCrossed, Music, BookOpen, Camera, Gamepad2, Dumbbell, Plane } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const interests = [
    { name: 'Café', icon: <Coffee className="h-8 w-8" /> },
    { name: 'Chá', icon: <Coffee className="h-8 w-8" /> },
    { name: 'Comida', icon: <UtensilsCrossed className="h-8 w-8" /> },
    { name: 'Música', icon: <Music className="h-8 w-8" /> },
    { name: 'Leitura', icon: <BookOpen className="h-8 w-8" /> },
    { name: 'Fotografia', icon: <Camera className="h-8 w-8" /> },
    { name: 'Jogos', icon: <Gamepad2 className="h-8 w-8" /> },
    { name: 'Exercícios', icon: <Dumbbell className="h-8 w-8" /> },
    { name: 'Viagens', icon: <Plane className="h-8 w-8" /> },
];

export default function Step3() {
  const router = useRouter();
  const { toast } = useToast();
  const { answers, setAnswer } = useQuiz();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(answers.interests || []);

  const handleSelectInterest = (interestName: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestName)) {
        return prev.filter(item => item !== interestName);
      }
      return [...prev, interestName];
    });
  };

  const handleSubmit = () => {
     if (selectedInterests.length < 3) {
      toast({
        title: "Seleção necessária",
        description: "Por favor, escolha pelo menos 3 interesses.",
        variant: "destructive"
      })
      return;
    }
    setAnswer('interests', selectedInterests);
    router.push('/quiz/4');
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Quais são seus interesses?</CardTitle>
        <CardDescription>Selecione o que você gosta de fazer. Escolha no mínimo 3.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {interests.map((interest) => (
            <Button
              key={interest.name}
              variant={selectedInterests.includes(interest.name) ? 'default' : 'outline'}
              className="h-24 flex flex-col items-center justify-center space-y-2 whitespace-normal p-4 text-center"
              onClick={() => handleSelectInterest(interest.name)}
            >
              {interest.icon}
              <span className="font-semibold">{interest.name}</span>
            </Button>
          ))}
        </div>
        <div className="text-center mb-8 text-muted-foreground">
          <p>Selecionados: {selectedInterests.length}</p>
        </div>
        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit} size="lg" className="btn-gradient px-12 py-8 rounded-full shadow-lg text-lg">
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
