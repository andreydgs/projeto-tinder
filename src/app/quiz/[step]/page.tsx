import { redirect } from 'next/navigation';
import Step1 from '@/components/quiz/steps/step1';
import Step2 from '@/components/quiz/steps/step2';
import Step3 from '@/components/quiz/steps/step3';
import Step4 from '@/components/quiz/steps/step4';

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
