'use server';

import { generatePersonalizedQuestion } from '@/ai/flows/personalized-question-generation';
import type { QuizAnswers } from '@/contexts/quiz-provider';

export async function getAiQuestion(answers: QuizAnswers) {
  try {
    // Format previous answers into a string for the AI prompt
    const previousAnswers = Object.entries(answers)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    if (!previousAnswers) {
        // Fallback question if no previous answers are available
        return { question: 'O que você mais valoriza em um relacionamento com base na sua fé?' };
    }

    const result = await generatePersonalizedQuestion({ previousAnswers });
    return result;
  } catch (error) {
    console.error('Error generating personalized question:', error);
    // Return a fallback question in case of an error
    return { question: 'O que você mais valoriza em um relacionamento com base na sua fé?' };
  }
}
