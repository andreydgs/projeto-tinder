import { redirect } from 'next/navigation';
import Step1 from '@/components/quiz/steps/step1';
import Step2 from '@/components/quiz/steps/step2';
import Step3 from '@/components/quiz/steps/step3';
import Step4 from '@/components/quiz/steps/step4';
import Step5 from '@/components/quiz/steps/step5';
import Step6 from '@/components/quiz/steps/step6';
import Step7 from '@/components/quiz/steps/step7';
import Step8 from '@/components/quiz/steps/step8';

type QuizPageProps = {
  params: {
    step: string;
  };
};

export default function QuizPage({ params }: QuizPageProps) {
  const step = Number(params.step);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <Step7 />;
      case 8:
        return <Step8 />;
      default:
        // For any invalid step, redirect to the beginning.
        redirect('/quiz/1');
    }
  };

  return (
    <div className="container mx-auto py-8 sm:py-12 md:py-16">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
