
import { QuizStep } from "@/components/quiz/quiz-step";

type QuizPageProps = {
  params: {
    step: string;
  };
};

export function generateStaticParams() {
  const steps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '9m', '9h'];
  return steps.map((step) => ({
    step: step,
  }));
}

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <div className="container mx-auto py-4 px-4 sm:py-6 md:py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <QuizStep step={params.step} />
        </div>
      </div>
    </div>
  );
}
