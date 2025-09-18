'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized quiz questions based on user input.
 *
 * It exports:
 * - `generatePersonalizedQuestion`: A function to generate personalized quiz questions.
 * - `PersonalizedQuestionInput`: The input type for the generatePersonalizedQuestion function.
 * - `PersonalizedQuestionOutput`: The output type for the generatePersonalizedQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedQuestionInputSchema = z.object({
  previousAnswers: z
    .string()
    .describe('The previous answers given by the user in the quiz.'),
});
export type PersonalizedQuestionInput = z.infer<typeof PersonalizedQuestionInputSchema>;

const PersonalizedQuestionOutputSchema = z.object({
  question: z.string().describe('The personalized question to ask the user.'),
});
export type PersonalizedQuestionOutput = z.infer<typeof PersonalizedQuestionOutputSchema>;

export async function generatePersonalizedQuestion(
  input: PersonalizedQuestionInput
): Promise<PersonalizedQuestionOutput> {
  return personalizedQuestionFlow(input);
}

const personalizedQuestionPrompt = ai.definePrompt({
  name: 'personalizedQuestionPrompt',
  input: {schema: PersonalizedQuestionInputSchema},
  output: {schema: PersonalizedQuestionOutputSchema},
  prompt: `Given the user's previous answers: {{{previousAnswers}}},
  generate a personalized question to further understand their preferences for matchmaking. The question should be engaging and relevant to finding a compatible match within a faith-based context.`,
});

const personalizedQuestionFlow = ai.defineFlow(
  {
    name: 'personalizedQuestionFlow',
    inputSchema: PersonalizedQuestionInputSchema,
    outputSchema: PersonalizedQuestionOutputSchema,
  },
  async input => {
    const {output} = await personalizedQuestionPrompt(input);
    return output!;
  }
);
