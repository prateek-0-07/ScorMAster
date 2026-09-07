/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  History,
  Award,
  Smartphone,
  Maximize2,
  Minimize2,
  Sparkles,
  Flame,
  Code2,
  BarChart3,
  Dices
} from 'lucide-react';
import { Player, Match, CertificateData } from './types';
import { SEED_PLAYERS, generateFiveDayTournamentMatches } from './utils/seedData';
import { Scoreboard } from './components/Scoreboard';
import { TournamentView } from './components/TournamentView';
import { LeaderboardView } from './components/LeaderboardView';
import { MatchHistoryView } from './components/MatchHistoryView';
import { AndroidCompanionView } from './components/AndroidCompanionView';
import { CertificateModal } from './components/CertificateModal';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'scoreboard' | 'tournament' | 'leaderboard' | 'history' | 'android_code'
  >('scoreboard');

  // Device Frame View (Mobile Frame vs Expansive Desktop Layout)
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);

  // App Data State (Initializes with the user's requested 5-day tournament scenario)
  const [players, setPlayers] = useState<Player[]>(SEED_PLAYERS);
  const [matches, setMatches] = useState<Match[]>(() => generateFiveDayTournamentMatches());

  // PDF Certificate Modal State
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handler when a new match finishes on the scoreboard
  const handleMatchCompleted = (newMatch: Match) => {
    setMatches((prev) => [newMatch, ...prev]);

    // Ensure any new players added in the match are in the players list
    setPlayers((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const additions = newMatch.players.filter((p) => !existingIds.has(p.id));
      return additions.length > 0 ? [...prev, ...additions] : prev;
    });

    showToast(`🏆 Match complete! ${newMatch.winnerName} declared winner.`);
  };

  // Reload the official 5-Day Card Tournament Scenario (A:3, B:4, C:2, D:5)
  const handleReloadScenario = () => {
    setPlayers(SEED_PLAYERS);
    const freshMatches = generateFiveDayTournamentMatches();
    setMatches(freshMatches);
    setActiveTab('tournament');
    showToast('Loaded 5-Day Card Tournament Scenario (Players A, B, C, D)!');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Application Bar */}
      <header
        id="app-header"
        className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 flex items-center justify-center shadow-md shadow-amber-500/20 font-black">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  SCOREMASTER
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Android Native Edition
                  </span>
                </h1>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Automated Scorekeeper, Leaderboard &amp; Landscape PDF Certificate Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 5-Day Scenario Quick Button */}
            <button
              id="header-load-scenario-btn"
              onClick={handleReloadScenario}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
              title="Load the 5-day tournament with Players A, B, C, D (3, 4, 2, 5 wins)"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">5-Day Scenario</span>
            </button>

            {/* Viewport Toggle (Phone Frame vs Full Screen) */}
            <button
              id="viewport-toggle-btn"
              onClick={() => setIsPhoneFrame((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 transition"
              title={isPhoneFrame ? 'Expand to Desktop View' : 'Simulate Android Phone Frame'}
            >
              {isPhoneFrame ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Pixel 8 Frame</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area (supports optional Pixel 8 Device Frame simulator) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col items-center">
        <div
          className={`w-full transition-all duration-300 ${
            isPhoneFrame
              ? 'max-w-md bg-stone-950 border-4 border-stone-800 rounded-[2.5rem] shadow-2xl p-4 sm:p-5 relative overflow-hidden my-4 ring-8 ring-stone-900/50'
              : 'w-full'
          }`}
        >
          {/* Simulated Phone Camera Punchhole (only in phone frame) */}
          {isPhoneFrame && (
            <div className="flex justify-center mb-3">
              <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
              </div>
            </div>
          )}

          {/* Toast Notification */}
          {toastMessage && (
            <div
              id="app-toast-message"
              className="mb-4 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-between shadow-lg animate-fade-in"
            >
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-amber-300 hover:text-white ml-2">
                &times;
              </button>
            </div>
          )}

          {/* Tab Navigation (Android Material 3 Navigation Bar) */}
          <nav
            id="android-bottom-navigation"
            className="bg-stone-900/90 border border-stone-800 rounded-2xl p-1.5 mb-6 flex items-center justify-between gap-1 shadow-md overflow-x-auto"
          >
            <button
              id="tab-scoreboard"
              onClick={() => setActiveTab('scoreboard')}
              className={`flex-1 min-w-[70px] py-2 px-2.5 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'scoreboard'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
              }`}
            >
              <Dices className="w-4 h-4" />
              <span>Scoreboard</span>
            </button>

            <button
              id="tab-tournament"
              onClick={() => setActiveTab('tournament')}
              className={`flex-1 min-w-[70px] py-2 px-2.5 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'tournament'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>5-Day Tourney</span>
            </button>

            <button
              id="tab-leaderboard"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 min-w-[70px] py-2 px-2.5 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'leaderboard'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Leaderboard</span>
            </button>

            <button
              id="tab-history"
              onClick={() => setActiveTab('history')}
              className={`flex-1 min-w-[70px] py-2 px-2.5 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>

            <button
              id="tab-android-code"
              onClick={() => setActiveTab('android_code')}
              className={`flex-1 min-w-[70px] py-2 px-2.5 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                activeTab === 'android_code'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Kotlin Architecture</span>
            </button>
          </nav>

          {/* Active View Container */}
          <div className="pb-8">
            {activeTab === 'scoreboard' && (
              <Scoreboard
                onMatchCompleted={handleMatchCompleted}
                onOpenCertificate={(data) => setCertificateData(data)}
              />
            )}

            {activeTab === 'tournament' && (
              <TournamentView
                matches={matches}
                players={players}
                onOpenCertificate={(data) => setCertificateData(data)}
                onLoadScenario={handleReloadScenario}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView
                matches={matches}
                players={players}
                onOpenCertificate={(data) => setCertificateData(data)}
              />
            )}

            {activeTab === 'history' && (
              <MatchHistoryView
                matches={matches}
                onOpenCertificate={(data) => setCertificateData(data)}
              />
            )}

            {activeTab === 'android_code' && <AndroidCompanionView />}
          </div>
        </div>
      </main>

      {/* PDF Certificate Modal */}
      <CertificateModal
        data={certificateData}
        onClose={() => setCertificateData(null)}
      />
    </div>
  );
}
