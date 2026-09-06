// ══════════════════════════════════════════════
// RADIAL VIEW — Torah Wheel
// ══════════════════════════════════════════════

(function() {

let currentMode = 'category'; // 'category' | 'book'

function buildTorahWheel() {
  if (typeof COMMANDMENTS === 'undefined' || typeof MT_CATEGORIES === 'undefined') return;
  const wrap = document.getElementById('radialSvgWrap');
  const infoBox = document.getElementById('radialInfoBox');
  if (!wrap) return;

  const lang = I18N.get();
  const width = 600;
  const height = 600;
  const cx = width / 2;
  const cy = height / 2;
  const rInner = 95;
  const rCat = 145;
  const rTicks = 240;

  const total = COMMANDMENTS.length; // 613

  // Sort commandments according to currentMode
  let sortedCmds = [...COMMANDMENTS];
  if (currentMode === 'book') {
    sortedCmds.sort((a, b) => {
      const idxA = BOOK_KEYS.indexOf(a.book);
      const idxB = BOOK_KEYS.indexOf(b.book);
      return idxA !== idxB ? idxA - idxB : a.id - b.id;
    });
  } else {
    // category mode
    sortedCmds.sort((a, b) => {
      const catA = MT_CATEGORIES.findIndex(c => c.id === a.category);
      const catB = MT_CATEGORIES.findIndex(c => c.id === b.category);
      return catA !== catB ? catA - catB : a.id - b.id;
    });
  }

  // Calculate sector segments
  let sectors = [];
  if (currentMode === 'book') {
    sectors = BOOK_KEYS.map(k => {
      const cmds = sortedCmds.filter(c => c.book === k);
      return {
        id: k,
        title: lang === 'zh' ? BOOKS[k].name_zh : BOOKS[k].name_en,
        color: BOOKS[k].main,
        count: cmds.length
      };
    });
  } else {
    sectors = MT_CATEGORIES.map(cat => {
      const cmds = sortedCmds.filter(c => c.category === cat.id);
      return {
        id: cat.id,
        title: lang === 'zh' ? cat.title_zh : cat.title_en,
        color: cat.color,
        count: cmds.length
      };
    }).filter(s => s.count > 0);
  }

  // Build SVG string
  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="centerShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#1C1917" flood-opacity="0.15"/>
      </filter>
    </defs>
  `;

  // Draw 613 outer ticks / rays
  svg += `<g id="wheelTicks">`;
  sortedCmds.forEach((c, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + (rCat + 5) * Math.cos(angle);
    const y1 = cy + (rCat + 5) * Math.sin(angle);
    const x2 = cx + rTicks * Math.cos(angle);
    const y2 = cy + rTicks * Math.sin(angle);
    const bk = c.book || 'Exo';
    const color = BOOKS[bk] ? BOOKS[bk].main : '#78716C';

    svg += `<line class="wheel-ray" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
      stroke="${color}" stroke-width="1.8" stroke-linecap="round" data-id="${c.id}" opacity="0.85" style="cursor:pointer;transition:all .1s" />`;
  });
  svg += `</g>`;

  // Draw Middle Category / Book Arcs
  let curCount = 0;
  svg += `<g id="wheelArcs">`;
  sectors.forEach(s => {
    const startAngle = (curCount / total) * Math.PI * 2 - Math.PI / 2;
    curCount += s.count;
    const endAngle = (curCount / total) * Math.PI * 2 - Math.PI / 2;

    const x1 = cx + rCat * Math.cos(startAngle);
    const y1 = cy + rCat * Math.sin(startAngle);
    const x2 = cx + rCat * Math.cos(endAngle);
    const y2 = cy + rCat * Math.sin(endAngle);

    const x3 = cx + rInner * Math.cos(endAngle);
    const y3 = cy + rInner * Math.sin(endAngle);
    const x4 = cx + rInner * Math.cos(startAngle);
    const y4 = cy + rInner * Math.sin(startAngle);

    const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;

    const d = `M ${x1} ${y1} A ${rCat} ${rCat} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    svg += `<path d="${d}" fill="${s.color}" opacity="0.9" stroke="white" stroke-width="1.5" style="cursor:pointer" title="${s.title} (${s.count})" />`;

    // Label on arc if large enough
    if (s.count >= 15) {
      const midAngle = (startAngle + endAngle) / 2;
      const rText = (rCat + rInner) / 2;
      const tx = cx + rText * Math.cos(midAngle);
      const ty = cy + rText * Math.sin(midAngle) + 3.5;
      const shortTitle = lang === 'zh' ? s.title.split(' ')[0].substring(0, 4) : s.title.split(' ')[0];
      svg += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="9" font-weight="700" fill="white" font-family="Noto Sans TC, sans-serif" pointer-events="none">${shortTitle}</text>`;
    }
  });
  svg += `</g>`;

  // Center Circle
  svg += `
    <circle cx="${cx}" cy="${cy}" r="${rInner - 5}" fill="#FFFFFF" filter="url(#centerShadow)" stroke="#E8E4DC" stroke-width="2"/>
    <g id="centerInfoGroup" style="pointer-events:none">
      <text id="centerIdText" x="${cx}" y="${cy - 24}" text-anchor="middle" font-size="12" font-weight="700" fill="#78716C">${lang === 'zh' ? '613 誡命' : '613 Mitzvot'}</text>
      <text id="centerTitleText" x="${cx}" y="${cy}" text-anchor="middle" font-size="12" font-weight="600" fill="#1C1917" width="140">${lang === 'zh' ? '妥拉之輪' : 'Torah Wheel'}</text>
      <text id="centerRefText" x="${cx}" y="${cy + 22}" text-anchor="middle" font-size="10" fill="#A8A29E">${lang === 'zh' ? '點擊或懸停光標探索' : 'Hover or click to explore'}</text>
    </g>
  `;

  svg += `</svg>`;
  wrap.innerHTML = svg;

  // Center info box
  if (infoBox) {
    infoBox.innerHTML = `<strong>${lang === 'zh' ? '妥拉之輪 613 條誡命環狀圖' : 'The Torah Wheel — 613 Commandments'}</strong> · ${lang === 'zh' ? '將光標移至光芒或色塊上查看誡命，點擊開啟經文詳情' : 'Hover over any ray to inspect, click for details'}`;
  }

  // Attach hover & click events on rays
  wrap.querySelectorAll('.wheel-ray').forEach(ray => {
    ray.addEventListener('mouseenter', () => {
      const id = Number(ray.dataset.id);
      const cmd = COMMANDMENTS.find(c => c.id === id);
      if (!cmd) return;

      ray.setAttribute('stroke-width', '4');
      ray.setAttribute('opacity', '1');

      const titleEl = document.getElementById('centerTitleText');
      const refEl = document.getElementById('centerRefText');
      const idEl = document.getElementById('centerIdText');

      if (idEl) idEl.textContent = `#${cmd.id} · ${cmd.type === 'positive' ? (lang === 'zh' ? '當行' : 'Do') : (lang === 'zh' ? '不可' : 'Don\'t')}`;
      if (titleEl) {
        const fullTitle = lang === 'zh' ? (cmd.title_zh || cmd.title_en) : cmd.title_en;
        titleEl.textContent = fullTitle.length > 10 ? fullTitle.substring(0, 10) + '…' : fullTitle;
      }
      if (refEl) refEl.textContent = lang === 'zh' ? cmd.ref_zh : cmd.ref;
    });

    ray.addEventListener('mouseleave', () => {
      ray.setAttribute('stroke-width', '1.8');
      ray.setAttribute('opacity', '0.85');
    });

    ray.addEventListener('click', () => {
      const id = ray.dataset.id;
      if (id && window.openCmdModal) window.openCmdModal(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildTorahWheel();

  // Mode toggle buttons
  const btnGroup = document.getElementById('radToggleGroup');
  if (btnGroup) {
    btnGroup.querySelectorAll('.rad-tog').forEach(btn => {
      btn.addEventListener('click', () => {
        btnGroup.querySelectorAll('.rad-tog').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        buildTorahWheel();
      });
    });
  }
});

window.renderTorahWheel = buildTorahWheel;

})();
