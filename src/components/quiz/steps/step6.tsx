'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const timingOptions = [
    'Absolutamente, confio no tempo de Deus',
    'Sim, mas também faço minha parte',
    'Acredito e oro por isso diariamente',
    'Tenho fé que o melhor está por vir',
];

export default function Step6() {
  const router = useRouter();
  const { toast } = useToast();
  const { answers, setAnswer } = useQuiz();
  const [selectedTiming, setSelectedTiming] = useState<string | undefined>(answers.timing);

  const handleSelect = (option: string) => {
    setSelectedTiming(option);
  };

  const handleSubmit = () => {
    if (selectedTiming) {
      setAnswer('timing', selectedTiming);
      router.push('/quiz/7');
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
      <CardHeader className="text-center px-0">
        <CardTitle className="text-xl font-bold">Você acredita que Deus tem um tempo certo para tudo?</CardTitle>
        <CardDescription>Sua resposta nos ajuda a encontrar pessoas com a mesma visão que você.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-3 mb-6">
            {timingOptions.map((option) => (
              <Button
                key={option}
                variant={selectedTiming === option ? 'default' : 'outline'}
                className="text-sm h-auto min-h-14 w-full whitespace-normal p-3 justify-center text-center"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>

        <div className="flex justify-center">
          <Button onClick={handleSubmit} size="lg" className="btn-gradient px-10 py-6 rounded-full shadow-lg text-lg">
            Próxima
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
