'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const valuesOptions = [
    'Fé em Deus acima de tudo',
    'Honestidade e transparência',
    'Respeito e companheirismo',
    'Propósito e crescimento mútuo',
];

export default function Step6() {
  const router = useRouter();
  const { toast } = useToast();
  const { answers, setAnswer } = useQuiz();
  const [selectedValues, setSelectedValues] = useState<string | undefined>(answers.values);

  const handleSelect = (option: string) => {
    setSelectedValues(option);
  };

  const handleSubmit = () => {
    if (selectedValues) {
      setAnswer('values', selectedValues);
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
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Quais valores você considera essenciais em um relacionamento?</CardTitle>
        <CardDescription>Sua resposta nos ajuda a encontrar pessoas com a mesma visão que você.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {valuesOptions.map((option) => (
              <Button
                key={option}
                variant={selectedValues === option ? 'default' : 'outline'}
                className="text-md h-auto min-h-16 w-full whitespace-normal p-4 justify-center text-center"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>

        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit} size="lg" className="btn-gradient px-12 py-8 rounded-full shadow-lg text-lg">
            Próxima
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
