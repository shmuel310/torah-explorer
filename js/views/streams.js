// ══════════════════════════════════════════════
// TORAH STREAMS VIEW — Flowing Volume of Law Across Categories
// ══════════════════════════════════════════════

(function() {

function buildStreams() {
  if (typeof COMMANDMENTS === 'undefined' || typeof MT_CATEGORIES === 'undefined') return;
  const wrap = document.getElementById('streamsWrap');
  if (!wrap) return;

  const lang = I18N.get();
  const width = 880;
  const height = 440;
  const margin = { top: 40, right: 40, bottom: 60, left: 40 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const numCats = MT_CATEGORIES.length;
  const stepX = plotWidth / (numCats - 1);

  // For each category (x = 0..13), compute commandment count for each book
  const dataPoints = MT_CATEGORIES.map((cat, ci) => {
    const x = margin.left + ci * stepX;
    const catCmds = COMMANDMENTS.filter(c => c.category === cat.id);
    const bookVals = {};
    let sum = 0;
    BOOK_KEYS.forEach(bk => {
      const cnt = catCmds.filter(c => c.books && c.books[bk]).length;
      bookVals[bk] = cnt;
      sum += cnt;
    });
    return { x, cat, bookVals, sum };
  });

  // Calculate stacked heights
  const maxStack = Math.max(...dataPoints.map(d => d.sum), 1);
  const scaleY = (plotHeight - 40) / maxStack;

  // Generate stacked area polygons for each book
  // Order of stack: Gen, Exo, Lev, Num, Deu
  let streamsSvg = '';
  let prevBaselines = dataPoints.map(d => margin.top + plotHeight);

  BOOK_KEYS.forEach(bk => {
    const color = BOOKS[bk].main;
    let upperPoints = [];
    let lowerPoints = [];

    dataPoints.forEach((d, i) => {
      const val = d.bookVals[bk] || 0;
      const h = val * scaleY;
      const lowerY = prevBaselines[i];
      const upperY = lowerY - h;

      lowerPoints.push({ x: d.x, y: lowerY });
      upperPoints.push({ x: d.x, y: upperY });
      prevBaselines[i] = upperY; // update for next book
    });

    // Construct polygon string
    let dStr = `M ${upperPoints[0].x} ${upperPoints[0].y}`;
    for (let i = 1; i < upperPoints.length; i++) {
      // Smooth curve or line
      dStr += ` L ${upperPoints[i].x} ${upperPoints[i].y}`;
    }
    for (let i = lowerPoints.length - 1; i >= 0; i--) {
      dStr += ` L ${lowerPoints[i].x} ${lowerPoints[i].y}`;
    }
    dStr += ' Z';

    streamsSvg += `
      <path d="${dStr}" fill="${color}" opacity="0.85" stroke="white" stroke-width="1"
            title="${lang === 'zh' ? BOOKS[bk].name_zh : BOOKS[bk].name_en}"/>
    `;
  });

  let svg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#F5F3EE;border-radius:10px;">
      <!-- Grid lines & X-axis labels -->
      ${dataPoints.map((d, ci) => `
        <line x1="${d.x}" y1="${margin.top}" x2="${d.x}" y2="${margin.top + plotHeight}" stroke="#EAE6DC" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${d.x}" y="${margin.top - 14}" text-anchor="middle" font-size="9" font-weight="700" fill="${d.cat.color}">
          ${d.cat.num}
        </text>
        <text x="${d.x}" y="${height - 25}" text-anchor="middle" font-size="8" fill="var(--muted)" font-family="Noto Sans TC, sans-serif">
          ${(lang === 'zh' ? d.cat.title_zh : d.cat.title_en).split('之')[0]}
        </text>
      `).join('')}

      <!-- Stacked Streams -->
      ${streamsSvg}

      <!-- Bottom Book Legend -->
      <g transform="translate(${margin.left + 40}, ${height - 8})">
        ${BOOK_KEYS.map((k, idx) => `
          <rect x="${idx * 120}" y="-8" width="12" height="12" rx="3" fill="${BOOKS[k].main}"/>
          <text x="${idx * 120 + 18}" y="2" font-size="9.5" font-weight="600" fill="var(--muted)" font-family="Noto Sans TC, sans-serif">
            ${lang === 'zh' ? BOOKS[k].name_zh : BOOKS[k].name_en}
          </text>
        `).join('')}
      </g>
    </svg>
  `;

  wrap.innerHTML = svg;
}

document.addEventListener('DOMContentLoaded', buildStreams);
window.renderStreams = buildStreams;

})();
