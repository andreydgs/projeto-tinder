
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/quiz-provider';
import { useEffect } from 'react';

export default function Step1() {
  const { clearAnswers } = useQuiz();

  // Clear any previous answers when the user starts over.
  useEffect(() => {
    clearAnswers();
  }, [clearAnswers]);

  return (
    <div className="text-center p-4 flex flex-col items-center justify-center min-h-[60vh]">
      <Image
        src="https://i.imgur.com/ImLy2t6.png"
        alt="Couple illustration"
        width={256}
        height={256}
        className="mb-8"
        data-ai-hint="couple illustration"
      />
      <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4 text-foreground leading-tight">
        Acredite, Deus tem alguém reservado para você.
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-lg">
        Responda algumas perguntas para encontrarmos a pessoa ideal para você com base na fé e nos valores que importam.
      </p>
      <Button asChild size="lg" className="btn-gradient text-lg px-12 py-8 rounded-full shadow-lg">
        <Link href="/quiz/2">Começar</Link>
      </Button>
    </div>
  );
}
