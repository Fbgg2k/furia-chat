/**
 * Represents a match of FURIA's CS team.
 */
export interface Match {
  /**
   * Date and time of the match.
   */
  dateTime: string;
  /**
   * Opponent team name
   */
  opponent: string;
  /**
   * The URL to watch the match.
   */
  url: string;
}

/**
 * Asynchronously retrieves the match schedule of FURIA's CS team.
 *
 * @returns A promise that resolves to an array of Match objects.
 */
export async function getFuriaMatches(): Promise<Match[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      dateTime: '2024-02-01 18:00',
      opponent: 'Team Liquid',
      url: 'https://example.com/furia-liquid',
    },
    {
      dateTime: '2024-02-05 20:00',
      opponent: 'G2 Esports',
      url: 'https://example.com/furia-g2',
    },
  ];
}
