import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Smartphone,
  Database,
  Calculator,
  FileText,
  Share2,
  Layers,
  Sparkles
} from 'lucide-react';

export const AndroidCompanionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'schema' | 'logic' | 'pdf' | 'share'>('stack');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div id="android-companion-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-indigo-950 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Native Android Development (Kotlin / Jetpack Compose)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Android Technical Stack &amp; Implementation Code
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              Complete, production-ready Kotlin architecture, Room database schema, winner
              aggregation algorithms, native canvas-drawn PDF landscape generator, and FileProvider
              sharing intents for WhatsApp &amp; Email.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Kotlin 2.0+ &bull; Compose M3
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-stone-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'stack'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Recommended Tech Stack
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'schema'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            2. Room Database Schema
          </button>
          <button
            onClick={() => setActiveTab('logic')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'logic'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            3. Core Scoring &amp; 5-Day Logic
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'pdf'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            4. Native PdfDocument Canvas
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'share'
                ? 'bg-emerald-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            5. FileProvider &amp; Share Intent
          </button>
        </div>
      </div>

      {/* Tab 1: Recommended Tech Stack */}
      {activeTab === 'stack' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Recommended Production Android Tech Stack
            </h3>
            <span className="text-xs text-stone-400 font-mono">Clean Architecture (MVVM)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                UI &amp; Design System
              </span>
              <h4 className="text-base font-bold text-white">Jetpack Compose + Material 3</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Declarative UI toolkit providing reactive state re-composition, dynamic color theming,
                animated layout transitions for round additions, and accessible contrast.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Offline Persistence
              </span>
              <h4 className="text-base font-bold text-white">Room SQLite Database</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Type-safe abstraction over SQLite with foreign key cascading, index optimization, and
                reactive <code className="text-amber-300">Flow&lt;List&lt;Match&gt;&gt;</code> queries.
                Completely replaces physical paper notebooks with zero data loss.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                State &amp; Concurrency
              </span>
              <h4 className="text-base font-bold text-white">ViewModel + StateFlow + Coroutines</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Lifecycle-aware state persistence surviving screen rotations. Unidirectional data flow
                (UDF) ensuring score mutations are predictable and testable.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Vector &amp; PDF Engine
              </span>
              <h4 className="text-base font-bold text-white">Android Native PdfDocument</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Built-in <code className="text-purple-300">android.graphics.pdf.PdfDocument</code> using
                native <code className="text-purple-300">Canvas</code> and{' '}
                <code className="text-purple-300">Paint</code>. Completely free, zero third-party
                dependencies or licensing fees, and produces lightweight vector-quality landscape certificates.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Sharing &amp; Privacy
              </span>
              <h4 className="text-base font-bold text-white">FileProvider + Intent.ACTION_SEND</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Secure content URI generation via <code className="text-pink-300">FileProvider</code> with{' '}
                <code className="text-pink-300">FLAG_GRANT_READ_URI_PERMISSION</code>, enabling one-tap
                PDF sharing to WhatsApp, Gmail, Telegram, or Google Drive.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Dependency Injection
              </span>
              <h4 className="text-base font-bold text-white">Hilt (Dagger)</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Injects Database, DAOs, and Repositories directly into ViewModels with standard Android
                annotations like <code className="text-teal-300">@HiltViewModel</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Room Database Schema */}
      {activeTab === 'schema' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                Room Database Schema &amp; Entities (Kotlin)
              </h3>
              <p className="text-xs text-stone-400">
                Normalized relational tables for Users, Matches, Rounds, and Scores with foreign keys.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(KOTLIN_SCHEMA_CODE, 'schema')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
            >
              {copiedSection === 'schema' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Schema Code
                </>
              )}
            </button>
          </div>

          <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed">
            <code>{KOTLIN_SCHEMA_CODE}</code>
          </pre>
        </div>
      )}

      {/* Tab 3: Core Winner & 5-Day Logic */}
      {activeTab === 'logic' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                Single-Match &amp; 5-Day Aggregate Winner Logic (Kotlin)
              </h3>
              <p className="text-xs text-stone-400">
                Automated winner determination, tie breaking, win rate computation, and Player D
                tournament victory aggregation.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(KOTLIN_LOGIC_CODE, 'logic')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
            >
              {copiedSection === 'logic' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Logic Code
                </>
              )}
            </button>
          </div>

          <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed">
            <code>{KOTLIN_LOGIC_CODE}</code>
          </pre>
        </div>
      )}

      {/* Tab 4: Native Landscape PdfDocument Generator */}
      {activeTab === 'pdf' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                Landscape PDF Certificate Generator (android.graphics.pdf.PdfDocument)
              </h3>
              <p className="text-xs text-stone-400">
                Full programmatic drawing with Canvas, Paint, ornate double gold borders, royal seals, and bold typography.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(KOTLIN_PDF_CODE, 'pdf')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
            >
              {copiedSection === 'pdf' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy PDF Code
                </>
              )}
            </button>
          </div>

          <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed">
            <code>{KOTLIN_PDF_CODE}</code>
          </pre>
        </div>
      )}

      {/* Tab 5: Share Intent for WhatsApp & Email */}
      {activeTab === 'share' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                FileProvider &amp; Android Share Intent (WhatsApp / Email)
              </h3>
              <p className="text-xs text-stone-400">
                Android Intent with FileProvider content URI, MIME type &lsquo;application/pdf&rsquo;, and WhatsApp direct package targeting.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(KOTLIN_SHARE_CODE, 'share')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
            >
              {copiedSection === 'share' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Share Code
                </>
              )}
            </button>
          </div>

          <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed">
            <code>{KOTLIN_SHARE_CODE}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

// Raw Kotlin Code Snippets:
const KOTLIN_SCHEMA_CODE = `package com.scoremaster.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

// 1. USER ENTITY
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val userId: String,
    val name: String,
    val avatarColorHex: String = "#3B82F6",
    val createdAt: Long = System.currentTimeMillis()
)

// 2. MATCH ENTITY
@Entity(
    tableName = "matches",
    indices = [Index("tournamentId"), Index("date")]
)
data class MatchEntity(
    @PrimaryKey val matchId: String,
    val gameTitle: String,
    val date: String, // YYYY-MM-DD
    val timestamp: Long = System.currentTimeMillis(),
    val winnerUserId: String?,
    val winnerName: String?,
    val winningScore: Int,
    val isCompleted: Boolean = false,
    val tournamentId: String? = null,
    val tournamentDay: Int? = null, // e.g., Day 1 to Day 5
    val notes: String? = null
)

// 3. ROUND ENTITY
@Entity(
    tableName = "rounds",
    foreignKeys = [
        ForeignKey(
            entity = MatchEntity::class,
            parentColumns = ["matchId"],
            childColumns = ["matchId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("matchId")]
)
data class RoundEntity(
    @PrimaryKey(autoGenerate = true) val roundId: Long = 0,
    val matchId: String,
    val roundNumber: Int,
    val timestamp: Long = System.currentTimeMillis()
)

// 4. SCORE ENTITY (Normalized junction table for round points)
@Entity(
    tableName = "scores",
    foreignKeys = [
        ForeignKey(
            entity = RoundEntity::class,
            parentColumns = ["roundId"],
            childColumns = ["roundId"],
            onDelete = ForeignKey.CASCADE
        ),
        ForeignKey(
            entity = UserEntity::class,
            parentColumns = ["userId"],
            childColumns = ["userId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("roundId"), Index("userId")]
)
data class ScoreEntity(
    @PrimaryKey(autoGenerate = true) val scoreId: Long = 0,
    val roundId: Long,
    val userId: String,
    val pointsScored: Int
)

// 5. ROOM DAO
@Dao
interface ScoreDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMatch(match: MatchEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRound(round: RoundEntity): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertScores(scores: List<ScoreEntity>)

    @Query("SELECT * FROM matches ORDER BY timestamp DESC")
    fun getAllMatches(): Flow<List<MatchEntity>>

    @Query("SELECT * FROM matches WHERE tournamentId = :tournamentId ORDER BY timestamp ASC")
    fun getTournamentMatches(tournamentId: String): Flow<List<MatchEntity>>

    @Query("SELECT * FROM users")
    fun getAllUsers(): Flow<List<UserEntity>>
}`;

const KOTLIN_LOGIC_CODE = `package com.scoremaster.domain

data class MatchWinnerResult(
    val winnerId: String,
    val winnerName: String,
    val winningScore: Int,
    val isTie: Boolean,
    val tieUserNames: List<String>
)

data class PlayerStats(
    val userId: String,
    val userName: String,
    val matchesPlayed: Int,
    val matchesWon: Int,
    val winRatePercent: Double,
    val totalPoints: Int,
    val averageScore: Double,
    val highestScore: Int,
    var rank: Int = 1
)

object ScoreCalculationEngine {

    /**
     * Calculates the single-match winner by finding the maximum cumulative score.
     */
    fun calculateSingleMatchWinner(
        cumulativeScores: Map<String, Int>,
        userNames: Map<String, String>
    ): MatchWinnerResult {
        if (cumulativeScores.isEmpty()) {
            return MatchWinnerResult("", "None", 0, false, emptyList())
        }

        val maxScore = cumulativeScores.values.maxOrNull() ?: 0
        val topScorers = cumulativeScores.filterValues { it == maxScore }.keys.toList()
        val isTie = topScorers.size > 1
        val topNames = topScorers.map { userNames[it] ?: "Player" }

        return MatchWinnerResult(
            winnerId = topScorers.firstOrNull().orEmpty(),
            winnerName = topNames.joinToString(" & "),
            winningScore = maxScore,
            isTie = isTie,
            tieUserNames = topNames
        )
    }

    /**
     * Aggregates 5-day tournament matches (or any period) to rank all players
     * and crown the ultimate champion (e.g. Player D with 5 wins).
     */
    fun calculateTournamentLeaderboard(
        matches: List<com.scoremaster.data.local.MatchEntity>,
        matchPlayerScores: Map<String, Map<String, Int>>, // matchId -> (userId -> totalScore)
        userMap: Map<String, String> // userId -> userName
    ): List<PlayerStats> {
        val playedCount = mutableMapOf<String, Int>()
        val wonCount = mutableMapOf<String, Int>()
        val totalPointsMap = mutableMapOf<String, Int>()
        val highestScoreMap = mutableMapOf<String, Int>()

        userMap.keys.forEach { userId ->
            playedCount[userId] = 0
            wonCount[userId] = 0
            totalPointsMap[userId] = 0
            highestScoreMap[userId] = 0
        }

        for (match in matches.filter { it.isCompleted }) {
            // Count match win
            match.winnerUserId?.let { winnerId ->
                wonCount[winnerId] = (wonCount[winnerId] ?: 0) + 1
            }

            val scores = matchPlayerScores[match.matchId] ?: emptyMap()
            for ((userId, pts) in scores) {
                playedCount[userId] = (playedCount[userId] ?: 0) + 1
                totalPointsMap[userId] = (totalPointsMap[userId] ?: 0) + pts
                if (pts > (highestScoreMap[userId] ?: 0)) {
                    highestScoreMap[userId] = pts
                }
            }
        }

        val stats = userMap.map { (userId, name) ->
            val played = playedCount[userId] ?: 0
            val won = wonCount[userId] ?: 0
            val total = totalPointsMap[userId] ?: 0
            val winRate = if (played > 0) (won.toDouble() / played) * 100.0 else 0.0
            val avg = if (played > 0) (total.toDouble() / played) else 0.0

            PlayerStats(
                userId = userId,
                userName = name,
                matchesPlayed = played,
                matchesWon = won,
                winRatePercent = Math.round(winRate * 10.0) / 10.0,
                totalPoints = total,
                averageScore = Math.round(avg * 10.0) / 10.0,
                highestScore = highestScoreMap[userId] ?: 0
            )
        }

        // Sort descending: 1) Matches Won, 2) Total Points, 3) Average Score
        val sorted = stats.sortedWith(
            compareByDescending<PlayerStats> { it.matchesWon }
                .thenByDescending { it.totalPoints }
                .thenByDescending { it.averageScore }
        )

        sorted.forEachIndexed { index, playerStats ->
            playerStats.rank = index + 1
        }

        return sorted
    }
}`;

const KOTLIN_PDF_CODE = `package com.scoremaster.util

import android.content.Context
import android.graphics.*
import android.graphics.pdf.PdfDocument
import java.io.File
import java.io.FileOutputStream

object WinnerCertificateGenerator {

    /**
     * Programmatically renders a splendid landscape A4 victory certificate.
     * Standard A4 landscape dimensions: 842 points width x 595 points height (72 DPI).
     */
    fun generateLandscapeCertificate(
        context: Context,
        winnerName: String,
        gameTitle: String,
        winningScore: Int,
        date: String,
        isTournament: Boolean = false,
        totalMatchesWon: Int = 5
    ): File {
        val pdfDocument = PdfDocument()

        // Page info: 842 x 595 (A4 Landscape)
        val pageWidth = 842
        val pageHeight = 595
        val pageInfo = PdfDocument.PageInfo.Builder(pageWidth, pageHeight, 1).create()
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas

        // 1. Warm ivory canvas background
        val bgPaint = Paint().apply {
            color = Color.rgb(254, 253, 249)
            style = Paint.Style.FILL
        }
        canvas.drawRect(0f, 0f, pageWidth.toFloat(), pageHeight.toFloat(), bgPaint)

        // 2. Outer Midnight Navy Border
        val navyBorderPaint = Paint().apply {
            color = Color.rgb(24, 38, 64)
            style = Paint.Style.STROKE
            strokeWidth = 6f
        }
        canvas.drawRect(20f, 20f, (pageWidth - 20).toFloat(), (pageHeight - 20).toFloat(), navyBorderPaint)

        // 3. Inner Double Gold Accent Border
        val goldBorderPaint = Paint().apply {
            color = Color.rgb(212, 175, 55)
            style = Paint.Style.STROKE
            strokeWidth = 3f
        }
        canvas.drawRect(30f, 30f, (pageWidth - 30).toFloat(), (pageHeight - 30).toFloat(), goldBorderPaint)

        // 4. Header Top Text
        val headerPaint = Paint().apply {
            color = Color.rgb(180, 130, 30)
            textSize = 14f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        val topBadge = if (isTournament)
            "★ OFFICIAL 5-DAY TOURNAMENT RECORD OF SUPREMACY ★"
        else
            "★ OFFICIAL BOARD & CARD GAME RECORD OF VICTORY ★"
        canvas.drawText(topBadge, (pageWidth / 2).toFloat(), 70f, headerPaint)

        // 5. Bold App Name
        val appNamePaint = Paint().apply {
            color = Color.rgb(24, 38, 64)
            textSize = 42f
            typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        canvas.drawText("SCOREMASTER", (pageWidth / 2).toFloat(), 120f, appNamePaint)

        val subAppPaint = Paint().apply {
            color = Color.rgb(100, 110, 130)
            textSize = 14f
            typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        canvas.drawText("BOARD & CARD GAME DIGITAL SCOREKEEPER", (pageWidth / 2).toFloat(), 145f, subAppPaint)

        // 6. Title
        val certTitlePaint = Paint().apply {
            color = Color.rgb(200, 140, 25)
            textSize = 28f
            typeface = Typeface.create(Typeface.SERIF, Typeface.ITALIC)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        val title = if (isTournament) "Grand Tournament Championship Certificate" else "Certificate of Victory"
        canvas.drawText(title, (pageWidth / 2).toFloat(), 195f, certTitlePaint)

        // 7. Introductory standard text
        val introPaint = Paint().apply {
            color = Color.rgb(75, 85, 99)
            textSize = 18f
            typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        canvas.drawText("This is to certify that", (pageWidth / 2).toFloat(), 245f, introPaint)

        // 8. Winner's Name (Large, bold, prominent calligraphic style)
        val winnerNamePaint = Paint().apply {
            color = Color.rgb(18, 30, 55)
            textSize = 50f
            typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        canvas.drawText(winnerName.uppercase(), (pageWidth / 2).toFloat(), 315f, winnerNamePaint)

        // 9. Standard Text: "is the official winner for scoring the highest points."
        val statementPaint = Paint().apply {
            color = Color.rgb(30, 41, 59)
            textSize = 20f
            typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        canvas.drawText("is the official winner for scoring the highest points.", (pageWidth / 2).toFloat(), 365f, statementPaint)

        // 10. Context details
        val detailPaint = Paint().apply {
            color = Color.rgb(100, 116, 139)
            textSize = 15f
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        val details = if (isTournament) {
            "Achieved ultimate 1st Place victory in the 5-Day Card Tournament with $totalMatchesWon match wins ($winningScore total pts)."
        } else {
            "Achieved victory in \\"$gameTitle\\" with a match-high score of $winningScore points."
        }
        canvas.drawText(details, (pageWidth / 2).toFloat(), 400f, detailPaint)

        // 11. Official Gold Seal (Bottom Left)
        val sealPaint = Paint().apply {
            color = Color.rgb(218, 165, 32)
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        canvas.drawCircle(140f, 485f, 45f, sealPaint)

        val sealInnerPaint = Paint().apply {
            color = Color.rgb(24, 38, 64)
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        canvas.drawCircle(140f, 485f, 38f, sealInnerPaint)

        val sealTextPaint = Paint().apply {
            color = Color.rgb(245, 200, 70)
            textSize = 10f
            typeface = Typeface.DEFAULT_BOLD
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        canvas.drawText("OFFICIAL", 140f, 480f, sealTextPaint)
        canvas.drawText("WINNER", 140f, 495f, sealTextPaint)

        // 12. Date & Signatures
        val footerLabelPaint = Paint().apply {
            color = Color.rgb(100, 110, 125)
            textSize = 13f
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }
        val footerValuePaint = Paint().apply {
            color = Color.rgb(24, 38, 64)
            textSize = 14f
            typeface = Typeface.DEFAULT_BOLD
            textAlign = Paint.Align.CENTER
            isAntiAlias = true
        }

        canvas.drawText(date, 420f, 475f, footerValuePaint)
        canvas.drawText("Date Awarded", 420f, 495f, footerLabelPaint)

        canvas.drawText("ScoreMaster Official", 680f, 475f, footerValuePaint)
        canvas.drawText("Tournament Adjudicator", 680f, 495f, footerLabelPaint)

        pdfDocument.finishPage(page)

        // Write to Cache directory
        val outputFile = File(context.cacheDir, "\${winnerName.replace(" ", "_")}_Victory_Certificate.pdf")
        FileOutputStream(outputFile).use { out ->
            pdfDocument.writeTo(out)
        }
        pdfDocument.close()

        return outputFile
    }
}`;

const KOTLIN_SHARE_CODE = `package com.scoremaster.util

import android.content.Context
import android.content.Intent
import androidx.core.content.FileProvider
import java.io.File

object PdfSharingManager {

    /**
     * Shares the generated winner certificate PDF via Android's Share Intent.
     * Compatible with WhatsApp, Gmail, Drive, Telegram, etc.
     */
    fun shareCertificate(
        context: Context,
        pdfFile: File,
        winnerName: String,
        gameTitle: String,
        targetPackage: String? = null // e.g. "com.whatsapp" for direct WhatsApp share
    ) {
        // 1. Generate secure content URI using FileProvider
        val contentUri = FileProvider.getUriForFile(
            context,
            "\${context.packageName}.fileprovider",
            pdfFile
        )

        // 2. Build ACTION_SEND Intent
        val shareIntent = Intent(Intent.ACTION_SEND).apply {
            type = "application/pdf"
            putExtra(Intent.EXTRA_STREAM, contentUri)
            putExtra(
                Intent.EXTRA_SUBJECT,
                "🏆 Official Victory Certificate: $winnerName"
            )
            putExtra(
                Intent.EXTRA_TEXT,
                "Congratulations to $winnerName for winning $gameTitle! Find the official PDF victory certificate attached."
            )
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

            // Direct WhatsApp intent if specified
            if (targetPackage != null) {
                setPackage(targetPackage)
            }
        }

        // 3. Launch Chooser or Direct App
        val chooserIntent = Intent.createChooser(shareIntent, "Share Winner's Certificate via:")
        chooserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(chooserIntent)
    }
}

// -------------------------------------------------------------
// AndroidManifest.xml Entry:
// -------------------------------------------------------------
/*
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="\${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths" />
</provider>

res/xml/file_paths.xml:
<paths>
    <cache-path name="shared_certificates" path="." />
</paths>
*/`;
