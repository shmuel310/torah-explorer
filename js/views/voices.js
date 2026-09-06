// ══════════════════════════════════════════════
// BOOK VOICES VIEW — Polyphonic Musical Score
// ══════════════════════════════════════════════

(function() {

function buildVoices() {
  if (typeof COMMANDMENTS === 'undefined' || typeof MT_CATEGORIES === 'undefined') return;
  const wrap = document.getElementById('voicesWrap');
  if (!wrap) return;

  const lang = I18N.get();
  const width = 860;
  const height = 480;
  const margin = { top: 40, right: 30, bottom: 60, left: 100 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const numCats = MT_CATEGORIES.length; // 14
  const catWidth = plotWidth / numCats;
  const staveHeight = plotHeight / BOOK_KEYS.length;

  let svg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#FAF8F5;border-radius:10px;">
      <!-- Category Grid Columns Background -->
      ${MT_CATEGORIES.map((cat, i) => {
        const x = margin.left + i * catWidth;
        const bg = i % 2 === 0 ? '#F3EFEA' : 'transparent';
        return `
          <rect x="${x}" y="${margin.top}" width="${catWidth}" height="${plotHeight}" fill="${bg}" opacity="0.4"/>
          <!-- Top Category Header -->
          <text x="${x + catWidth/2}" y="${margin.top - 12}" text-anchor="middle" font-size="8.5" font-weight="700" fill="${cat.color}">
            ${cat.num}
          </text>
          <!-- Bottom Category Label -->
          <text x="${x + catWidth/2}" y="${height - 20}" text-anchor="middle" font-size="8" fill="var(--muted)" font-family="Noto Sans TC, sans-serif">
            ${(lang === 'zh' ? cat.title_zh : cat.title_en).split('之')[0]}
          </text>
        `;
      }).join('')}

      <!-- 5 Book Staves -->
      ${BOOK_KEYS.map((bk, bIdx) => {
        const y = margin.top + bIdx * staveHeight;
        const midY = y + staveHeight / 2;
        const bookInfo = BOOKS[bk];
        const bkName = lang === 'zh' ? bookInfo.name_zh : bookInfo.name_en;

        let staveSvg = `
          <!-- Stave horizontal center line -->
          <line x1="${margin.left}" y1="${midY}" x2="${margin.left + plotWidth}" y2="${midY}" stroke="#D4CFC8" stroke-width="1.5" stroke-dasharray="3,3"/>
          <line x1="${margin.left}" y1="${y + staveHeight}" x2="${margin.left + plotWidth}" y2="${y + staveHeight}" stroke="#E8E4DC" stroke-width="1"/>

          <!-- Book Label on Left -->
          <g transform="translate(15, ${midY + 4})">
            <rect x="0" y="-14" width="75" height="24" rx="12" fill="${bookInfo.light}"/>
            <text x="37.5" y="2" text-anchor="middle" font-size="10.5" font-weight="700" fill="${bookInfo.main}" font-family="Noto Sans TC, sans-serif">
              ${bkName}
            </text>
          </g>
        `;

        // Draw density notes / bars for each category
        MT_CATEGORIES.forEach((cat, cIdx) => {
          const cmds = COMMANDMENTS.filter(c => c.category === cat.id && c.books && c.books[bk]);
          const count = cmds.length;
          if (count === 0) return;

          const cx = margin.left + cIdx * catWidth + catWidth / 2;
          const barHeight = Math.min(staveHeight - 12, Math.max(6, count * 1.5));
          const catTitle = lang === 'zh' ? cat.title_zh : cat.title_en;
          const countText = lang === 'zh' ? `${count} 條誡命` : `${count} commandments`;

          staveSvg += `
            <!-- Note / density stem -->
            <g class="voice-note" style="cursor:pointer" title="${bkName} × ${catTitle}: ${countText}">
              <line x1="${cx}" y1="${midY}" x2="${cx}" y2="${topY - 6}" stroke="${bookInfo.main}" stroke-width="2" stroke-linecap="round"/>
              <ellipse cx="${cx}" cy="${midY}" rx="6" ry="4.5" fill="${bookInfo.main}" transform="rotate(-20 ${cx} ${midY})"/>
              ${count >= 3 ? `<circle cx="${cx}" cy="${topY - 6}" r="3" fill="${bookInfo.main}"/>` : ''}
              <text x="${cx}" y="${midY + 14}" text-anchor="middle" font-size="8.5" font-weight="700" fill="${bookInfo.main}">${count}</text>
            </g>
          `;
        });

        return staveSvg;
      }).join('')}
    </svg>
  `;

  wrap.innerHTML = svg;
}

document.addEventListener('DOMContentLoaded', buildVoices);
window.renderVoices = buildVoices;

})();
