'use client';

import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';
import { CheckCircle, Edit } from 'lucide-react';

const SummaryItem = ({ label, value, href }: { label: string; value?: string | string[] | number; href: string }) => {
  const displayValue = Array.isArray(value) ? value.join(', ') : value;
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-right">{displayValue || 'Não informado'}</span>
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={href} aria-label={`Editar ${label}`}>
                <Edit className="h-4 w-4 text-muted-foreground" />
            </Link>
        </Button>
      </div>
    </div>
  );
};


export default function Step9() {
  const { answers } = useQuiz();

  return (
    <div className="text-center p-4 flex flex-col items-center">
        <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">
            Tudo pronto!
        </h1>
        <p className="text-base text-muted-foreground mb-6">
            Seu perfil está completo. Confira suas respostas abaixo.
        </p>

        <Accordion type="single" collapsible className="w-full max-w-md mx-auto mb-8" defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">Resumo do seu Perfil</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-1 text-left">
                        <SummaryItem label="Perfil" value={`${answers.name || ''}, ${answers.age || ''}`} href="/quiz/2" />
                        <SummaryItem label="Interesses" value={answers.interests} href="/quiz/3" />
                        <SummaryItem label="Prioridade" value={answers.preference} href="/quiz/4" />
                        <SummaryItem label="Propósito" value={answers.purpose} href="/quiz/5" />
                        <SummaryItem label="Tempo de Deus" value={answers.timing} href="/quiz/6" />
                        <SummaryItem label="Localização" value={answers.location} href="/quiz/7" />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <h2 className="text-xl font-bold mt-4 mb-4">Descubra quem está próximo de você</h2>
        <Button asChild size="lg" className="btn-gradient px-10 py-6 rounded-full shadow-lg text-base">
            <Link href="#">Encontrar meu par</Link>
        </Button>
    </div>
  );
}