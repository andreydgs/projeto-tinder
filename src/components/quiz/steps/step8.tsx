'use client';

import { useQuiz } from '@/contexts/quiz-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Edit } from 'lucide-react';
import Link from 'next/link';

export default function Step8() {
  const { answers } = useQuiz();

  return (
    <div className="text-center p-4 flex flex-col items-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-foreground">
            Tudo pronto!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
            Seu perfil está completo. Confira suas respostas abaixo.
        </p>

        <Card className="text-left mb-8 w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Resumo do seu Perfil</CardTitle>
                    <CardDescription>Este é o perfil que usaremos para encontrar seu par divino.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/quiz/2" aria-label="Editar perfil">
                        <Edit className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Nome:</span>
                    <span className="font-medium">{answers.name || 'Não informado'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Idade:</span>
                    <span className="font-medium">{answers.age || 'Não informado'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Gênero:</span>
                    <span className="font-medium">{answers.gender || 'Não informado'}</span>
                </div>
                 <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Interesses:</span>
                    <span className="font-medium text-right">{(answers.interests || []).join(', ')}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Prioridade:</span>
                    <span className="font-medium text-right">{answers.preference || 'Não informado'}</span>
                </div>
                 <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Propósito:</span>
                    <span className="font-medium text-right">{answers.purpose || 'Não informado'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Valores:</span>
                    <span className="font-medium text-right">{answers.values || 'Não informado'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Tempo de Deus:</span>
                    <span className="font-medium text-right">{answers.timing || 'Não informado'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-muted-foreground">Localização:</span>
                    <span className="font-medium text-right">{answers.location || 'Não informado'}</span>
                </div>
            </CardContent>
        </Card>
        
        <h2 className="text-2xl font-bold mt-12 mb-4">Descubra quem está próximo de você</h2>
        <Button asChild size="lg" className="btn-gradient px-12 py-8 rounded-full shadow-lg text-lg">
            <Link href="#">Encontrar meu par</Link>
        </Button>
    </div>
  );
}
