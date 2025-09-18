
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';
import { getAiQuestion } from '@/app/quiz/actions';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const preferenceOptions = [
    'Fé em Deus acima de tudo',
    'Honestidade e transparência',
    'Respeito e companheirismo',
    'Propósito e crescimento mútuo',
];

export default function Step4() {
  const router = useRouter();
  const { toast } = useToast();
  const { answers, setAnswer } = useQuiz();
  const [generatedQuestion, setGeneratedQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPreference, setSelectedPreference] = useState<string | undefined>(answers.preference);

  const firstName = answers.name?.split(' ')[0];

  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      // Even though we are not displaying the AI question anymore, 
      // we can keep this logic in case we want to use it later,
      // for example, to populate the options dynamically.
      const result = await getAiQuestion(answers);
      setGeneratedQuestion(result.question);
      setLoading(false);
    }
    fetchQuestion();
  }, [answers]);

  const handleSelect = (option: string) => {
    setSelectedPreference(option);
  };

  const handleSubmit = () => {
    if (selectedPreference) {
      setAnswer('preference', selectedPreference);
      router.push('/quiz/5');
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
          {loading ? (
             <Skeleton className="h-8 w-3/4 mx-auto" />
          ) : (
             <CardTitle className="text-2xl font-bold">
                Perfeito, {firstName}! Agora nos conte o que você mais valoriza em um relacionamento
             </CardTitle>
          )}
        <CardDescription>Sua resposta nos ajuda a encontrar o par perfeito para você.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {preferenceOptions.map((option) => (
              <Button
                key={option}
                variant={selectedPreference === option ? 'default' : 'outline'}
                className="text-md h-auto min-h-16 w-full whitespace-normal p-4 justify-center text-center"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit} disabled={loading} size="lg" className="btn-gradient px-12 py-8 rounded-full shadow-lg text-lg">
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
