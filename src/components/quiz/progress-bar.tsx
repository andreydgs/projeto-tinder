'use client';

import { Progress } from '@/components/ui/progress';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const TOTAL_STEPS = 7;

export function QuizProgressBar() {
  const params = useParams();
  const currentStep = Number(params.step) || 1;

  const progress = useMemo(() => {
    // We show a bit of progress on step 1, and full on step 7
    return ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  }, [currentStep]);

  return <Progress value={progress} className="w-full h-2 bg-secondary" />;
}
