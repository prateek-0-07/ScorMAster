import React, { useState } from 'react';
import {
  Trophy,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  Award,
  ChevronRight,
  Sparkles,
  Users,
  Dices,
  Layers,
  History
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Player, Match, RoundScore, CertificateData } from '../types';
import { calculateMatchWinner } from '../utils/winnerLogic';

const DEFAULT_AVATAR_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#14b8a6', // teal
];

interface ScoreboardProps {
  onMatchCompleted: (match: Match) => void;
  onOpenCertificate: (data: CertificateData) => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ onMatchCompleted, onOpenCertificate }) => {
  // Game Setup State
  const [gameTitle, setGameTitle] = useState('Card Game Clash');
  const [players, setPlayers] = useState<Player[]>([
    { id: 'p_1', name: 'Player A', avatarColor: '#3b82f6' },
    { id: 'p_2', name: 'Player B', avatarColor: '#10b981' },
    { id: 'p_3', name: 'Player C', avatarColor: '#f59e0b' },
    { id: 'p_4', name: 'Player D', avatarColor: '#8b5cf6' },
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');

  // Ongoing Match State
  const [isMatchActive, setIsMatchActive] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundInputs, setRoundInputs] = useState<Record<string, number>>({
    p_1: 0,
    p_2: 0,
    p_3: 0,
    p_4: 0,
  });
  const [roundsHistory, setRoundsHistory] = useState<RoundScore[]>([]);
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, number>>({
    p_1: 0,
    p_2: 0,
    p_3: 0,
    p_4: 0,
  });

  // Winner & Game Over State
  const [isGameOver, setIsGameOver] = useState(false);
  const [completedMatch, setCompletedMatch] = useState<Match | null>(null);

  // Player Management
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    const newId = `p_${Date.now()}`;
    const nextColor = DEFAULT_AVATAR_COLORS[players.length % DEFAULT_AVATAR_COLORS.length];
    const newPlayer: Player = {
      id: newId,
      name: newPlayerName.trim(),
      avatarColor: nextColor,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setRoundInputs((prev) => ({ ...prev, [newId]: 0 }));
    setCumulativeScores((prev) => ({ ...prev, [newId]: 0 }));
    setNewPlayerName('');
  };

  const handleRemovePlayer = (idToRemove: string) => {
    if (players.length <= 2) {
      alert('At least 2 players are required for score tracking.');
      return;
    }
    setPlayers((prev) => prev.filter((p) => p.id !== idToRemove));
    setRoundInputs((prev) => {
      const copy = { ...prev };
      delete copy[idToRemove];
      return copy;
    });
    setCumulativeScores((prev) => {
      const copy = { ...prev };
      delete copy[idToRemove];
      return copy;
    });
  };

  // Score Input Handling
  const handleScoreChange = (playerId: string, value: number) => {
    setRoundInputs((prev) => ({
      ...prev,
      [playerId]: value,
    }));
  };

  const handleAdjustScore = (playerId: string, delta: number) => {
    setRoundInputs((prev) => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + delta,
    }));
  };

  // Submit Current Round
  const handleNextRound = () => {
    const newRound: RoundScore = {
      roundNumber: currentRound,
      scores: { ...roundInputs },
      timestamp: Date.now(),
    };

    // Update cumulative scores
    const newCumulative = { ...cumulativeScores };
    for (const p of players) {
      newCumulative[p.id] = (newCumulative[p.id] || 0) + (roundInputs[p.id] || 0);
    }

    setRoundsHistory((prev) => [...prev, newRound]);
    setCumulativeScores(newCumulative);
    setCurrentRound((prev) => prev + 1);

    // Reset round inputs
    const resetInputs: Record<string, number> = {};
    players.forEach((p) => {
      resetInputs[p.id] = 0;
    });
    setRoundInputs(resetInputs);
  };

  // Trigger Game Over & Auto-Declare Winner
  const handleTriggerGameOver = () => {
    // If there are unsubmitted round inputs that are non-zero, offer to add them or include them
    const hasPendingInput = Object.values(roundInputs).some((v) => v !== 0);
    let finalTotals = { ...cumulativeScores };

    if (hasPendingInput) {
      for (const p of players) {
        finalTotals[p.id] = (finalTotals[p.id] || 0) + (roundInputs[p.id] || 0);
      }
    }

    const { winnerId, winnerName, winningScore, isTie, tiePlayerNames } = calculateMatchWinner(
      finalTotals,
      players
    );

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newMatch: Match = {
      id: `match_${Date.now()}`,
      gameTitle,
      date: dateStr,
      timestamp: now.getTime(),
      players: [...players],
      rounds: [...roundsHistory],
      totalScores: finalTotals,
      winnerId,
      winnerName: isTie ? tiePlayerNames.join(' & ') : winnerName,
      winningScore,
      isCompleted: true,
      notes: `Completed after ${roundsHistory.length + (hasPendingInput ? 1 : 0)} rounds.`,
    };

    setCompletedMatch(newMatch);
    setIsGameOver(true);
    onMatchCompleted(newMatch);

    // Launch celebratory confetti for the winner
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'],
    });
  };

  // Reset / New Match
  const handleStartNewMatch = () => {
    setIsGameOver(false);
    setCompletedMatch(null);
    setCurrentRound(1);
    setRoundsHistory([]);

    const resetMap: Record<string, number> = {};
    players.forEach((p) => {
      resetMap[p.id] = 0;
    });
    setRoundInputs(resetMap);
    setCumulativeScores(resetMap);
  };

  // Current Leader calculation
  const currentLeader = calculateMatchWinner(cumulativeScores, players);

  return (
    <div id="digital-scoreboard-view" className="space-y-6">
      {/* Top Match Configuration Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Live Scoring Session
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-mono">
                Round {currentRound}
              </span>
            </div>
            <input
              id="game-title-input"
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              className="text-xl sm:text-2xl font-black text-white bg-transparent border-b border-stone-700 hover:border-amber-500 focus:border-amber-400 focus:outline-hidden transition"
              placeholder="Game Name (e.g. Rummy, Spades, Catan)"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              id="reset-match-btn"
              onClick={handleStartNewMatch}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition"
              title="Reset current match"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button
              id="game-over-trigger-btn"
              onClick={handleTriggerGameOver}
              disabled={isGameOver}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-900/30 transition active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              Game Over (Declare Winner)
            </button>
          </div>
        </div>

        {/* Current Leader Flash Indicator */}
        {players.length > 0 && cumulativeScores[players[0].id] !== undefined && (
          <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Current Leader:</span>
              <strong className="text-amber-300 font-semibold">{currentLeader.winnerName}</strong>
              <span className="font-mono text-stone-300">({currentLeader.winningScore} pts)</span>
            </div>
            <span className="font-mono text-stone-500">
              {roundsHistory.length} completed rounds recorded
            </span>
          </div>
        )}
      </div>

      {/* AUTO-WINNER DECLARATION POPUP / BANNER */}
      {isGameOver && completedMatch && (
        <div
          id="winner-highlight-banner"
          className="relative bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-500/80 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-amber-500/10 overflow-hidden text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Match Officially Concluded
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-stone-300 font-medium">
              The highest score has been calculated and verified:
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-amber-300 font-serif tracking-tight drop-shadow-md">
              🏆 {completedMatch.winnerName} 🏆
            </h2>
            <p className="text-sm sm:text-base font-semibold text-white">
              Official Winner with a high score of{' '}
              <span className="text-amber-400 font-bold font-mono text-lg">
                {completedMatch.winningScore} Points
              </span>
            </p>
          </div>

          {/* Winner-Only PDF Certificate CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="winner-pdf-certificate-cta"
              onClick={() =>
                onOpenCertificate({
                  winnerName: completedMatch.winnerName,
                  gameTitle: completedMatch.gameTitle,
                  score: completedMatch.winningScore,
                  date: completedMatch.date,
                  matchId: completedMatch.id,
                  totalRounds: completedMatch.rounds.length,
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm shadow-xl shadow-amber-500/25 transition active:scale-95"
            >
              <Award className="w-5 h-5 text-stone-950" />
              Generate Winner&apos;s Landscape PDF Certificate
            </button>

            <button
              id="winner-dismiss-btn"
              onClick={handleStartNewMatch}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-semibold border border-stone-700 transition"
            >
              Start Next Game
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Player Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.map((player) => {
          const isLeader = player.id === currentLeader.winnerId && currentLeader.winningScore > 0;
          const scoreDeltaFromLeader =
            currentLeader.winningScore - (cumulativeScores[player.id] || 0);

          return (
            <div
              key={player.id}
              id={`player-card-${player.id}`}
              className={`bg-stone-900 rounded-2xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                isLeader
                  ? 'border-amber-500/80 shadow-lg shadow-amber-500/10'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Leader Ribbon */}
              {isLeader && (
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Leading
                </div>
              )}

              {/* Player Info Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-inner text-sm"
                      style={{ backgroundColor: player.avatarColor }}
                    >
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">{player.name}</h3>
                      <p className="text-[11px] text-stone-400">
                        {scoreDeltaFromLeader === 0
                          ? '1st Place'
                          : `-${scoreDeltaFromLeader} pts behind`}
                      </p>
                    </div>
                  </div>

                  {players.length > 2 && (
                    <button
                      id={`remove-player-${player.id}`}
                      onClick={() => handleRemovePlayer(player.id)}
                      className="text-stone-500 hover:text-red-400 p-1 rounded-md transition"
                      title="Remove player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Big Total Score Display */}
                <div className="bg-stone-950 rounded-xl p-3 text-center border border-stone-800 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    Cumulative Total
                  </span>
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                    {cumulativeScores[player.id] || 0}
                  </span>
                  <span className="text-xs text-stone-400 block mt-0.5">points</span>
                </div>
              </div>

              {/* Round Input Steppers & Field */}
              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-400">Round {currentRound} Score:</span>
                  <input
                    id={`round-input-${player.id}`}
                    type="number"
                    value={roundInputs[player.id] ?? 0}
                    onChange={(e) => handleScoreChange(player.id, parseInt(e.target.value) || 0)}
                    className="w-20 text-right px-2 py-1 bg-stone-800 border border-stone-700 rounded-lg text-white font-mono text-sm font-bold focus:border-amber-400 focus:outline-hidden"
                  />
                </div>

                {/* Quick Increment/Decrement Steppers */}
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => handleAdjustScore(player.id, 1)}
                    className="py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-md border border-stone-700 transition"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleAdjustScore(player.id, 5)}
                    className="py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-md border border-stone-700 transition"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => handleAdjustScore(player.id, 10)}
                    className="py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-md border border-stone-700 transition"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => handleAdjustScore(player.id, 25)}
                    className="py-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold rounded-md border border-amber-500/30 transition"
                  >
                    +25
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                  <button
                    onClick={() => handleAdjustScore(player.id, -1)}
                    className="py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-400 text-xs font-medium rounded-md transition"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => handleAdjustScore(player.id, -5)}
                    className="py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-400 text-xs font-medium rounded-md transition"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => handleScoreChange(player.id, 0)}
                    className="py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-400 text-xs font-medium rounded-md transition"
                  >
                    Clr
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Round Actions & Add Player Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Round Trigger */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-bold text-white text-sm">Commit Round {currentRound} Scores</h4>
            <p className="text-xs text-stone-400">
              Tallies scores into cumulative totals and advances to Round {currentRound + 1}
            </p>
          </div>
          <button
            id="commit-round-btn"
            onClick={handleNextRound}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition active:scale-95"
          >
            Commit &amp; Next Round
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Add New Player Form */}
        <form
          id="add-player-form"
          onSubmit={handleAddPlayer}
          className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex items-center gap-3"
        >
          <div className="flex-1">
            <input
              id="new-player-name-input"
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter new player name..."
              className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs sm:text-sm placeholder:text-stone-500 focus:border-amber-400 focus:outline-hidden"
            />
          </div>
          <button
            id="add-player-submit-btn"
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs sm:text-sm border border-stone-700 transition active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            Add Player
          </button>
        </form>
      </div>

      {/* Round Breakdown History Table */}
      {roundsHistory.length > 0 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white text-sm">Round-by-Round Match Log</h4>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              Total Rounds: {roundsHistory.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-950 text-stone-400 uppercase font-mono border-b border-stone-800">
                <tr>
                  <th className="px-4 py-2.5">Round #</th>
                  {players.map((p) => (
                    <th key={p.id} className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: p.avatarColor }}
                        />
                        {p.name}
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-2.5 text-right">Round Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 font-mono">
                {roundsHistory.map((r) => {
                  let maxRoundScore = -Infinity;
                  let roundLeader = '';
                  players.forEach((p) => {
                    const score = r.scores[p.id] ?? 0;
                    if (score > maxRoundScore) {
                      maxRoundScore = score;
                      roundLeader = p.name;
                    }
                  });

                  return (
                    <tr key={r.roundNumber} className="hover:bg-stone-800/40 transition">
                      <td className="px-4 py-2.5 font-bold text-amber-400">Round {r.roundNumber}</td>
                      {players.map((p) => (
                        <td key={p.id} className="px-4 py-2.5">
                          {r.scores[p.id] !== undefined ? `+${r.scores[p.id]}` : '-'}
                        </td>
                      ))}
                      <td className="px-4 py-2.5 text-right font-semibold text-emerald-400">
                        {roundLeader} (+{maxRoundScore})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
