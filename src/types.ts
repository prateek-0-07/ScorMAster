export interface Player {
  id: string;
  name: string;
  avatarColor: string;
}

export interface RoundScore {
  roundNumber: number;
  scores: Record<string, number>; // playerId -> score added in this round
  timestamp: number;
}

export interface Match {
  id: string;
  gameTitle: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  players: Player[];
  rounds: RoundScore[];
  totalScores: Record<string, number>; // playerId -> cumulative score
  winnerId: string;
  winnerName: string;
  winningScore: number;
  isCompleted: boolean;
  notes?: string;
  tournamentDay?: number; // e.g., Day 1 to Day 5
  tournamentId?: string;
}

export interface PlayerAggregateStats {
  playerId: string;
  playerName: string;
  avatarColor: string;
  matchesPlayed: number;
  matchesWon: number;
  winRate: number; // percentage, e.g., 75.0
  totalPoints: number;
  averageScore: number;
  highestScore: number;
  rank: number;
}

export interface CertificateData {
  winnerName: string;
  gameTitle: string;
  score: number;
  date: string;
  matchId?: string;
  isTournament?: boolean;
  tournamentTitle?: string;
  totalMatchesWon?: number;
  totalRounds?: number;
  runnerUpName?: string;
  runnerUpScore?: number;
}
