/**
 * Represents a news article related to FURIA's CS team.
 */
export interface NewsArticle {
  /**
   * The title of the news article.
   */
  title: string;
  /**
   * A brief description or summary of the news article.
   */
  description: string;
  /**
   * The URL of the news article.
   */
  url: string;
  /**
   * The date when the news article was published.
   */
  date: string;
}

/**
 * Asynchronously retrieves the latest news articles related to FURIA's CS team.
 *
 * @returns A promise that resolves to an array of NewsArticle objects.
 */
export async function getFuriaNews(): Promise<NewsArticle[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      title: 'FURIA Wins Championship',
      description: 'FURIA wins the latest CS:GO championship in a thrilling final match.',
      url: 'https://example.com/furia-wins',
      date: '2024-01-26',
    },
    {
      title: 'New Player Joins FURIA',
      description: 'FURIA welcomes a new player to their CS:GO roster.',
      url: 'https://example.com/new-player',
      date: '2024-01-20',
    },
  ];
}
