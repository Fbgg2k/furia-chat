/**
 * Represents a player of FURIA's CS team.
 */
export interface Player {
  /**
   * Player's Nickname
   */
  nickname: string;
  /**
   * Player's full name
   */
  name: string;
  /**
   * Player's age.
   */
age: number;
  /**
   * Player's statistics.
   */
stats: PlayerStats;
}

/**
 * Represents a player's statistics
 */
export interface PlayerStats {
  /**
   * Player's Kill/Death ratio
   */
  kdRatio: number;
  /**
   * Player's headshot percentage
   */
  headshotPercentage: number;
}

/**
 * Asynchronously retrieves the players of FURIA's CS team.
 *
 * @returns A promise that resolves to an array of Player objects.
 */
export async function getFuriaPlayers(): Promise<Player[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      nickname: 'KSCERATO',
      name: 'Yuri Santos',
      age: 24,
      stats: {
        kdRatio: 1.15,
        headshotPercentage: 55,
      },
    },
    {
      nickname: 'arT',
      name: 'Andrei Piovezan',
      age: 27,
      stats: {
        kdRatio: 1.10,
        headshotPercentage: 50,
      },
    },
  ];
}
