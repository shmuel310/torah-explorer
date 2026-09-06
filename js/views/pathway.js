// ══════════════════════════════════════════════
// LAW PATHWAY VIEW — Sequential Ribbon of 613 Mitzvot
// ══════════════════════════════════════════════

(function() {

function buildPathway() {
  if (typeof COMMANDMENTS === 'undefined' || typeof MT_CATEGORIES === 'undefined') return;
  const wrap = document.getElementById('pathwayWrap');
  if (!wrap) return;

  const lang = I18N.get();
  const width = 880;
  const height = 460;
  const margin = { top: 30, right: 30, bottom: 40, left: 30 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  // Let's lay out the 613 commandments in a snake/sine wave pathway across 6 horizontal lanes
  const numLanes = 6;
  const laneHeight = plotHeight / numLanes;
  const itemsPerLane = Math.ceil(COMMANDMENTS.length / numLanes);

  let svg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#F5F3EE;border-radius:10px;">
      <defs>
        <filter id="nodeGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#2B2B2B" flood-opacity="0.2"/>
        </filter>
      </defs>
  `;

  // Draw Lane backgrounds & labels
  for (let l = 0; l < numLanes; l++) {
    const y = margin.top + l * laneHeight;
    const startId = l * itemsPerLane + 1;
    const endId = Math.min(COMMANDMENTS.length, (l + 1) * itemsPerLane);

    svg += `
      <rect x="${margin.left}" y="${y + 5}" width="${plotWidth}" height="${laneHeight - 10}" rx="6" fill="${l % 2 === 0 ? '#EAE6DC' : '#DFD9CD'}" opacity="0.55"/>
      <text x="${margin.left + 12}" y="${y + 20}" font-size="9" font-weight="700" fill="#78716C" letter-spacing="0.05em">
        SECTION ${l + 1} · #${startId} – #${endId}
      </text>
    `;
  }

  // Draw continuous smooth spline connecting points
  let points = [];
  COMMANDMENTS.forEach((c, i) => {
    const lane = Math.floor(i / itemsPerLane);
    const posInLane = i % itemsPerLane;
    const isEvenLane = lane % 2 === 0;

    const xRatio = isEvenLane ? (posInLane / itemsPerLane) : (1 - posInLane / itemsPerLane);
    const x = margin.left + 40 + xRatio * (plotWidth - 80);
    const y = margin.top + lane * laneHeight + laneHeight / 2 + 6;

    points.push({ x, y, cmd: c });
  });

  // Connecting path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
  }

  svg += `<path d="${pathD}" fill="none" stroke="#D4CFC8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Draw node circles for each commandment
  points.forEach(pt => {
    const c = pt.cmd;
    const bk = c.book || 'Exo';
    const color = BOOKS[bk] ? BOOKS[bk].main : '#78716C';
    const isPos = c.type === 'positive';

    const title = lang === 'zh' ? (c.title_zh || c.title_en) : c.title_en;
    const ref = lang === 'zh' ? c.ref_zh : c.ref;

    svg += `
      <circle class="pw-node" cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="${isPos ? 3.5 : 2.8}"
              fill="${color}" stroke="white" stroke-width="0.8" data-id="${c.id}" style="cursor:pointer;transition:transform .12s"
              title="#${c.id}: ${title} (${ref})"/>
    `;
  });

  // Legend at bottom
  svg += `
    <g transform="translate(${margin.left + 20}, ${height - 15})">
      <text x="0" y="0" font-size="9" fill="var(--muted)" font-weight="600">${lang === 'zh' ? '顏色出處：' : 'Books:'}</text>
      ${BOOK_KEYS.map((k, idx) => `
        <circle cx="${65 + idx * 85}" cy="-3.5" r="4.5" fill="${BOOKS[k].main}"/>
        <text x="${75 + idx * 85}" y="0" font-size="9" fill="var(--muted)">${lang === 'zh' ? BOOKS[k].name_zh : BOOKS[k].name_en}</text>
      `).join('')}
    </g>
  `;

  svg += `</svg>`;
  wrap.innerHTML = svg;

  // Node click handlers
  wrap.querySelectorAll('.pw-node').forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.setAttribute('r', '7');
      node.setAttribute('stroke-width', '1.5');
    });
    node.addEventListener('mouseleave', () => {
      const id = Number(node.dataset.id);
      const cmd = COMMANDMENTS.find(c => c.id === id);
      node.setAttribute('r', cmd && cmd.type === 'positive' ? '3.5' : '2.8');
      node.setAttribute('stroke-width', '0.8');
    });
    node.addEventListener('click', () => {
      const id = node.dataset.id;
      if (id && window.openCmdModal) window.openCmdModal(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', buildPathway);
window.renderPathway = buildPathway;

})();
