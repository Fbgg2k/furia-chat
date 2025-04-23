'use server';
/**
 * @fileOverview An AI agent that answers fan questions about FURIA's CS team.
 *
 * - answerFanQuestions - A function that handles answering fan questions.
 * - AnswerFanQuestionsInput - The input type for the answerFanQuestions function.
 * - AnswerFanQuestionsOutput - The return type for the answerFanQuestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getFuriaNews} from '@/services/furia-news';
import {getFuriaMatches} from '@/services/furia-matches';
import {getFuriaPlayers} from '@/services/furia-players';

const AnswerFanQuestionsInputSchema = z.object({
  question: z.string().describe('The question from the fan about FURIA.'),
});
export type AnswerFanQuestionsInput = z.infer<typeof AnswerFanQuestionsInputSchema>;

const AnswerFanQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the fan question.'),
});
export type AnswerFanQuestionsOutput = z.infer<typeof AnswerFanQuestionsOutputSchema>;

export async function answerFanQuestions(input: AnswerFanQuestionsInput): Promise<AnswerFanQuestionsOutput> {
  return answerFanQuestionsFlow(input);
}

const getFuriaInfo = ai.defineTool({
  name: 'getFuriaInfo',
  description: 'Retrieves information about FURIA, including news, match schedules, and player statistics.',
  inputSchema: z.object({
    query: z.string().describe('The specific information requested about FURIA.'),
  }),
  outputSchema: z.string(),
}, async input => {
  // Combine information from multiple sources to answer the query.
  const news = await getFuriaNews();
  const matches = await getFuriaMatches();
  const players = await getFuriaPlayers();

  // Format the information into a single string.
  let info = 'FURIA Information:\n\n';

  info += 'Recent News:\n';
  news.forEach(article => {
    info += `- ${article.title}: ${article.description} (${article.url})\n`;
  });

  info += '\nMatch Schedule:\n';
  matches.forEach(match => {
    info += `- ${match.dateTime}: vs ${match.opponent} (${match.url})\n`;
  });

  info += '\nPlayers:\n';
  players.forEach(player => {
    info += `- ${player.nickname} (${player.name}), Stats: K/D Ratio ${player.stats.kdRatio}, Headshot % ${player.stats.headshotPercentage}\n`;
  });

  return info;
});

const prompt = ai.definePrompt({
  name: 'answerFanQuestionsPrompt',
  tools: [getFuriaInfo],
  input: {
    schema: z.object({
      question: z.string().describe('The question from the fan about FURIA.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the fan question.'),
    }),
  },
  prompt: `You are a helpful assistant that answers questions about the FURIA CS team.

  Use the getFuriaInfo tool to retrieve information about the team, match schedules, player stats, and recent news.

  Answer the following question:
  {{question}}`,
});

const answerFanQuestionsFlow = ai.defineFlow<
  typeof AnswerFanQuestionsInputSchema,
  typeof AnswerFanQuestionsOutputSchema
>({
  name: 'answerFanQuestionsFlow',
  inputSchema: AnswerFanQuestionsInputSchema,
  outputSchema: AnswerFanQuestionsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
