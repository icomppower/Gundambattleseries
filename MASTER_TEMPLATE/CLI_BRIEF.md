# CLI Brief — [PROJECT_NAME]

> **Paste into Claude Code.** Opus for initial scaffold; Sonnet for troubleshooting, camera reframe, fixes.

**Battle:** [BATTLE_NAME] ([DATE_UC_CE_AD])
**Slug:** [SLUG]
**Notion hub:** [NOTION_HUB_URL]
**Factions:** [FACTION_A_ID] vs [FACTION_B_ID]
**Real place disclosure:** [REAL_PLACE_DISCLOSURE: yes/no]
**Shots:** [N shots]

---

## READ FIRST — run these curl commands before writing any code

```bash
curl -s https://raw.githubusercontent.com/icomppower/Gundambattleseries/main/ENGINE_NOTES.md
curl -s https://raw.githubusercontent.com/icomppower/Gundambattleseries/main/FACTION_FLAGS.md
curl -s https://raw.githubusercontent.com/icomppower/Gundambattleseries/main/KNOWN_ISSUES.md
curl -s https://raw.githubusercontent.com/keithligh/cinematic-3d-battle-engine/main/PLAYBOOK.md
curl -s https://raw.githubusercontent.com/keithligh/cinematic-3d-battle-engine/main/AGENTS.md
curl -s https://raw.githubusercontent.com/keithligh/cinematic-3d-battle-engine/main/data.example.js
curl -s https://raw.githubusercontent.com/keithligh/battle-of-jaburo-0079/main/data.js
curl -s https://raw.githubusercontent.com/keithligh/battle-of-jaburo-0079/main/flags.js
curl -s https://raw.githubusercontent.com/icomppower/[SLUG]/main/data.js
curl -s https://raw.githubusercontent.com/icomppower/[SLUG]/main/flags.js
curl -s https://raw.githubusercontent.com/icomppower/[SLUG]/main/index.html
```

Use `raw.githubusercontent.com` only — `api.github.com` rate-limits on shared IPs.
Read ENGINE_NOTES.md + KNOWN_ISSUES.md fully before writing any code.

---

## TASK

Scaffold `icomppower/[SLUG]` from MASTER_TEMPLATE. Fill all `[VARIABLE]` placeholders with project-specific values from the Notion hub and this brief.

### Geo box
```
minLng: [MIN_LNG]   maxLng: [MAX_LNG]
minLat: [MIN_LAT]   maxLat: [MAX_LAT]
Z: [ZOOM]
vexag: [VEXAG]
```

### Look / theme
`[LOOK: cinematic/neutral/desert/space]` — paste matching theme recipe from ENGINE_NOTES.md

### Factions
- **[FACTION_A_ID]** — copy painter from FACTION_FLAGS.md
- **[FACTION_B_ID]** — copy painter from FACTION_FLAGS.md

---

## ENGINE CONTRACT — never touch these files

```
config.js  validate.js  app.js  core.js  projection.js
state.js   terrain.js   entities.js  director.js  fx.js
```

Run `node tools/check-agnostic.mjs` after every edit to confirm clean.

---

## STEPS (Opus — initial scaffold)

1. Fetch all READ FIRST files above (run the curl commands) — do this before anything else. Then clone `icomppower/[SLUG]`.
2. Copy `MASTER_TEMPLATE/` files → fill all `[VARIABLE]` placeholders
3. Write `data.js` — units, hotspots, [N shots] shots
4. Write `flags.js` — painters for [FACTION_A_ID] and [FACTION_B_ID]
5. Patch `index.html <head>` — title, canon-confidence chip CSS, `<audio>` commented out
   - Add creator credit meta tag and fixed footer div (see ENGINE_NOTES.md — Creator Credit section)
6. `node tools/fetch_tiles.mjs --dry` → then fetch tiles → commit into `lib/tiles`
7. `node tools/validate.mjs` → must pass clean
8. `node tools/check-agnostic.mjs` → must pass clean
9. Commit all; push to `icomppower/[SLUG]`

## STEPS (Sonnet — after Opus scaffold)

10. Open in browser; play all shots end-to-end
11. Re-frame each shot's `look` until camera is correct
12. Fix any coord / timing issues flagged by validate
13. Uncomment `<audio>` if music file is ready; update THIRD_PARTY_NOTICES.md
14. `vercel --prod` → `[SLUG].vercel.app`
15. Add row to `icomppower/Gundambattleseries` README.md Series Registry

---

## VALIDATE CHECKLIST

- [ ] `node tools/validate.mjs` → OK
- [ ] `node tools/check-agnostic.mjs` → clean
- [ ] All shots play end-to-end, camera self-directs + resumes after free-look
- [ ] `notes.sources` non-empty
- [ ] Every caption has a chip (`CANON` / `VARIANT` / `SUPP` / `STAGING`)
- [ ] Re-frame every shot in real browser

---

## DEPLOY

```bash
npm i -g vercel
vercel login
vercel          # preview
vercel --prod   # → [SLUG].vercel.app
```

Framework preset: **Static HTML** — no framework, output dir `.`, no build command.
Commit tiles + music before deploying.

---

## AFTER DEPLOY

Add a row to `icomppower/Gundambattleseries` README.md:

```
| NN | [BATTLE_NAME] | [SOURCE_SERIES] | [REAL_LOCATION] | ✅ Live | [[SLUG]](https://github.com/icomppower/[SLUG]) | [SLUG].vercel.app |
```
