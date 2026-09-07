import { Match, Player, PlayerAggregateStats } from '../types';

/**
 * Calculates the winner of a single match.
 * Identifies highest score, resolves ties if any.
 */
export function calculateMatchWinner(
  totalScores: Record<string, number>,
  players: Player[]
): {
  winnerId: string;
  winnerName: string;
  winningScore: number;
  isTie: boolean;
  tiePlayerNames: string[];
} {
  if (players.length === 0) {
    return {
      winnerId: '',
      winnerName: 'None',
      winningScore: 0,
      isTie: false,
      tiePlayerNames: [],
    };
  }

  let maxScore = -Infinity;
  for (const p of players) {
    const score = totalScores[p.id] ?? 0;
    if (score > maxScore) {
      maxScore = score;
    }
  }

  const topPlayers = players.filter((p) => (totalScores[p.id] ?? 0) === maxScore);
  const isTie = topPlayers.length > 1;

  return {
    winnerId: topPlayers[0]?.id || '',
    winnerName: topPlayers.map((p) => p.name).join(' & '),
    winningScore: maxScore === -Infinity ? 0 : maxScore,
    isTie,
    tiePlayerNames: topPlayers.map((p) => p.name),
  };
}

/**
 * Aggregates all matches across players to calculate win rate, average score,
 * total points, and rank them from top to bottom.
 */
export function aggregateLeaderboard(
  matches: Match[],
  players: Player[],
  filterTournamentId?: string
): PlayerAggregateStats[] {
  const completedMatches = matches.filter(
    (m) => m.isCompleted && (!filterTournamentId || m.tournamentId === filterTournamentId)
  );

  const statsMap: Record<
    string,
    {
      name: string;
      color: string;
      matchesPlayed: number;
      matchesWon: number;
      totalPoints: number;
      highestScore: number;
    }
  > = {};

  // Initialize for all known players
  for (const player of players) {
    statsMap[player.id] = {
      name: player.name,
      color: player.avatarColor,
      matchesPlayed: 0,
      matchesWon: 0,
      totalPoints: 0,
      highestScore: 0,
    };
  }

  // Iterate completed matches
  for (const match of completedMatches) {
    for (const player of match.players) {
      if (!statsMap[player.id]) {
        statsMap[player.id] = {
          name: player.name,
          color: player.avatarColor,
          matchesPlayed: 0,
          matchesWon: 0,
          totalPoints: 0,
          highestScore: 0,
        };
      }

      const score = match.totalScores[player.id] ?? 0;
      statsMap[player.id].matchesPlayed += 1;
      statsMap[player.id].totalPoints += score;
      if (score > statsMap[player.id].highestScore) {
        statsMap[player.id].highestScore = score;
      }
    }

    // Award win to the winner(s)
    if (match.winnerId && statsMap[match.winnerId]) {
      statsMap[match.winnerId].matchesWon += 1;
    }
  }

  const result: PlayerAggregateStats[] = Object.entries(statsMap).map(([id, data]) => {
    const winRate =
      data.matchesPlayed > 0 ? (data.matchesWon / data.matchesPlayed) * 100 : 0;
    const averageScore =
      data.matchesPlayed > 0 ? Math.round((data.totalPoints / data.matchesPlayed) * 10) / 10 : 0;

    return {
      playerId: id,
      playerName: data.name,
      avatarColor: data.color,
      matchesPlayed: data.matchesPlayed,
      matchesWon: data.matchesWon,
      winRate: Math.round(winRate * 10) / 10,
      totalPoints: data.totalPoints,
      averageScore,
      highestScore: data.highestScore,
      rank: 1, // calculated next
    };
  });

  // Rank: Primarily by matches won desc, secondarily by total points desc, then average score desc
  result.sort((a, b) => {
    if (b.matchesWon !== a.matchesWon) return b.matchesWon - a.matchesWon;
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    return b.averageScore - a.averageScore;
  });

  // Assign 1-indexed ranks
  result.forEach((stat, index) => {
    stat.rank = index + 1;
  });

  return result;
}
