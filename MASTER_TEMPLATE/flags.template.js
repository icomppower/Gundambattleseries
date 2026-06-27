// flags.js — [PROJECT_NAME]
// Copy the painter(s) you need from FACTION_FLAGS.md in Gundambattleseries repo
// Test each painter at w=48 h=48 before committing

const painters = {};

// --- [FACTION_A_ID] painter ---
// Copy from: icomppower/Gundambattleseries FACTION_FLAGS.md → matching faction entry
painters['[FACTION_A_ID]'] = (ctx, w, h) => {
  // TODO: paste painter body here
  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, w, h);
};

// --- [FACTION_B_ID] painter ---
// Copy from: icomppower/Gundambattleseries FACTION_FLAGS.md → matching faction entry
painters['[FACTION_B_ID]'] = (ctx, w, h) => {
  // TODO: paste painter body here
  ctx.fillStyle = '#444444';
  ctx.fillRect(0, 0, w, h);
};

// flagLegend: shown in the UI legend panel
// keys must match faction IDs in data.js factions object
export const flagLegend = {
  '[FACTION_A_ID]': { painter: painters['[FACTION_A_ID]'], label: '[FACTION_A_NAME]' },
  '[FACTION_B_ID]': { painter: painters['[FACTION_B_ID]'], label: '[FACTION_B_NAME]' },
};

export default painters;
