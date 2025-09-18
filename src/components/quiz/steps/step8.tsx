'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader, UserSearch, HeartHandshake, MapPin, BrainCircuit } from 'lucide-react';

const analysisSteps = [
  { text: 'Analisando suas respostas...', icon: <BrainCircuit className="h-6 w-6" /> },
  { text: 'Identificando compatibilidades...', icon: <UserSearch className="h-6 w-6" /> },
  { text: 'Buscando perfis na sua região...', icon: <MapPin className="h-6 w-6" /> },
  { text: 'Calculando afinidades...', icon: <HeartHandshake className="h-6 w-6" /> },
  { text: 'Finalizando análise...', icon: <Loader className="h-6 w-6 animate-spin" /> },
];

export default function Step8() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => prev + 1);
    }, 1800); // 1.8 seconds per step to make it total 9s for 5 steps

    const redirectTimeout = setTimeout(() => {
      router.push('/quiz/9');
    }, 9000); // 9 seconds total

    return () => {
      clearInterval(stepInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="text-center p-4 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
        Analisando seu perfil...
      </h1>
      <p className="text-base text-muted-foreground mb-12">
        Estamos encontrando conexões com base na sua fé e valores...
      </p>

      <div className="w-full max-w-md space-y-4 mb-12">
        {analysisSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
              currentStep > index
                ? 'bg-green-100 text-green-700'
                : currentStep === index
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {currentStep > index ? <CheckCircle className="h-6 w-6" /> : step.icon}
            <span className="font-medium">{step.text}</span>
          </div>
        ))}
      </div>

      <p className="text-lg text-primary font-semibold">
        Você está mais perto do que imagina de encontrar alguém especial.
      </p>
    </div>
  );
}
