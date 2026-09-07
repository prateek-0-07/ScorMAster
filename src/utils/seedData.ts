import { Match, Player } from '../types';

export const SEED_PLAYERS: Player[] = [
  { id: 'player_a', name: 'Player A', avatarColor: '#3b82f6' }, // Blue
  { id: 'player_b', name: 'Player B', avatarColor: '#10b981' }, // Green
  { id: 'player_c', name: 'Player C', avatarColor: '#f59e0b' }, // Amber
  { id: 'player_d', name: 'Player D', avatarColor: '#8b5cf6' }, // Purple (Ultimate Champion)
];

// Generates 14 matches distributed over 5 days matching exact win distribution:
// A: 3 wins, B: 4 wins, C: 2 wins, D: 5 wins
export function generateFiveDayTournamentMatches(): Match[] {
  const baseDate = new Date('2026-09-01T14:00:00Z');

  const matchConfigurations = [
    // Day 1 (3 matches) -> Winners: A, B, D
    { day: 1, game: 'Rummy Classic', winnerId: 'player_a', scores: { player_a: 145, player_b: 120, player_c: 98, player_d: 130 } },
    { day: 1, game: 'Spades Masters', winnerId: 'player_b', scores: { player_a: 110, player_b: 175, player_c: 130, player_d: 160 } },
    { day: 1, game: 'Hearts Clash', winnerId: 'player_d', scores: { player_a: 115, player_b: 140, player_c: 105, player_d: 185 } },

    // Day 2 (3 matches) -> Winners: C, D, B
    { day: 2, game: 'Gin Rummy Showdown', winnerId: 'player_c', scores: { player_a: 130, player_b: 140, player_c: 165, player_d: 155 } },
    { day: 2, game: 'Cribbage Duel', winnerId: 'player_d', scores: { player_a: 125, player_b: 110, player_c: 135, player_d: 180 } },
    { day: 2, game: 'Poker Texas Cup', winnerId: 'player_b', scores: { player_a: 140, player_b: 195, player_c: 115, player_d: 160 } },

    // Day 3 (3 matches) -> Winners: A, D, B
    { day: 3, game: 'Bridge Challenge', winnerId: 'player_a', scores: { player_a: 210, player_b: 180, player_c: 160, player_d: 190 } },
    { day: 3, game: 'Euchre Blitz', winnerId: 'player_d', scores: { player_a: 115, player_b: 130, player_c: 120, player_d: 175 } },
    { day: 3, game: 'Canasta Open', winnerId: 'player_b', scores: { player_a: 150, player_b: 185, player_c: 140, player_d: 170 } },

    // Day 4 (2 matches) -> Winners: C, A
    { day: 4, game: 'Blackjack Invitational', winnerId: 'player_c', scores: { player_a: 135, player_b: 125, player_c: 170, player_d: 160 } },
    { day: 4, game: 'Solitaire Sprint', winnerId: 'player_a', scores: { player_a: 190, player_b: 165, player_c: 145, player_d: 175 } },

    // Day 5 (3 matches) -> Winners: B, D, D (Grand Finale!)
    { day: 5, game: 'Pinochle Championship', winnerId: 'player_b', scores: { player_a: 140, player_b: 205, player_c: 150, player_d: 195 } },
    { day: 5, game: 'Uno Extreme Royale', winnerId: 'player_d', scores: { player_a: 130, player_b: 155, player_c: 140, player_d: 210 } },
    { day: 5, game: 'Grand Finale Super Cup', winnerId: 'player_d', scores: { player_a: 160, player_b: 170, player_c: 130, player_d: 225 } },
  ];

  const matches: Match[] = matchConfigurations.map((config, index) => {
    const matchDate = new Date(baseDate.getTime() + (config.day - 1) * 86400000 + index * 3600000);
    const dateString = matchDate.toISOString().split('T')[0];

    // Generate 3 rounds for each match that sum up to total
    const playerIds = ['player_a', 'player_b', 'player_c', 'player_d'];
    const round1Scores: Record<string, number> = {};
    const round2Scores: Record<string, number> = {};
    const round3Scores: Record<string, number> = {};

    for (const pid of playerIds) {
      const total = config.scores[pid as keyof typeof config.scores];
      const r1 = Math.floor(total * 0.35);
      const r2 = Math.floor(total * 0.35);
      const r3 = total - r1 - r2;
      round1Scores[pid] = r1;
      round2Scores[pid] = r2;
      round3Scores[pid] = r3;
    }

    const winnerPlayer = SEED_PLAYERS.find((p) => p.id === config.winnerId)!;

    return {
      id: `match_day${config.day}_${index + 1}`,
      gameTitle: config.game,
      date: dateString,
      timestamp: matchDate.getTime(),
      players: [...SEED_PLAYERS],
      rounds: [
        { roundNumber: 1, scores: round1Scores, timestamp: matchDate.getTime() - 3600000 },
        { roundNumber: 2, scores: round2Scores, timestamp: matchDate.getTime() - 1800000 },
        { roundNumber: 3, scores: round3Scores, timestamp: matchDate.getTime() },
      ],
      totalScores: { ...config.scores },
      winnerId: config.winnerId,
      winnerName: winnerPlayer.name,
      winningScore: config.scores[config.winnerId as keyof typeof config.scores],
      isCompleted: true,
      tournamentDay: config.day,
      tournamentId: 'tournament_5day_classic',
      notes: `Day ${config.day} tournament match: ${config.game}`,
    };
  });

  return matches;
}
