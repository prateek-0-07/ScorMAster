import React, { useState, useEffect } from 'react';
import { Award, Download, Share2, Mail, MessageSquare, X, Check, FileText, Sparkles } from 'lucide-react';
import { CertificateData } from '../types';
import { generateVictoryCertificatePdf, downloadVictoryCertificate, shareVictoryCertificate } from '../utils/pdfGenerator';

interface CertificateModalProps {
  data: CertificateData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      try {
        const { dataUrl } = generateVictoryCertificatePdf(data);
        setPdfDataUri(dataUrl);
      } catch (e) {
        console.error('Failed to pre-generate PDF data URI', e);
      }
    } else {
      setPdfDataUri(null);
    }
  }, [data]);

  if (!data) return null;

  const handleDownload = () => {
    downloadVictoryCertificate(data);
    setShareStatus('Certificate downloaded successfully!');
    setTimeout(() => setShareStatus(null), 3500);
  };

  const handleShare = async (target?: 'native' | 'whatsapp' | 'email') => {
    setSharing(true);
    try {
      const res = await shareVictoryCertificate(data, target);
      if (res.success) {
        if (target === 'whatsapp') {
          setShareStatus('Opening WhatsApp...');
        } else if (target === 'email') {
          setShareStatus('Opening Email client...');
        } else if (res.method === 'download_fallback') {
          setShareStatus('Downloaded PDF (Web Share not supported in current browser)');
        } else {
          setShareStatus('Shared successfully!');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSharing(false);
      setTimeout(() => setShareStatus(null), 3500);
    }
  };

  const handleCopyLink = () => {
    const text = `🏆 Victory Certificate: ${data.winnerName} won ${data.isTournament ? 'the 5-Day Card Tournament' : data.gameTitle} with ${data.score} points!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="certificate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="certificate-modal-content"
        className="relative w-full max-w-4xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-stone-950/80 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {data.isTournament ? 'Grand Tournament Championship Certificate' : 'Official Winner Victory Certificate'}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                  Landscape PDF
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Generated exclusively for the champion • Ready for printing and sharing
              </p>
            </div>
          </div>
          <button
            id="close-certificate-modal-btn"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Landscape Preview Frame */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-950 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl aspect-[1.414/1] bg-amber-50 rounded-xl border-4 border-double border-amber-600 shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative text-stone-900 select-none overflow-hidden">
            {/* Ornate corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

            {/* Subtle inner hairline border */}
            <div className="absolute inset-3 border border-amber-500/50 pointer-events-none rounded-sm" />

            {/* Top Certificate Header */}
            <div className="text-center pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-900 mb-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {data.isTournament ? '5-Day Tournament Supremacy' : 'Official Board & Card Game Record'}
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif uppercase">
                SCOREMASTER
              </h1>
              <p className="text-[9px] sm:text-[11px] font-bold text-slate-500 tracking-widest uppercase">
                Digital Board & Card Game Scorekeeper
              </p>
              <div className="flex items-center justify-center gap-3 my-2">
                <div className="h-[1px] w-16 bg-amber-500" />
                <span className="text-amber-700 font-serif italic text-sm sm:text-lg">
                  {data.isTournament ? 'Grand Tournament Championship Certificate' : 'Certificate of Victory'}
                </span>
                <div className="h-[1px] w-16 bg-amber-500" />
              </div>
            </div>

            {/* Main Statement */}
            <div className="text-center my-auto py-2">
              <p className="text-xs sm:text-sm font-medium text-stone-600 italic mb-2">
                This is to certify that
              </p>
              <div className="inline-block relative px-6 py-1 my-1">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase font-serif tracking-wide">
                  {data.winnerName}
                </h2>
                <div className="h-0.5 w-full bg-amber-600 mt-1" />
              </div>
              <p className="text-xs sm:text-base font-bold text-stone-800 mt-2">
                is the official winner for scoring the highest points.
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600 max-w-lg mx-auto mt-1 leading-relaxed">
                {data.isTournament
                  ? `Crowned Ultimate Tournament Champion across the 5-Day Card Tournament with ${data.totalMatchesWon ?? 5} match victories and an aggregate score of ${data.score} points.`
                  : `Achieved victory in "${data.gameTitle}" with a match-high score of ${data.score} points${data.totalRounds ? ` across ${data.totalRounds} competitive rounds` : ''}.`}
              </p>
            </div>

            {/* Bottom Seal, Date, & Signature */}
            <div className="grid grid-cols-3 items-end pt-2 border-t border-amber-300 text-xs">
              {/* Left Gold Seal */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-600 border-2 border-amber-700 flex flex-col items-center justify-center text-stone-900 shadow-md">
                  <Award className="w-5 h-5 text-amber-950" />
                  <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-tighter text-amber-950">
                    VERIFIED
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] text-stone-600">
                  <p className="font-bold text-stone-800">OFFICIAL SEAL</p>
                  <p>Certified Winner</p>
                </div>
              </div>

              {/* Center Date */}
              <div className="text-center">
                <p className="text-stone-500 text-[10px]">Date of Victory</p>
                <p className="font-semibold text-stone-900 text-xs sm:text-sm">{data.date}</p>
              </div>

              {/* Right Signature */}
              <div className="text-right">
                <p className="font-serif italic text-stone-800 text-xs sm:text-sm">ScoreMaster Official</p>
                <div className="h-[1px] w-24 ml-auto bg-stone-400 my-0.5" />
                <p className="text-stone-500 text-[9px] sm:text-[10px]">Game Adjudicator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Notification */}
        {shareStatus && (
          <div className="bg-amber-500/20 border-t border-amber-500/30 px-4 py-2 text-center text-xs font-semibold text-amber-300 animate-pulse">
            {shareStatus}
          </div>
        )}

        {/* Bottom Actions Toolbar */}
        <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 hidden sm:inline">Format:</span>
            <span className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md border border-stone-700 flex items-center gap-1.5 font-mono">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Landscape A4 PDF (297 × 210 mm)
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* WhatsApp Share Button */}
            <button
              id="share-whatsapp-btn"
              onClick={() => handleShare('whatsapp')}
              disabled={sharing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition active:scale-95"
              title="Share victory message to WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </button>

            {/* Email Share Button */}
            <button
              id="share-email-btn"
              onClick={() => handleShare('email')}
              disabled={sharing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs font-semibold shadow-md transition active:scale-95"
              title="Send via Email"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>

            {/* Native Android Share Intent */}
            <button
              id="share-android-intent-btn"
              onClick={() => handleShare('native')}
              disabled={sharing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white border border-stone-600 text-xs font-semibold shadow-md transition active:scale-95"
              title="Share PDF file using Android Share Sheet"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              Android Share
            </button>

            {/* Download Official PDF */}
            <button
              id="download-pdf-cert-btn"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download PDF Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
