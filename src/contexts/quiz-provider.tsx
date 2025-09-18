'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the shape of the answers
export interface QuizAnswers {
  name?: string;
  age?: number;
  gender?: string;
  interests?: string[];
  preference?: string;
}

// Define the context shape
interface QuizContextType {
  answers: QuizAnswers;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  clearAnswers: () => void;
}

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Create the provider component
export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAnswers = localStorage.getItem('quizAnswers');
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
      } catch (error) {
        console.error("Failed to parse quiz answers from localStorage", error);
        setAnswers({});
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
    }
  }, [answers, isInitialized]);

  const setAnswer = useCallback(<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);
  
  const clearAnswers = useCallback(() => {
    setAnswers({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('quizAnswers');
    }
  }, []);

  const value = { answers, setAnswer, clearAnswers };

  return (
    <QuizContext.Provider value={value}>
      {isInitialized ? children : null}
    </QuizContext.Provider>
  );
}

// Create a custom hook for using the context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
