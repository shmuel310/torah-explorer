const MT_CATEGORIES = [
  { 
    id: "madda", num: 1, title_en: "Book of Knowledge", title_zh: "知識之書", color: "#7C3AED", 
    subcategories: [
      { id: "yesodei_hatorah", title_en: "Yesodei HaTorah", title_zh: "妥拉的根基" },
      { id: "deot", title_en: "Deot", title_zh: "品格" },
      { id: "talmud_torah", title_en: "Talmud Torah", title_zh: "學習妥拉" },
      { id: "avodah_zarah", title_en: "Avodah Zarah", title_zh: "偶像崇拜" },
      { id: "teshuvah", title_en: "Teshuvah", title_zh: "悔改" }
    ] 
  },
  { 
    id: "ahavah", num: 2, title_en: "Book of Love", title_zh: "愛之書", color: "#EC4899", 
    subcategories: [
      { id: "kriat_shema", title_en: "Kriat Shema", title_zh: "誦讀示瑪" },
      { id: "tefillah", title_en: "Tefillah", title_zh: "禱告" },
      { id: "tefillin", title_en: "Tefillin/Mezuzah/Sefer Torah", title_zh: "經文匣/門柱經卷/妥拉卷" },
      { id: "tzitzit", title_en: "Tzitzit", title_zh: "繸子" },
      { id: "berakhot", title_en: "Berakhot", title_zh: "祝福" },
      { id: "milah", title_en: "Milah", title_zh: "割禮" }
    ] 
  },
  { 
    id: "zemanim", num: 3, title_en: "Book of Seasons", title_zh: "節令之書", color: "#F59E0B", 
    subcategories: [
      { id: "shabbat", title_en: "Shabbat", title_zh: "安息日" },
      { id: "eruvin", title_en: "Eruvin", title_zh: "界限" },
      { id: "yom_tov", title_en: "Yom Tov", title_zh: "節期" },
      { id: "chametz", title_en: "Chametz U'Matzah", title_zh: "酵與無酵餅" },
      { id: "shofar", title_en: "Shofar/Sukkah/Lulav", title_zh: "羊角/住棚/棕樹枝" },
      { id: "shekalim", title_en: "Shekalim", title_zh: "半舍客勒" },
      { id: "kiddush", title_en: "Kiddush HaChodesh", title_zh: "宣佈新月" },
      { id: "taaniyot", title_en: "Taaniyot", title_zh: "禁食" },
      { id: "megillah", title_en: "Megillah", title_zh: "以斯帖記" }
    ] 
  },
  { 
    id: "nashim", num: 4, title_en: "Book of Women", title_zh: "婦女之書", color: "#10B981", 
    subcategories: [
      { id: "ishut", title_en: "Ishut", title_zh: "婚姻" },
      { id: "gerushin", title_en: "Gerushin", title_zh: "離婚" },
      { id: "yibum", title_en: "Yibum", title_zh: "叔嫂婚" },
      { id: "naarah", title_en: "Na'arah Betulah", title_zh: "童女" },
      { id: "sotah", title_en: "Sotah", title_zh: "疑妻淫亂" }
    ] 
  },
  { 
    id: "kedushah", num: 5, title_en: "Book of Holiness", title_zh: "聖潔之書", color: "#3B82F6", 
    subcategories: [
      { id: "issurei_biah", title_en: "Issurei Biah", title_zh: "禁止的結合" },
      { id: "maakhalot", title_en: "Ma'akhalot Assurot", title_zh: "禁止的食物" },
      { id: "shechitah", title_en: "Shechitah", title_zh: "宰殺" }
    ] 
  },
  { 
    id: "haflaah", num: 6, title_en: "Book of Asseverations", title_zh: "誓言之書", color: "#8B5CF6", 
    subcategories: [
      { id: "shevuot", title_en: "Shevuot", title_zh: "誓言" },
      { id: "nedarim", title_en: "Nedarim", title_zh: "許願" },
      { id: "nezirut", title_en: "Nezirut", title_zh: "拿細耳人" },
      { id: "arakhin", title_en: "Arakhin", title_zh: "估價" }
    ] 
  },
  { 
    id: "zeraim", num: 7, title_en: "Book of Seeds", title_zh: "種子之書", color: "#22C55E", 
    subcategories: [
      { id: "kilayim", title_en: "Kilayim", title_zh: "攙雜" },
      { id: "matanot", title_en: "Matanot Aniyim", title_zh: "給窮人的禮物" },
      { id: "terumot", title_en: "Terumot", title_zh: "舉祭" },
      { id: "maaserot", title_en: "Ma'aserot", title_zh: "什一奉獻" },
      { id: "maaser_sheni", title_en: "Ma'aser Sheni", title_zh: "第二什一奉獻" },
      { id: "bikkurim", title_en: "Bikkurim", title_zh: "初熟之物" },
      { id: "shemitah", title_en: "Shemitah", title_zh: "安息年" }
    ] 
  },
  { 
    id: "avodah", num: 8, title_en: "Book of Temple Service", title_zh: "聖殿服侍之書", color: "#EF4444", 
    subcategories: [
      { id: "beit_habechirah", title_en: "Beit HaBechirah", title_zh: "聖殿" },
      { id: "kelei_hamikdash", title_en: "Kelei HaMikdash", title_zh: "聖殿器具" },
      { id: "biat_hamikdash", title_en: "Bi'at HaMikdash", title_zh: "進入聖殿" },
      { id: "issurei_mizbeach", title_en: "Issurei Mizbeach", title_zh: "禁止獻上的祭物" },
      { id: "temidin", title_en: "Temidin U'Musafin", title_zh: "常獻與附加的祭" }
    ] 
  },
  { 
    id: "korbanot", num: 9, title_en: "Book of Offerings", title_zh: "獻祭之書", color: "#F97316", 
    subcategories: [
      { id: "korban_pesach", title_en: "Korban Pesach", title_zh: "逾越節祭" },
      { id: "chagigah", title_en: "Chagigah", title_zh: "節期祭" },
      { id: "bechorot", title_en: "Bechorot", title_zh: "頭生的" },
      { id: "shgagot", title_en: "Shgagot", title_zh: "誤犯罪" },
      { id: "mechusrei", title_en: "Mechusrei Kapparah", title_zh: "未得贖者" },
      { id: "temurah", title_en: "Temurah", title_zh: "替換祭物" }
    ] 
  },
  { 
    id: "taharah", num: 10, title_en: "Book of Purity", title_zh: "潔淨之書", color: "#06B6D4", 
    subcategories: [
      { id: "tumat_met", title_en: "Tumat Met", title_zh: "死屍的污穢" },
      { id: "parah_adumah", title_en: "Parah Adumah", title_zh: "紅母牛" },
      { id: "tumat_tzaraat", title_en: "Tumat Tzaraat", title_zh: "大痲瘋的污穢" },
      { id: "metamei", title_en: "Metamei Mishkav", title_zh: "使床鋪污穢之物" },
      { id: "shear", title_en: "She'ar Avot HaTumah", title_zh: "其他污穢之源" },
      { id: "tumat_okhalin", title_en: "Tumat Okhalin", title_zh: "食物的污穢" },
      { id: "kelim", title_en: "Kelim", title_zh: "器具" },
      { id: "mikvot", title_en: "Mikvot", title_zh: "浸池" }
    ] 
  },
  { 
    id: "nezikin", num: 11, title_en: "Book of Torts", title_zh: "損害之書", color: "#6366F1", 
    subcategories: [
      { id: "nizkei", title_en: "Nizkei Mammon", title_zh: "財產損害" },
      { id: "genevah", title_en: "Genevah", title_zh: "偷竊" },
      { id: "gezelah", title_en: "Gezelah", title_zh: "搶劫" },
      { id: "chovel", title_en: "Chovel U'Mazik", title_zh: "傷害與損毀" },
      { id: "rotzeach", title_en: "Rotzeach", title_zh: "殺人" }
    ] 
  },
  { 
    id: "kinyan", num: 12, title_en: "Book of Acquisitions", title_zh: "財產之書", color: "#14B8A6", 
    subcategories: [
      { id: "mechirah", title_en: "Mechirah", title_zh: "買賣" },
      { id: "zekhiyah", title_en: "Zekhiyah U'Matanah", title_zh: "取得與贈與" },
      { id: "shekhenim", title_en: "Shekhenim", title_zh: "鄰舍" },
      { id: "sheluchin", title_en: "Sheluchin", title_zh: "代理" },
      { id: "avadim", title_en: "Avadim", title_zh: "僕婢" }
    ] 
  },
  { 
    id: "mishpatim", num: 13, title_en: "Book of Civil Laws", title_zh: "民法之書", color: "#84CC16", 
    subcategories: [
      { id: "sekhirut", title_en: "Sekhirut", title_zh: "僱傭" },
      { id: "sheelah", title_en: "She'elah U'Pikadon", title_zh: "借用與寄存" },
      { id: "malveh", title_en: "Malveh V'Loveh", title_zh: "借貸" },
      { id: "toen", title_en: "To'en V'Nit'an", title_zh: "原告與被告" },
      { id: "nachalot", title_en: "Nachalot", title_zh: "繼承" }
    ] 
  },
  { 
    id: "shoftim", num: 14, title_en: "Book of Judges", title_zh: "士師之書", color: "#64748B", 
    subcategories: [
      { id: "sanhedrin", title_en: "Sanhedrin", title_zh: "公會" },
      { id: "edut", title_en: "Edut", title_zh: "見證" },
      { id: "mamrim", title_en: "Mamrim", title_zh: "悖逆者" },
      { id: "evel", title_en: "Evel", title_zh: "哀哭" },
      { id: "melakhim", title_en: "Melakhim", title_zh: "君王" }
    ] 
  }
];
