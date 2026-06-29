// data.js — [PROJECT_NAME]
// Fill every [VARIABLE] before running validate.mjs
// Model: keithligh/battle-of-jaburo-0079/data.js

/**
 * Series: Narrated History Map Documentary
 * Creator: Johnny — https://linkedin.com/in/icomppower/
 * Engine: keithligh/cinematic-3d-battle-engine (MIT)
 */

export const meta = {
  title:    '[BATTLE_NAME]',          // e.g. "Operation Odessa"
  title_zh: '[BATTLE_NAME_ZH]',       // e.g. "奧德薩行動"
  date:     '[DATE_UC_CE_AD]',        // e.g. "U.C. 0079, October" or "CE 71, January"
  location: '[REAL_LOCATION]',        // e.g. "Odessa, Ukraine"
  series:   '[SOURCE_SERIES]',        // e.g. "Mobile Suit Gundam (U.C. 0079)"
  copyright:'[COPYRIGHT]',            // e.g. "© Sotsu, Sunrise, Bandai Namco"

  // Geo bounding box — every coord must be >8% inside each edge
  // Run: node tools/fetch_tiles.mjs --dry  to verify before fetching
  geo: {
    minLng: [MIN_LNG],   // e.g. 30.4
    maxLng: [MAX_LNG],   // e.g. 31.2
    minLat: [MIN_LAT],   // e.g. 46.2
    maxLat: [MAX_LAT],   // e.g. 46.8
    Z:      [ZOOM],      // tile zoom level, typically 10–12
  },

  // Vertical exaggeration: ~2.0 flat, ~4–6 mountains, omit for auto
  vexag: [VEXAG],

  // Show unit strength labels? true = yes
  showStrength: [SHOW_STRENGTH],   // true | false

  // Theme — pick one recipe from ENGINE_NOTES.md and paste here
  theme: {
    grade: { vignette: 0.35, grain: 0.18, brightness: 1.0 },
    sky:   { day: '#87CEEB', night: '#0a0a2e' },
    // fog: 0.0005,   // uncomment if needed
  },
};

// ---------------------------------------------------------------------------
// FACTIONS
// [FACTION_A_ID] = attacking / first faction  (e.g. 'zeon')
// [FACTION_B_ID] = defending / second faction (e.g. 'eff')
// Painter code lives in flags.js — copy from FACTION_FLAGS.md
// ---------------------------------------------------------------------------
export const factions = {
  [FACTION_A_ID]: {
    name:    '[FACTION_A_NAME]',      // e.g. "Principality of Zeon"
    name_zh: '[FACTION_A_NAME_ZH]',   // e.g. "吉翁公國"
    color:   '#cc0000',               // dominant hex for this faction
  },
  [FACTION_B_ID]: {
    name:    '[FACTION_B_NAME]',      // e.g. "Earth Federation Forces"
    name_zh: '[FACTION_B_NAME_ZH]',   // e.g. "地球聯邦軍"
    color:   '#1a3a6b',
  },
};

// ---------------------------------------------------------------------------
// UNITS
// Each unit: { id, faction, kind, label, label_zh, strength, track[] }
// kind: 'infantry' | 'command' | 'air' | 'navy' | 'artillery'
// track[]: { d (day offset float), lng, lat, st? }
//   st: 'advance'|'hold'|'retreat'|'dead'  (omit = engine infers)
//   Single keyframe = static marker
//   Last keyframe st:'dead' → destroyed (add explosion hotspot below)
// Unit is invisible before track[0].d
// ---------------------------------------------------------------------------
export const units = [
  // --- [FACTION_A_NAME] ---
  {
    id: 'a_hq',
    faction: '[FACTION_A_ID]',
    kind: 'command',
    label: '[FACTION_A_NAME] HQ',
    label_zh: '[FACTION_A_NAME_ZH] 總部',
    strength: 500,
    track: [
      { d: 0.0, lng: [MIN_LNG + 0.1], lat: [MIN_LAT + 0.1] },
      // Add more keyframes as needed
    ],
  },
  // --- [FACTION_B_NAME] ---
  {
    id: 'b_hq',
    faction: '[FACTION_B_ID]',
    kind: 'command',
    label: '[FACTION_B_NAME] HQ',
    label_zh: '[FACTION_B_NAME_ZH] 總部',
    strength: 500,
    track: [
      { d: 0.0, lng: [MAX_LNG - 0.1], lat: [MAX_LAT - 0.1] },
    ],
  },
  // TODO: add all units
];

// ---------------------------------------------------------------------------
// HOTSPOTS
// { id, lng, lat, d, type, label, label_zh }
// type: 'explosion'|'capture'|'landing'|'airdrop'|'bombardment'|'beam'
// ---------------------------------------------------------------------------
export const hotspots = [
  // { id: 'hs_1', lng: 30.7, lat: 46.5, d: 1.5, type: 'explosion',
  //   label: 'Example event', label_zh: '示例事件' },
];

// ---------------------------------------------------------------------------
// SHOTS (cinematic camera sequence)
// Each shot: { id, t (day offset), dur (seconds), look, narration_en, narration_zh }
// look: { lng, lat, alt, bearing, tilt }
//   bearing: 0=north, 90=east, 180=south, 270=west
//   tilt: 0=overhead, 60=low angle
// narration_en: prefix with chip tag, e.g. '<span class="cc canon">CANON</span> Text'
// ---------------------------------------------------------------------------
export const shots = [
  {
    id: 'shot_01',
    t:   0.0,
    dur: 8,
    look: {
      lng:     [MIN_LNG + (MAX_LNG - MIN_LNG) / 2],
      lat:     [MIN_LAT + (MAX_LAT - MIN_LAT) / 2],
      alt:     80000,
      bearing: 30,
      tilt:    45,
    },
    narration_en: '<span class="cc canon">CANON</span> [Opening narration in English]',
    narration_zh: '<span class="cc canon">CANON</span> [開場旁白中文]',
  },
  // TODO: add all shots — re-frame every shot in real browser before shipping
];

// ---------------------------------------------------------------------------
// NOTES
// sources: mandatory — list primary references
// caveats: chip legend + any canon-confidence notes
// ---------------------------------------------------------------------------
export const notes = {
  sources: [
    // Gundam canon sources
    '[SOURCE_SERIES] (anime series)',
    // Terrain / mapping
    'EOX Sentinel-2 cloudless 2020 (CC BY 4.0) — terrain imagery',
    'SRTM / USGS (public domain) — elevation data',
    // Add additional sources here
  ],
  caveats: [
    'CANON = confirmed in animation/official materials',
    'VARIANT = plausible interpretation of ambiguous canon',
    'SUPP = supplementary material (novels, games, MSV)',
    'STAGING = compositional inference for cinematics',
    // Add project-specific caveats here
  ],
};
