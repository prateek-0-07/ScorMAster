import React, { useState } from 'react';
import { Trophy, TrendingUp, Search, Award, BarChart3, Users } from 'lucide-react';
import { Match, Player, CertificateData } from '../types';
import { aggregateLeaderboard } from '../utils/winnerLogic';

interface LeaderboardViewProps {
  matches: Match[];
  players: Player[];
  onOpenCertificate: (data: CertificateData) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  matches,
  players,
  onOpenCertificate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'wins' | 'winRate' | 'totalPoints' | 'averageScore'>('wins');

  const stats = aggregateLeaderboard(matches, players);

  // Sorting
  const sortedStats = [...stats].sort((a, b) => {
    if (sortBy === 'wins') return b.matchesWon - a.matchesWon || b.totalPoints - a.totalPoints;
    if (sortBy === 'winRate') return b.winRate - a.winRate || b.matchesWon - a.matchesWon;
    if (sortBy === 'totalPoints') return b.totalPoints - a.totalPoints;
    if (sortBy === 'averageScore') return b.averageScore - a.averageScore;
    return 0;
  });

  // Filtering
  const filteredStats = sortedStats.filter((p) =>
    p.playerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topPlayer = sortedStats[0];

  return (
    <div id="leaderboard-analytics-view" className="space-y-6">
      {/* Top Banner with Stats Overview */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Player Rankings &amp; Historical Analytics
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">All-Time Leaderboard</h2>
          <p className="text-xs text-stone-400">
            Real-time calculation of player win rates, cumulative scoring averages, and competitive rank.
          </p>
        </div>

        {topPlayer && topPlayer.matchesWon > 0 && (
          <div className="bg-stone-950 border border-amber-500/40 rounded-xl p-3.5 flex items-center gap-3.5 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Current #1 Seed
              </span>
              <h4 className="font-extrabold text-white text-base leading-tight">
                {topPlayer.playerName}
              </h4>
              <p className="text-xs text-stone-400 font-mono">
                {topPlayer.matchesWon} Wins &bull; {topPlayer.winRate}% Win Rate
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900 border border-stone-800 rounded-2xl p-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="leaderboard-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search player name..."
            className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-stone-400 whitespace-nowrap">Sort by:</span>
          <button
            onClick={() => setSortBy('wins')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              sortBy === 'wins'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Matches Won
          </button>
          <button
            onClick={() => setSortBy('winRate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              sortBy === 'winRate'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Win Rate (%)
          </button>
          <button
            onClick={() => setSortBy('totalPoints')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              sortBy === 'totalPoints'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Total Points
          </button>
          <button
            onClick={() => setSortBy('averageScore')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              sortBy === 'averageScore'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Average Score
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-stone-300">
            <thead className="bg-stone-950 text-stone-400 uppercase font-mono text-xs border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">Rank</th>
                <th className="px-5 py-3.5">Player</th>
                <th className="px-5 py-3.5 text-center">Matches (Won / Total)</th>
                <th className="px-5 py-3.5 text-center">Win Frequency</th>
                <th className="px-5 py-3.5 text-center">Total Points</th>
                <th className="px-5 py-3.5 text-center">Average Match Score</th>
                <th className="px-5 py-3.5 text-center">Personal Best</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredStats.map((stat, idx) => {
                const rankNum = idx + 1;
                return (
                  <tr
                    key={stat.playerId}
                    className={`transition hover:bg-stone-800/40 ${
                      rankNum === 1 ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        {rankNum === 1 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black shadow-md">
                            1
                          </span>
                        ) : rankNum === 2 ? (
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-stone-950 flex items-center justify-center text-xs font-black">
                            2
                          </span>
                        ) : rankNum === 3 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs font-black">
                            3
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center text-xs font-mono">
                            {rankNum}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 font-bold text-white">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: stat.avatarColor }}
                        />
                        <span className="text-sm sm:text-base">{stat.playerName}</span>
                        {rankNum === 1 && stat.matchesWon > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30 uppercase">
                            Rank Leader
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-center font-mono font-bold text-white">
                      <span className="text-amber-400 text-base">{stat.matchesWon}</span>{' '}
                      <span className="text-stone-500 font-normal">/ {stat.matchesPlayed}</span>
                    </td>

                    <td className="px-5 py-3.5 text-center font-mono">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-emerald-400">{stat.winRate}%</span>
                        <div className="w-20 bg-stone-800 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, stat.winRate))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-center font-mono font-bold text-stone-200">
                      {stat.totalPoints}
                    </td>

                    <td className="px-5 py-3.5 text-center font-mono text-stone-300 font-semibold">
                      {stat.averageScore}
                    </td>

                    <td className="px-5 py-3.5 text-center font-mono text-stone-400">
                      {stat.highestScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
