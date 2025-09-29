
'use client';

import { redirect } from 'next/navigation';
import { useQuiz } from '@/contexts/quiz-provider';

import Step1 from '@/components/quiz/steps/step1';
import Step2 from '@/components/quiz/steps/step2';
import Step3 from '@/components/quiz/steps/step3';
import Step4 from '@/components/quiz/steps/step4';
import Step5 from '@/components/quiz/steps/step5';
import Step6 from '@/components/quiz/steps/step6';
import Step7 from '@/components/quiz/steps/step7';
import Step8 from '@/components/quiz/steps/step8';
import Step9 from '@/components/quiz/steps/step9';
import Step9m from '@/app/quiz/9m/page';
import Step9h from '@/app/quiz/9h/page';

type QuizStepProps = {
    step: string;
};

export function QuizStep({ step }: QuizStepProps) {
  const { answers } = useQuiz();

  // Redirect logic for step 9 based on gender
  if (step === '9') {
    if (answers.gender === 'Feminino') {
      redirect('/quiz/9m');
    }
    if (answers.gender === 'Masculino') {
      redirect('/quiz/9h');
    }
  }
  
  if (step === '9m') {
    return <Step9m />;
  }

  if (step === '9h') {
    return <Step9h />;
  }

  const renderStep = () => {
    switch (step) {
      case '1':
        return <Step1 />;
      case '2':
        return <Step2 />;
      case '3':
        return <Step3 />;
      case '4':
        return <Step4 />;
      case '5':
        return <Step5 />;
      case '6':
        return <Step6 />;
      case '7':
        return <Step7 />;
      case '8':
        return <Step8 />;
      case '9':
         // Fallback to summary if gender is not set
        return <Step9 />;
      default:
        // For any invalid step, redirect to the beginning.
        redirect('/quiz/1');
    }
  };

  return <>{renderStep()}</>;
}
