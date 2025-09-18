'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const purposeOptions = [
    'Sim, acredito que Deus tem alguém especial para mim',
    'Quero conhecer pessoas que compartilhem minha fé',
    'Estou aberto às possibilidades que Deus preparar',
    'Prefiro relacionamentos baseados em valores cristãos',
];

export default function Step5() {
  const router = useRouter();
  const { toast } = useToast();
  const { answers, setAnswer } = useQuiz();
  const [selectedPurpose, setSelectedPurpose] = useState<string | undefined>(answers.purpose);

  const handleSelect = (option: string) => {
    setSelectedPurpose(option);
  };

  const handleSubmit = () => {
    if (selectedPurpose) {
      setAnswer('purpose', selectedPurpose);
      router.push('/quiz/6');
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
        <CardTitle className="text-2xl font-bold">Você está buscando um relacionamento com propósito?</CardTitle>
        <CardDescription>Sua resposta nos ajuda a encontrar pessoas com a mesma visão que você.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {purposeOptions.map((option) => (
              <Button
                key={option}
                variant={selectedPurpose === option ? 'default' : 'outline'}
                className="text-md h-auto min-h-16 w-full whitespace-normal p-4 justify-center text-center"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Button>
            ))}
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
