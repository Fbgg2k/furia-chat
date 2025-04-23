'use server';
/**
 * @fileOverview Summarizes the latest FURIA news articles.
 *
 * - summarizeFuriaNews - A function that summarizes FURIA news.
 * - SummarizeFuriaNewsInput - The input type for the summarizeFuriaNews function.
 * - SummarizeFuriaNewsOutput - The return type for the summarizeFuriaNews function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getFuriaNews, NewsArticle} from '@/services/furia-news';

const SummarizeFuriaNewsInputSchema = z.object({
  numberOfArticles: z
    .number()
    .default(3)
    .describe('The number of news articles to summarize.'),
});
export type SummarizeFuriaNewsInput = z.infer<typeof SummarizeFuriaNewsInputSchema>;

const SummarizeFuriaNewsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the latest FURIA news articles.'),
});
export type SummarizeFuriaNewsOutput = z.infer<typeof SummarizeFuriaNewsOutputSchema>;

export async function summarizeFuriaNews(input: SummarizeFuriaNewsInput): Promise<SummarizeFuriaNewsOutput> {
  return summarizeFuriaNewsFlow(input);
}

const summarizeNewsPrompt = ai.definePrompt({
  name: 'summarizeNewsPrompt',
  input: {
    schema: z.object({
      articles: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          url: z.string(),
          date: z.string(),
        })
      ),
    }),
  },
  output: {
    schema: z.object({
      summary: z
        .string()
        .describe('A summary of the latest FURIA news articles.'),
    }),
  },
  prompt: `Summarize the following news articles about FURIA's CS team:\n\n{
    {#each articles}}
    Title: {{{title}}}\n    Description: {{{description}}}\n    URL: {{{url}}}\n    Date: {{{date}}}\n\n    {{/each}}
}`,
});

const summarizeFuriaNewsFlow = ai.defineFlow<
  typeof SummarizeFuriaNewsInputSchema,
  typeof SummarizeFuriaNewsOutputSchema
>(
  {
    name: 'summarizeFuriaNewsFlow',
    inputSchema: SummarizeFuriaNewsInputSchema,
    outputSchema: SummarizeFuriaNewsOutputSchema,
  },
  async input => {
    const articles = await getFuriaNews();
    const {numberOfArticles} = input;
    const slicedArticles = articles.slice(0, numberOfArticles);
    const {output} = await summarizeNewsPrompt({
      articles: slicedArticles,
    });
    return output!;
  }
);
