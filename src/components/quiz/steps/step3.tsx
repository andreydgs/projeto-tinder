
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Coffee, UtensilsCrossed, Music, BookOpen, Camera, Gamepad2, Dumbbell, Plane, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const interests = [
    { name: 'Café', icon: <Coffee className="h-6 w-6" /> },
    { name: 'Chá', icon: <Coffee className="h-6 w-6" /> },
    { name: 'Comida', icon: <UtensilsCrossed className="h-6 w-6" /> },
    { name: 'Música', icon: <Music className="h-6 w-6" /> },
    { name: 'Leitura', icon: <BookOpen className="h-6 w-6" /> },
    { name: 'Fotografia', icon: <Camera className="h-6 w-6" /> },
    { name: 'Jogos', icon: <Gamepad2 className="h-6 w-6" /> },
    { name: 'Exercícios', icon: <Dumbbell className="h-6 w-6" /> },
    { name: 'Viagens', icon: <Plane className="h-6 w-6" /> },
    { name: 'Arte', icon: <Palette className="h-6 w-6" /> },
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
     if (selectedInterests.length < 1) {
      toast({
        title: "Seleção necessária",
        description: "Por favor, escolha pelo menos 1 interesse.",
        variant: "destructive"
      })
      return;
    }
    setAnswer('interests', selectedInterests);
    router.push('/quiz/4');
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-xl font-bold">Quais são seus interesses?</CardTitle>
        <CardDescription>Selecione o que você gosta de fazer. Escolha pelo menos 1.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {interests.map((interest) => (
            <Button
              key={interest.name}
              variant={selectedInterests.includes(interest.name) ? 'default' : 'outline'}
              className="h-20 flex flex-col items-center justify-center space-y-1 whitespace-normal p-2 text-center text-xs"
              onClick={() => handleSelectInterest(interest.name)}
            >
              {interest.icon}
              <span className="font-semibold">{interest.name}</span>
            </Button>
          ))}
        </div>
        <div className="text-center mb-4 text-muted-foreground">
          <p>Selecionados: {selectedInterests.length}</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleSubmit} size="lg" className="btn-gradient px-10 py-6 rounded-full shadow-lg text-lg">
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
