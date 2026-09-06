// ══════════════════════════════════════════════
// JOURNEY MAP VIEW — Exodus & Wilderness Route
// ══════════════════════════════════════════════

(function() {

const STATIONS = [
  {
    id: "st-rameses",
    name_zh: "蘭塞 / 歌珊地 (Rameses / Goshen)",
    name_en: "Rameses / Goshen",
    ref_zh: "出埃及記 12:37, 創世記 47:6",
    ref_en: "Exodus 12:37, Genesis 47:6",
    x: 95, y: 125,
    summary_zh: "以色列人在埃及居住與為奴之地。在第十個神蹟（逾越節羊羔滅長子之災）後，以色列百姓攜家帶眷浩浩蕩蕩踏出埃及，開啟出埃及救贖之路。",
    summary_en: "The starting point of the Exodus after 430 years in Egypt, following the Passover lamb sacrifice.",
    commandments: [109, 110, 111, 112, 113, 114, 115, 120, 276, 277, 278, 404, 408, 410, 411, 412, 414, 415, 417]
  },
  {
    id: "st-succoth",
    name_zh: "疏割與以倘 (Succoth & Etham)",
    name_en: "Succoth & Etham",
    ref_zh: "出埃及記 13:20-22",
    ref_en: "Exodus 13:20-22",
    x: 140, y: 145,
    summary_zh: "曠野邊界的安營處。耶和華在他們前面行，日間在雲柱中領他們的路，夜間在火柱中光照他們，使他們日夜都可以行走。",
    summary_en: "Camp on the edge of the wilderness where the pillar of cloud by day and pillar of fire by night first appeared.",
    commandments: [79, 80]
  },
  {
    id: "st-redsea",
    name_zh: "紅海過海處 (Red Sea Crossing)",
    name_en: "Red Sea Crossing",
    ref_zh: "出埃及記 14:21-31",
    ref_en: "Exodus 14:21-31",
    x: 180, y: 180,
    summary_zh: "前有紅海阻隔，後有法老馬車追趕。摩西向海伸杖，大東風使海水一夜退去分開，百姓下海中走乾地；埃及追兵入海全數覆沒。摩西與米利暗在此唱得勝凱歌。",
    summary_en: "God parts the waters; Israel passes on dry ground while Pharaoh's chariots are swallowed by the sea.",
    commandments: []
  },
  {
    id: "st-marah",
    name_zh: "瑪拉苦水 (Marah)",
    name_en: "Marah",
    ref_zh: "出埃及記 15:22-26",
    ref_en: "Exodus 15:22-26",
    x: 200, y: 220,
    summary_zh: "在書珥曠野走了三天找不著水，到了瑪拉因水苦不能喝。神指示摩西一棵樹，丟進水裡水就變甜了。神在此為百姓定了律例典章，宣佈『我是醫治你的耶和華』。",
    summary_en: "Bitter waters made sweet with a tree; God declares 'I am the LORD who heals you' and sets first ordinances.",
    commandments: []
  },
  {
    id: "st-elim",
    name_zh: "以琳十二水泉 (Elim)",
    name_en: "Elim",
    ref_zh: "出埃及記 15:27",
    ref_en: "Exodus 15:27",
    x: 215, y: 255,
    summary_zh: "曠野中的甘美綠洲，那裡有十二股水泉，七十棵棕樹；以色列百姓就在那裡的水邊安營休整。",
    summary_en: "An oasis in the wilderness with twelve springs of water and seventy date palms.",
    commandments: []
  },
  {
    id: "st-sin",
    name_zh: "汛的曠野 — 賜嗎哪 (Wilderness of Sin)",
    name_en: "Wilderness of Sin",
    ref_zh: "出埃及記 16:1-36",
    ref_en: "Exodus 16:1-36",
    x: 235, y: 300,
    summary_zh: "出埃及後第二個月十五日，全會眾因缺糧向摩西發怨言。神早晨賜下嗎哪，晚上賜下鵪鶉，並頒布第六日收取雙倍、第七日守安息日的條例。",
    summary_en: "God sends bread from heaven (manna) and quails, instituting Sabbath preparation gathering.",
    commandments: [87, 88, 90]
  },
  {
    id: "st-rephidim",
    name_zh: "利非訂 — 擊石出水 (Rephidim)",
    name_en: "Rephidim",
    ref_zh: "出埃及記 17:1-16, 18:1-27",
    ref_en: "Exodus 17:1-16, 18:1-27",
    x: 255, y: 345,
    summary_zh: "摩西在何烈磐石擊石出水。亞瑪力人來攻，摩西在山頂舉杖，約書亞在山下爭戰得勝，神立壇為『耶和華尼西』。葉忒羅前來獻策設立千夫長百夫長管理審判百姓。",
    summary_en: "Water from the rock at Massah/Meribah; battle against Amalek (Jehovah Nissi); Jethro advises legal courts.",
    commandments: [540, 598, 599, 600]
  },
  {
    id: "st-sinai",
    name_zh: "西奈山 / 何烈山 (Mount Sinai)",
    name_en: "Mount Sinai / Horeb",
    ref_zh: "出埃及記 19–40章, 利未記全卷",
    ref_en: "Exodus 19–40, Leviticus",
    x: 280, y: 400,
    summary_zh: "以色列歷史最重要的轉折點！雷轟閃電中神降臨西奈山，親頒十誡；頒布立約之書（出21-23）、啟示會幕樣式（出25-31）；金牛犢事件後重立約；在此頒布利未記聖殿祭祀、潔淨與聖潔法典！",
    summary_en: "The giving of the Ten Commandments, the Covenant Code, blueprint of the Tabernacle, and the entire Levitical Code.",
    commandments: [1, 2, 6, 29, 88, 91, 160, 210, 301, 302, 307, 312, 313, 318, 331, 336, 348, 350, 352, 355, 359, 361, 373, 374, 377, 378, 381, 421, 444, 473, 476, 482, 576, 584]
  },
  {
    id: "st-kibroth",
    name_zh: "基博羅哈他瓦 (Kibroth Hattaavah)",
    name_en: "Kibroth Hattaavah",
    ref_zh: "民數記 11:1-35",
    ref_en: "Numbers 11:1-35",
    x: 320, y: 350,
    summary_zh: "離開西奈山起行後，閒雜人大起貪慾貪吃肉，神降下大群鵪鶉，肉在牙齒之間尚未嚼爛，神的烈怒發作擊殺起貪慾之人，因此地名叫『貪慾之人的墳墓』。",
    summary_en: "'Graves of craving' where people lusted for meat and plague broke out.",
    commandments: []
  },
  {
    id: "st-kadesh",
    name_zh: "加低斯巴尼亞 (Kadesh-Barnea)",
    name_en: "Kadesh-Barnea",
    ref_zh: "民數記 13–14章, 15–20章",
    ref_en: "Numbers 13–14, 15–20",
    x: 350, y: 250,
    summary_zh: "曠野樞紐。摩西打發十二探子窺探迦南地，十個探子報惡信引致全會眾反叛。神判定二十歲以上者在曠野漂流四十年至死。頒布繸子（Tzitzit）、初熟生麵舉祭、紅母牛禮儀等條例。",
    summary_en: "The twelve spies sent to Canaan; Israel's rebellion leads to 38 years wandering. Ordinances of Tzitzit, dough offering, and Red Heifer.",
    commandments: [84, 253, 260, 273, 305, 314, 444, 445]
  },
  {
    id: "st-punon",
    name_zh: "普嫩 — 摩西舉銅蛇 (Punon)",
    name_en: "Punon",
    ref_zh: "民數記 21:4-9",
    ref_en: "Numbers 21:4-9",
    x: 400, y: 220,
    summary_zh: "因以東人不容以色列經過其地，百姓繞行紅海路途中心中甚是煩躁怨讟神，火蛇進入百姓中咬死多人。摩西為百姓禱告，神命他造一條銅蛇掛在杆子上，凡被咬的一望銅蛇就活了。",
    summary_en: "Fiery serpents punish complaining; Moses lifts the Bronze Serpent on a pole, foreshadowing salvation.",
    commandments: []
  },
  {
    id: "st-arnon",
    name_zh: "亞嫩河谷 (Arnon River)",
    name_en: "Arnon River",
    ref_zh: "民數記 21:13-35",
    ref_en: "Numbers 21:13-35",
    x: 420, y: 160,
    summary_zh: "摩押與亞摩利人交界處。以色列人在此大敗亞摩利王西宏，並在巴珊戰役中擊殺巴珊王噩，奪取約旦河東廣大土地，分給流便、迦得與瑪拿西半支派。",
    summary_en: "Defeat of Sihon king of the Amorites and Og king of Bashan; conquest of Transjordan.",
    commandments: []
  },
  {
    id: "st-moab",
    name_zh: "摩押平原 / 什亭 (Plains of Moab / Shittim)",
    name_en: "Plains of Moab / Shittim",
    ref_zh: "民數記 22–36章, 申命記全卷",
    ref_en: "Numbers 22–36, Deuteronomy",
    x: 440, y: 120,
    summary_zh: "過約旦河前的最終大本營！巴勒召巴蘭作咒詛反被神轉為四次祝福；巴力毗珥事件與非尼哈熱心；第二次人口普查；摩西在生命最後階段向新一代以色列人重述全部妥拉律法（申命記法典）！",
    summary_en: "Balaam's oracles; Phinehas' covenant of peace; Moses delivers all of Deuteronomy before entering Canaan.",
    commandments: [3, 4, 5, 8, 9, 10, 11, 12, 14, 22, 53, 56, 57, 82, 83, 85, 247, 248, 249, 250, 252, 261, 272, 285, 563, 571, 578, 579, 580, 581, 591, 592, 593, 594, 595, 596, 597, 602, 604, 608, 611, 612, 613]
  },
  {
    id: "st-nebo",
    name_zh: "尼波山 / 毘斯迦頂 (Mount Nebo)",
    name_en: "Mount Nebo",
    ref_zh: "申命記 34:1-12",
    ref_en: "Deuteronomy 34:1-12",
    x: 460, y: 100,
    summary_zh: "摩西登上尼波山頂，神將基列全地直到但、猶大全地與南地指給他觀看。耶和華的僕人摩西死在摩押地，眼目沒有昏花，精神沒有衰敗。以色列人在摩押平原為他哀哭了三十日。",
    summary_en: "Moses views the Promised Land from Mount Nebo and dies in the presence of God at age 120.",
    commandments: []
  },
  {
    id: "st-jordan",
    name_zh: "約旦河與耶利哥平原 (Jordan River)",
    name_en: "Jordan River / Gilgal",
    ref_zh: "約書亞記 3–4章",
    ref_en: "Joshua 3–4",
    x: 440, y: 80,
    summary_zh: "祭司抬著約和華的約櫃踏入約旦河水，河水在亞當城立起成壘，百姓走乾地順利穿過約旦河，在吉甲立十二塊紀念石，正式踏入神應許流奶與蜜的迦南美地！",
    summary_en: "Crossing the Jordan River on dry ground following the Ark of the Covenant, entering the Promised Land.",
    commandments: []
  }
];

function buildJourneyMap() {
  const container = document.getElementById('mapSvgContainer');
  if (!container) return;

  const lang = I18N.get();

  // Create SVG map
  container.innerHTML = `
    <svg viewBox="0 0 520 460" xmlns="http://www.w3.org/2000/svg" style="background:#F2EDE4;border-radius:10px;">
      <defs>
        <linearGradient id="seaGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#C5E0ED" />
          <stop offset="100%" stop-color="#93C5DE" />
        </linearGradient>
        <linearGradient id="desertGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#EDE2C8" />
          <stop offset="100%" stop-color="#E2D2B0" />
        </linearGradient>
        <filter id="mapGlow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#1C1917" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Background Desert Land -->
      <rect width="520" height="460" fill="url(#desertGradient)"/>

      <!-- Mediterranean Sea (North-West) -->
      <path d="M 0,0 L 220,0 C 200,35 170,60 140,75 C 90,85 40,80 0,90 Z" fill="url(#seaGradient)" opacity="0.95"/>
      <text x="50" y="45" font-size="11" fill="#477E96" font-weight="700" letter-spacing="1">${lang === 'zh' ? '大海 / 地中海' : 'Mediterranean Sea'}</text>

      <!-- Red Sea - Gulf of Suez (West) -->
      <path d="M 120,200 C 135,240 170,300 200,370 C 210,395 215,440 220,460 L 160,460 C 140,430 120,350 90,260 Z" fill="url(#seaGradient)" opacity="0.95"/>
      <text x="100" y="340" font-size="9" fill="#477E96" font-weight="600" transform="rotate(72 100 340)">${lang === 'zh' ? '紅海蘇伊士灣' : 'Gulf of Suez'}</text>

      <!-- Red Sea - Gulf of Aqaba (East) -->
      <path d="M 330,460 C 320,400 310,350 325,300 C 330,285 345,280 355,290 C 345,340 345,410 365,460 Z" fill="url(#seaGradient)" opacity="0.95"/>
      <text x="325" y="390" font-size="9" fill="#477E96" font-weight="600" transform="rotate(-78 325 390)">${lang === 'zh' ? '亞喀巴灣' : 'Gulf of Aqaba'}</text>

      <!-- Dead Sea (North-East) -->
      <path d="M 435,90 C 428,105 425,125 428,145 C 430,165 438,180 435,190 C 430,195 422,185 420,165 C 418,140 422,110 425,95 Z" fill="url(#seaGradient)" opacity="0.95"/>
      <text x="442" y="145" font-size="9" fill="#477E96" font-weight="600">${lang === 'zh' ? '死海' : 'Dead Sea'}</text>

      <!-- Jordan River (North of Dead Sea) -->
      <path d="M 430,30 Q 428,60 430,90" fill="none" stroke="#68A5BF" stroke-width="2.5" stroke-linecap="round"/>
      <text x="435" y="55" font-size="8" fill="#477E96" font-weight="600">${lang === 'zh' ? '約旦河' : 'Jordan River'}</text>

      <!-- Nile River Delta Lines (West) -->
      <path d="M 40,160 Q 60,130 80,120 M 20,150 Q 50,110 90,95" fill="none" stroke="#7EB3CB" stroke-width="2" opacity="0.7"/>
      <text x="30" y="115" font-size="10" fill="#2E6278" font-weight="700">${lang === 'zh' ? '尼羅河三角洲 / 埃及' : 'Nile Delta / Egypt'}</text>

      <!-- Mountain Silhouettes for Mt Sinai & Nebo -->
      <path d="M 260,415 L 280,390 L 300,415 Z" fill="#C5B18D" stroke="#A99572" stroke-width="1.5"/>
      <path d="M 445,108 L 460,90 L 475,108 Z" fill="#C5B18D" stroke="#A99572" stroke-width="1.5"/>

      <!-- Exodus Path connecting all stations -->
      <path id="exodusRoutePath"
        d="M 95,125 L 140,145 L 180,180 L 200,220 L 215,255 L 235,300 L 255,345 L 280,400 L 320,350 L 350,250 L 400,220 L 420,160 L 440,120 L 460,100 L 440,80"
        fill="none" stroke="#DC2626" stroke-width="3" stroke-dasharray="6,4" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>

      <!-- Station Markers -->
      <g id="stationMarkersGroup">
        ${STATIONS.map((st, i) => `
          <g class="map-station-node" data-id="${st.id}" data-idx="${i}" style="cursor:pointer">
            <circle cx="${st.x}" cy="${st.y}" r="8" fill="white" filter="url(#mapGlow)"/>
            <circle cx="${st.x}" cy="${st.y}" r="5.5" fill="${st.id === 'st-sinai' ? '#DC2626' : st.id === 'st-moab' ? '#EA580C' : '#1C1917'}"/>
            <circle cx="${st.x}" cy="${st.y}" r="2" fill="white"/>
            <text x="${st.x + 9}" y="${st.y + 3.5}" font-size="8.5" font-weight="700" fill="#1C1917" font-family="Noto Sans TC, Poppins, sans-serif"
                  paint-order="stroke" stroke="#F2EDE4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${i+1}. ${lang === 'zh' ? st.name_zh.split(' ')[0] : st.name_en.split(' ')[0]}
            </text>
          </g>
        `).join('')}
      </g>
    </svg>
  `;

  // Attach click events on SVG nodes
  container.querySelectorAll('.map-station-node').forEach(node => {
    node.addEventListener('click', () => {
      const idx = Number(node.dataset.idx);
      selectStation(idx);
    });
  });

  // Select initial station (Mt. Sinai)
  const defaultIdx = STATIONS.findIndex(s => s.id === 'st-sinai');
  selectStation(defaultIdx !== -1 ? defaultIdx : 0);
}

function selectStation(idx) {
  const st = STATIONS[idx];
  if (!st) return;

  const lang = I18N.get();
  const card = document.getElementById('stationCard');
  if (!card) return;

  // Highlight active node in SVG
  document.querySelectorAll('.map-station-node').forEach((node, i) => {
    const circles = node.querySelectorAll('circle');
    if (i === idx) {
      circles[0].setAttribute('r', '11');
      circles[0].setAttribute('stroke', '#DC2626');
      circles[0].setAttribute('stroke-width', '2');
    } else {
      circles[0].setAttribute('r', '8');
      circles[0].removeAttribute('stroke');
    }
  });

  // Render card details
  const title = lang === 'zh' ? st.name_zh : st.name_en;
  const summary = lang === 'zh' ? st.summary_zh : st.summary_en;
  const ref = lang === 'zh' ? st.ref_zh : (st.ref_en || st.ref_zh);

  let lawsHtml = '';
  if (st.commandments && st.commandments.length > 0 && typeof COMMANDMENTS !== 'undefined') {
    const cmds = COMMANDMENTS.filter(c => st.commandments.includes(c.id));
    lawsHtml = `
      <div class="st-laws-title" style="margin-top:14px">${lang === 'zh' ? `在此處頒布/關聯的誡命 (${cmds.length})` : `Commandments Given Here (${cmds.length})`}</div>
      <div style="display:flex;flex-direction:column;gap:5px;max-height:220px;overflow-y:auto">
        ${cmds.map(c => `
          <div class="st-law-item" data-id="${c.id}" title="${lang === 'zh' ? '點擊查看誡命詳情' : 'Click to view commandment details'}">
            <strong>#${c.id}</strong> ${lang === 'zh' ? (c.title_zh || c.title_en) : c.title_en}
            <div style="font-size:9.5px;color:var(--muted)">${lang === 'zh' ? c.ref_zh : c.ref}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  card.innerHTML = `
    <div class="st-num">${lang === 'zh' ? `出埃及第 ${idx + 1} 站點` : `Station #${idx + 1}`}</div>
    <div class="st-title">${title}</div>
    <div class="st-ref">${ref}</div>
    <div class="st-desc">${summary}</div>
    ${lawsHtml}
  `;

  // Wire law item clicks to open modal
  card.querySelectorAll('.st-law-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      if (id && window.openCmdModal) window.openCmdModal(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', buildJourneyMap);
window.renderJourneyMap = buildJourneyMap;

})();
