'use client';

import { Logo } from '@/components/logo';
import { QuizProgressBar } from '@/components/quiz/progress-bar';
import { QuizProvider } from '@/contexts/quiz-provider';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function QuizLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMatchPage = pathname === '/quiz/9m' || pathname === '/quiz/9h';

  return (
    <QuizProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="p-4 sm:p-6 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-center">
              <Logo />
            </div>
            {!isMatchPage && <QuizProgressBar />}
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </QuizProvider>
  );
}
