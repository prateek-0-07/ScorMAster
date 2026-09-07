import React, { useState } from 'react';
import { History, Award, Calendar, ChevronDown, ChevronUp, Search, Trophy, Layers } from 'lucide-react';
import { Match, CertificateData } from '../types';

interface MatchHistoryViewProps {
  matches: Match[];
  onOpenCertificate: (data: CertificateData) => void;
}

export const MatchHistoryView: React.FC<MatchHistoryViewProps> = ({ matches, onOpenCertificate }) => {
  const [search, setSearch] = useState('');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const completedMatches = [...matches].filter((m) => m.isCompleted);
  completedMatches.sort((a, b) => b.timestamp - a.timestamp);

  const filtered = completedMatches.filter(
    (m) =>
      m.gameTitle.toLowerCase().includes(search.toLowerCase()) ||
      m.winnerName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="match-history-view" className="space-y-6">
      {/* Top Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Match Archive &amp; Round Records
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Match History Log</h2>
          <p className="text-xs text-stone-400">
            Total of {completedMatches.length} recorded game sessions with round tallies and official winner declarations.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="match-history-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by game or winner..."
            className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Matches List */}
      {filtered.length === 0 ? (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-12 text-center text-stone-400">
          <Trophy className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <p className="font-semibold text-white">No matches found</p>
          <p className="text-xs text-stone-500 mt-1">
            Complete a live scoring game or load the 5-Day Tournament scenario to view history records.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((match) => {
            const isExpanded = expandedMatchId === match.id;

            return (
              <div
                key={match.id}
                id={`match-record-${match.id}`}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 hover:border-stone-700 transition shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-stone-800 text-stone-300">
                        {match.date}
                      </span>
                      {match.tournamentDay && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-medium">
                          Tournament Day {match.tournamentDay}
                        </span>
                      )}
                      <span className="text-xs text-stone-500 font-mono">
                        {match.rounds.length} rounds
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {match.gameTitle}
                    </h3>
                  </div>

                  {/* Winner Banner & PDF Button */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                        Match Winner
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 justify-end">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        {match.winnerName}
                        <span className="font-mono text-amber-300 font-bold">
                          ({match.winningScore} pts)
                        </span>
                      </span>
                    </div>

                    <button
                      id={`winner-cert-btn-${match.id}`}
                      onClick={() =>
                        onOpenCertificate({
                          winnerName: match.winnerName,
                          gameTitle: match.gameTitle,
                          score: match.winningScore,
                          date: match.date,
                          matchId: match.id,
                          totalRounds: match.rounds.length,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition active:scale-95 shrink-0"
                      title="Generate official landscape PDF certificate for this match's winner"
                    >
                      <Award className="w-4 h-4" />
                      PDF Certificate
                    </button>

                    <button
                      onClick={() => toggleExpand(match.id)}
                      className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
                      title="Toggle round score breakdown"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Score Summary Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-stone-800/80 text-xs font-mono">
                  <span className="text-stone-500 font-sans text-[11px]">Final Scores:</span>
                  {match.players.map((p) => {
                    const isWinner = p.id === match.winnerId;
                    return (
                      <span
                        key={p.id}
                        className={`px-2.5 py-1 rounded-lg border ${
                          isWinner
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold'
                            : 'bg-stone-950 border-stone-800 text-stone-300'
                        }`}
                      >
                        {p.name}: {match.totalScores[p.id] || 0} pts
                      </span>
                    );
                  })}
                </div>

                {/* Expandable Detailed Round Breakdown */}
                {isExpanded && match.rounds.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-stone-800 bg-stone-950/60 rounded-xl p-3 sm:p-4">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 font-mono">
                      Round-by-Round Breakdown
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-stone-300 font-mono">
                        <thead>
                          <tr className="border-b border-stone-800 text-stone-500">
                            <th className="py-1.5 px-2">Round</th>
                            {match.players.map((p) => (
                              <th key={p.id} className="py-1.5 px-2">
                                {p.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/60">
                          {match.rounds.map((r) => (
                            <tr key={r.roundNumber}>
                              <td className="py-1.5 px-2 text-stone-400 font-bold">
                                R{r.roundNumber}
                              </td>
                              {match.players.map((p) => (
                                <td key={p.id} className="py-1.5 px-2">
                                  +{r.scores[p.id] || 0}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
