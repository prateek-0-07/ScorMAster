import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle,
  Share2,
  Download,
  Flame,
  ChevronRight
} from 'lucide-react';
import { Match, Player, CertificateData } from '../types';
import { aggregateLeaderboard } from '../utils/winnerLogic';

interface TournamentViewProps {
  matches: Match[];
  players: Player[];
  onOpenCertificate: (data: CertificateData) => void;
  onLoadScenario: () => void;
}

export const TournamentView: React.FC<TournamentViewProps> = ({
  matches,
  players,
  onOpenCertificate,
  onLoadScenario,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');

  // Filter 5-day tournament matches
  const tournamentMatches = matches.filter(
    (m) => m.tournamentId === 'tournament_5day_classic' || m.tournamentDay !== undefined
  );

  const displayMatches =
    selectedDay === 'all'
      ? tournamentMatches
      : tournamentMatches.filter((m) => m.tournamentDay === selectedDay);

  // Compute aggregate stats across the tournament
  const aggregateStats = aggregateLeaderboard(
    tournamentMatches,
    players,
    'tournament_5day_classic'
  );

  const champion = aggregateStats[0]; // Ranked 1st

  // Count matches per day
  const dayCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  tournamentMatches.forEach((m) => {
    if (m.tournamentDay && dayCounts[m.tournamentDay] !== undefined) {
      dayCounts[m.tournamentDay] += 1;
    }
  });

  return (
    <div id="tournament-view" className="space-y-6">
      {/* Top Banner: 5-Day Card Game Tournament Overview */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950/50 border border-indigo-500/30 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                5-Day Championship Tournament
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {tournamentMatches.length} Matches Logged
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
              Multi-Day Tournament Aggregator
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Groups card game and board game matches across 5 competitive days. Aggregates all
              match victories, total points, and average scores to mathematically determine and crown
              the ultimate grand champion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="load-5day-scenario-btn"
              onClick={onLoadScenario}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-900/40 transition active:scale-95"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              Load 5-Day Scenario (A, B, C, D)
            </button>
          </div>
        </div>

        {/* Quick Day Navigator Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-stone-800/80 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              selectedDay === 'all'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800/80 text-stone-400 hover:text-white'
            }`}
          >
            All 5 Days ({tournamentMatches.length})
          </button>
          {[1, 2, 3, 4, 5].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-800/80 text-stone-400 hover:text-white'
              }`}
            >
              Day {day} ({dayCounts[day] || 0} matches)
            </button>
          ))}
        </div>
      </div>

      {/* GRAND ULTIMATE TOURNAMENT WINNER ANNOUNCEMENT */}
      {champion && champion.matchesWon > 0 && (
        <div
          id="tournament-champion-banner"
          className="bg-gradient-to-r from-amber-950/90 via-stone-900 to-amber-950/90 border-2 border-amber-500 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-300" />
            5-Day Tournament Ultimate Champion Declared
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-stone-300">
              Aggregated across all 14 matches and 5 days of competitive play:
            </p>
            <h1 className="text-3xl sm:text-5xl font-black text-amber-300 font-serif uppercase tracking-tight">
              🏆 {champion.playerName} 🏆
            </h1>
            <p className="text-sm sm:text-base text-stone-200">
              Crowned Champion with{' '}
              <span className="text-amber-400 font-bold font-mono text-lg">
                {champion.matchesWon} Matches Won
              </span>{' '}
              ({champion.winRate}% Win Rate) &bull;{' '}
              <span className="text-white font-mono font-bold">
                {champion.totalPoints} Total Points
              </span>{' '}
              &bull; Average Score of {champion.averageScore} pts
            </p>
          </div>

          {/* Winner-Only Grand Certificate Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="tournament-champion-pdf-cert-btn"
              onClick={() =>
                onOpenCertificate({
                  winnerName: champion.playerName,
                  gameTitle: '5-Day Card Tournament Championship',
                  score: champion.totalPoints,
                  date: '2026-09-05',
                  isTournament: true,
                  totalMatchesWon: champion.matchesWon,
                  tournamentTitle: 'Official 5-Day Card Game Tournament',
                })
              }
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm shadow-xl shadow-amber-500/20 transition active:scale-95"
            >
              <Award className="w-5 h-5 text-stone-950" />
              Generate Landscape &ldquo;Tournament Champion&rdquo; PDF Certificate
            </button>
          </div>
        </div>
      )}

      {/* Aggregate Leaderboard Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                5-Day Aggregate Tournament Standings
              </h3>
              <p className="text-xs text-stone-400">
                Ranked primarily by Matches Won, then Total Points and Average Score
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-stone-300">
            <thead className="bg-stone-950 text-stone-400 uppercase font-mono text-xs border-b border-stone-800">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3 text-center">Matches Won</th>
                <th className="px-4 py-3 text-center">Win Rate (%)</th>
                <th className="px-4 py-3 text-center">Total Points</th>
                <th className="px-4 py-3 text-center">Average Score</th>
                <th className="px-4 py-3 text-center">Highest Match</th>
                <th className="px-4 py-3 text-right">Certificate Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {aggregateStats.map((stat) => {
                const isChampion = stat.rank === 1;

                return (
                  <tr
                    key={stat.playerId}
                    className={`transition ${
                      isChampion
                        ? 'bg-amber-500/10 hover:bg-amber-500/15'
                        : 'hover:bg-stone-800/40'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold">
                      <div className="flex items-center gap-1.5">
                        {stat.rank === 1 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black">
                            1
                          </span>
                        ) : stat.rank === 2 ? (
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-stone-950 flex items-center justify-center text-xs font-black">
                            2
                          </span>
                        ) : stat.rank === 3 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs font-black">
                            3
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center text-xs font-mono">
                            {stat.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stat.avatarColor }}
                        />
                        <span>{stat.playerName}</span>
                        {isChampion && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30 uppercase">
                            Ultimate Winner
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-amber-300 text-base">
                      {stat.matchesWon} <span className="text-xs text-stone-500">/ {stat.matchesPlayed}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">
                      <div className="inline-flex items-center gap-1">
                        <span className="font-semibold text-emerald-400">{stat.winRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-white">
                      {stat.totalPoints}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-stone-300">
                      {stat.averageScore}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-stone-400">
                      {stat.highestScore}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isChampion ? (
                        <button
                          onClick={() =>
                            onOpenCertificate({
                              winnerName: stat.playerName,
                              gameTitle: '5-Day Card Tournament',
                              score: stat.totalPoints,
                              date: '2026-09-05',
                              isTournament: true,
                              totalMatchesWon: stat.matchesWon,
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition active:scale-95"
                        >
                          <Award className="w-3.5 h-3.5" />
                          View Champion PDF
                        </button>
                      ) : (
                        <span className="text-[11px] text-stone-500 italic">
                          Winner Exclusive
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Breakdown List of Matches */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">
              {selectedDay === 'all'
                ? 'All 14 Tournament Matches (Days 1 to 5)'
                : `Day ${selectedDay} Matches (${displayMatches.length})`}
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-mono">
            Showing {displayMatches.length} Matches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayMatches.map((m) => (
            <div
              key={m.id}
              className="bg-stone-950 border border-stone-800 rounded-xl p-4 flex flex-col justify-between hover:border-stone-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-800 text-stone-300">
                    Day {m.tournamentDay || '1'} &bull; {m.date}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    🏆 {m.winnerName}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm leading-tight mb-2">{m.gameTitle}</h4>

                {/* Player Scores Mini-Grid */}
                <div className="grid grid-cols-2 gap-1 text-xs font-mono text-stone-400 my-2">
                  {m.players.map((p) => {
                    const isMatchWinner = p.id === m.winnerId;
                    return (
                      <div
                        key={p.id}
                        className={`flex items-center justify-between px-2 py-1 rounded-sm ${
                          isMatchWinner ? 'bg-amber-500/15 text-amber-300 font-bold' : 'bg-stone-900'
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        <span>{m.totalScores[p.id] || 0}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Match Winner PDF Certificate Trigger */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-stone-400">Winning Score: <strong className="text-white">{m.winningScore} pts</strong></span>
                <button
                  onClick={() =>
                    onOpenCertificate({
                      winnerName: m.winnerName,
                      gameTitle: m.gameTitle,
                      score: m.winningScore,
                      date: m.date,
                      matchId: m.id,
                      totalRounds: m.rounds.length,
                    })
                  }
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Award className="w-3.5 h-3.5" />
                  PDF Cert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
