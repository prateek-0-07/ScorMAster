import { jsPDF } from 'jspdf';
import { CertificateData } from '../types';

/**
 * Generates a grand, landscape-oriented PDF victory certificate.
 * Designed with regal gold & navy ornamental borders, official seals,
 * bold app branding, and the exact required certification text.
 */
export function generateVictoryCertificatePdf(data: CertificateData): {
  doc: jsPDF;
  blob: Blob;
  fileName: string;
  dataUrl: string;
} {
  // A4 Landscape: 297mm width x 210mm height
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const width = 297;
  const height = 210;

  // 1. Background tint (very subtle warm ivory)
  doc.setFillColor(254, 253, 249);
  doc.rect(0, 0, width, height, 'F');

  // 2. Outer Deep Navy / Midnight Border
  doc.setDrawColor(24, 38, 64);
  doc.setLineWidth(2.5);
  doc.rect(8, 8, width - 16, height - 16);

  // 3. Double Gold Accent Border
  doc.setDrawColor(212, 175, 55); // Rich Royal Gold
  doc.setLineWidth(1.2);
  doc.rect(12, 12, width - 24, height - 24);

  // Thin inner hairline
  doc.setDrawColor(180, 140, 40);
  doc.setLineWidth(0.4);
  doc.rect(15, 15, width - 30, height - 30);

  // 4. Corner Ornaments (Classic Victorian / Certificate flourishes)
  const cornerOffsets = [
    { x: 15, y: 15, dx: 1, dy: 1 },
    { x: width - 15, y: 15, dx: -1, dy: 1 },
    { x: 15, y: height - 15, dx: 1, dy: -1 },
    { x: width - 15, y: height - 15, dx: -1, dy: -1 },
  ];

  doc.setFillColor(212, 175, 55);
  for (const c of cornerOffsets) {
    // Corner corner bracket accents
    doc.triangle(c.x, c.y, c.x + c.dx * 12, c.y, c.x, c.y + c.dy * 12, 'F');
    doc.circle(c.x + c.dx * 6, c.y + c.dy * 6, 1.5, 'FD');
  }

  // 5. Header Badge / Laurel
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(180, 130, 30);
  const headerTag = data.isTournament
    ? '★ OFFICIAL 5-DAY TOURNAMENT RECORD OF SUPREMACY ★'
    : '★ OFFICIAL BOARD & CARD GAME RECORD OF VICTORY ★';
  doc.text(headerTag, width / 2, 28, { align: 'center' });

  // 6. Bold App Name in Elegant Typography
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(24, 38, 64); // Deep Navy
  doc.text('SCOREMASTER', width / 2, 40, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(120, 130, 150);
  doc.text('BOARD & CARD GAME DIGITAL SCOREKEEPER', width / 2, 46, { align: 'center' });

  // Gold separator bar with center diamond
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(width / 2 - 70, 50, width / 2 + 70, 50);
  doc.setFillColor(212, 175, 55);
  doc.rect(width / 2 - 3, 48.5, 6, 3, 'F');

  // 7. Certificate Title
  doc.setFont('times', 'italic');
  doc.setFontSize(24);
  doc.setTextColor(180, 120, 20);
  const certTitle = data.isTournament
    ? 'Grand Tournament Championship Certificate'
    : 'Certificate of Victory';
  doc.text(certTitle, width / 2, 63, { align: 'center' });

  // 8. Introductory Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(60, 64, 75);
  doc.text('This is to certify that', width / 2, 76, { align: 'center' });

  // 9. Winner's Name (Grand, bold, prominent highlight)
  doc.setFont('times', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(18, 30, 55);
  doc.text(data.winnerName.toUpperCase(), width / 2, 94, { align: 'center' });

  // Winner underline banner
  const nameWidth = doc.getTextWidth(data.winnerName.toUpperCase());
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.line(width / 2 - (nameWidth / 2 + 10), 98, width / 2 + (nameWidth / 2 + 10), 98);

  // 10. Standard Certification Body Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(45, 55, 72);

  const statementLine1 = 'is the official winner for scoring the highest points.';
  doc.text(statementLine1, width / 2, 108, { align: 'center' });

  // Contextual achievement details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(75, 85, 99);

  let detailsLine = '';
  if (data.isTournament) {
    detailsLine = `Achieved ultimate 1st Place victory in the 5-Day Card Tournament with ${data.totalMatchesWon ?? 5} match wins and a grand total of ${data.score} points.`;
  } else {
    detailsLine = `Achieved victory in "${data.gameTitle}" with a match-high score of ${data.score} points${data.totalRounds ? ` across ${data.totalRounds} competitive rounds` : ''}.`;
  }
  doc.text(detailsLine, width / 2, 118, { align: 'center' });

  // 11. Official Ribbon / Gold Seal Graphic (Left Bottom)
  const sealX = 48;
  const sealY = 160;

  // Ribbon tails
  doc.setFillColor(180, 40, 40); // Royal crimson ribbons
  doc.triangle(sealX - 12, sealY + 12, sealX - 4, sealY + 12, sealX - 8, sealY + 34, 'F');
  doc.triangle(sealX + 4, sealY + 12, sealX + 12, sealY + 12, sealX + 8, sealY + 34, 'F');

  // Outer gold scalloped ring
  doc.setFillColor(218, 165, 32);
  doc.circle(sealX, sealY, 20, 'F');

  // Inner navy ring
  doc.setFillColor(24, 38, 64);
  doc.circle(sealX, sealY, 16, 'F');

  // Inner gold ring
  doc.setFillColor(238, 195, 62);
  doc.circle(sealX, sealY, 13, 'F');

  // Seal text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(24, 38, 64);
  doc.text('OFFICIAL', sealX, sealY - 4, { align: 'center' });
  doc.text('WINNER', sealX, sealY + 1, { align: 'center' });
  doc.setFontSize(6);
  doc.text('★ VERIFIED ★', sealX, sealY + 6, { align: 'center' });

  // 12. Signatures & Date Section (Center & Right Bottom)
  // Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(90, 100, 115);
  doc.text('Date of Award', 140, 166, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 38, 64);
  doc.text(data.date, 140, 160, { align: 'center' });
  doc.setDrawColor(180, 190, 200);
  doc.setLineWidth(0.5);
  doc.line(110, 162, 170, 162);

  // Adjudicator Signature
  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.setTextColor(30, 50, 90);
  doc.text('ScoreMaster Adjudicator', 230, 158, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(90, 100, 115);
  doc.text('Official Tournament Adjudicator', 230, 166, { align: 'center' });
  doc.setDrawColor(180, 190, 200);
  doc.setLineWidth(0.5);
  doc.line(195, 162, 265, 162);

  // 13. Security Verification Watermark / Code (Bottom center)
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(150, 160, 175);
  const certId = `CERT-SM-${data.isTournament ? 'TOURN' : 'MATCH'}-${Date.now().toString(36).toUpperCase()}`;
  doc.text(`Digital Verification ID: ${certId} • Board & Card Game Score Tracker System`, width / 2, 192, {
    align: 'center',
  });

  const blob = doc.output('blob');
  const dataUrl = doc.output('datauristring');
  const sanitizedName = data.winnerName.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${sanitizedName}_Winner_Certificate.pdf`;

  return { doc, blob, fileName, dataUrl };
}

/**
 * Downloads the victory PDF directly to device storage.
 */
export function downloadVictoryCertificate(data: CertificateData): void {
  const { doc, fileName } = generateVictoryCertificatePdf(data);
  doc.save(fileName);
}

/**
 * Native Android Share Intent simulation:
 * Uses Web Share API (native sheet on Android browsers) when available,
 * with fallbacks for WhatsApp and Email direct sharing.
 */
export async function shareVictoryCertificate(
  data: CertificateData,
  target?: 'native' | 'whatsapp' | 'email'
): Promise<{ success: boolean; method: string; message?: string }> {
  const { blob, fileName } = generateVictoryCertificatePdf(data);

  const shareTitle = `🏆 Victory Certificate: ${data.winnerName}`;
  const shareText = `This is to certify that ${data.winnerName} is the official winner for scoring the highest points (${data.score} pts) in ${data.isTournament ? 'the 5-Day Tournament' : data.gameTitle}! 🏆 Tracked with ScoreMaster.`;

  // 1. WhatsApp direct intent
  if (target === 'whatsapp') {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareTitle}\n\n${shareText}\n\nDownload the official PDF certificate directly from the ScoreMaster app!`
    )}`;
    window.open(waUrl, '_blank');
    return { success: true, method: 'whatsapp' };
  }

  // 2. Email direct intent
  if (target === 'email') {
    const mailUrl = `mailto:?subject=${encodeURIComponent(
      shareTitle
    )}&body=${encodeURIComponent(`${shareText}\n\nOfficial Certificate generated on ${data.date}.`)}`;
    window.open(mailUrl, '_blank');
    return { success: true, method: 'email' };
  }

  // 3. Native Android Share Sheet (Web Share API with file attachment)
  try {
    const file = new File([blob], fileName, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: shareTitle,
        text: shareText,
      });
      return { success: true, method: 'native_file' };
    } else if (navigator.share) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
      });
      return { success: true, method: 'native_text' };
    }
  } catch (err: unknown) {
    if ((err as Error)?.name === 'AbortError') {
      return { success: false, method: 'cancelled' };
    }
  }

  // Fallback: trigger download
  downloadVictoryCertificate(data);
  return { success: true, method: 'download_fallback' };
}
