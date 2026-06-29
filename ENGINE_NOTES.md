# Engine Notes — cinematic-3d-battle-engine

> Battle-agnostic facts about the engine. Never edit engine modules.
> Engine base: `keithligh/cinematic-3d-battle-engine` (MIT, used unmodified per fork contract)
> Series: icomppower/Gundambattleseries — read this file before building any project

---

## The contract

A fork = `data.js` + `flags.js` + `index.html <head>` + `lib/tiles`.
Never touch: `config.js, validate.js, app.js, core.js, projection.js, state.js, terrain.js, entities.js, director.js, fx.js`
Run `node tools/check-agnostic.mjs` to prove it.

---

## Unit kinds

| kind | Glyph | Use for |
|------|-------|---------| 
| `infantry` | Wedge | MS units, ground troops, armour columns |
| `command` | Diamond | HQ, land battleships, motherships |
| `air` | Silhouette | Aircraft, MS in flight, HLV launches, missiles |
| `navy` | Hull | Ships, submarines |
| `artillery` | Gun | Fixed bombardment, beam cannons |

- Air units render aloft (`Y_BY_KIND.air`) — use for any unit with altitude
- Single keyframe = static marker
- Track ends `st:dead` = destroyed (add explosion hotspot)
- Unit invisible before `track[0].d`

---

## meta.geo

```
geo: { minLng, maxLng, minLat, maxLat, Z }
```

- Every coord must be **>8% inside each edge** (engine sinks outer ~5%)
- `node tools/fetch_tiles.mjs --dry` first
- Commit tiles into `lib/tiles` — self-contained deploy
- `meta.vexag` ~2.0 flat terrain, ~4-6 mountains, omit for auto

---

## Theme recipes

### Cinematic / period (Jaburo / Gundam posture)
```js
theme: {
	grade: { vignette: 0.35, grain: 0.18, brightness: 1.0 },
	sky: { day: '#87CEEB', night: '#0a0a2e' }
}
```

### Neutral documentary (Kyiv posture — real war)
```js
theme: {
	grade: { vignette: 0.12, grain: 0.0, brightness: 1.05 },
	sky: { day: '#b0c4d8', night: '#0d1117' }
}
```

### Desert (North Africa / SEED)
```js
theme: {
	grade: { vignette: 0.3, grain: 0.1, brightness: 1.15,
		filter: 'sepia(0.25) saturate(1.3)' },
	sky: { day: '#e8c97a', night: '#1a0a00' },
	fog: 0.0008
}
```

### Space trick (flat terrain + black sky — no engine edit)
```js
theme: {
	grade: { vignette: 0.05, grain: 0.0, brightness: 0.4,
		filter: 'contrast(1.2)' },
	sky: { day: '#000005', night: '#000000' },
	sea: '#000000',
	fog: 0.00001
}
```

---

## Canon-confidence chip (Gundam projects)

`setNarr` injects `narration_en` as HTML — no engine edit needed:

```
narration_en: 'CANON Before dawn…'
```

CSS in `index.html <head>`:
```css
.cc { padding:2px 7px; border-radius:3px; font-size:0.75em;
	font-weight:700; margin-right:6px; letter-spacing:0.05em; }
.cc.canon   { background:#1b5e20; color:#fff; }
.cc.variant { background:#e65100; color:#fff; }
.cc.supp    { background:#1a237e; color:#fff; }
.cc.staging { background:#4a148c; color:#fff; }
```

Tag key goes in `notes.caveats[]`.

---

## Evidence chip (real-war projects — Kyiv posture)

```css
.evtag { padding:2px 7px; border-radius:3px; font-size:0.75em; font-weight:700; margin-right:6px; }
.evtag.verified  { background:#1b5e20; color:#fff; }
.evtag.approx    { background:#e65100; color:#fff; }
.evtag.contested { background:#b71c1c; color:#fff; }
```

---

## Music

Wire `<audio>` tag in `index.html` — engine auto-shows music button when present, auto-hides when absent. Record source + license in `THIRD_PARTY_NOTICES.md`. **Default: leave commented out, upload manually after initial build.**

---

## Validate checklist

- [ ] `node tools/validate.mjs` → OK
- [ ] `node tools/check-agnostic.mjs` → clean
- [ ] All shots play end-to-end, camera self-directs + resumes after free-look
- [ ] `notes.sources` non-empty
- [ ] Every caption has a chip
- [ ] Re-frame every shot in real browser

---

## Deploy (Vercel — series standard)

```bash
npm i -g vercel
vercel login
vercel          # preview
vercel --prod   # → [slug].vercel.app
```

Framework preset: **Static HTML** (no framework, output dir `.`, no build command). Commit tiles + music before deploying.

---

## Creator Credit (required on every project)

The engine `index.html` has two built-in credit elements. Update **both** in every fork — different content in each:

**1 · `#title .credit` (upper-left panel) — engine credit only:**
```html
<div class="credit"><a href="https://github.com/keithligh/cinematic-3d-battle-engine" target="_blank" rel="noopener">cinematic-3d-battle-engine</a> by Keith Li (MIT)</div>
```

**2 · `#credit` (bottom footer) — series creator:**
```html
<div id="credit" lang="en">Built by <a href="https://www.linkedin.com/in/icomppower/" target="_blank" rel="noopener">Johnny Lai</a></div>
```

**Also add to `<head>`:**
```html
<meta name="author" content="Johnny Lai — https://www.linkedin.com/in/icomppower/">
```

Do **not** add a separate `div id="creator-credit"` fixed div — the engine `#credit` bar is sufficient.

---

## Timeline scrubber (optional — index.html only, no engine edit)

Lets viewers jump between shots. `Director.goToShot(i)` already exists in the engine.

Add to `index.html` before `</body>`:

```html
<input id="timeline" type="range" min="0" max="9" step="1" value="0"
  style="position:fixed;bottom:38px;left:50%;transform:translateX(-50%);
         width:220px;opacity:0.55;z-index:999;accent-color:#ffd700;">
<script>
  document.getElementById('timeline').addEventListener('input', e => {
    if(window.Director) window.Director.goToShot(+e.target.value);
  });
  const _t = document.getElementById('timeline');
  setInterval(() => { if(window.Director) _t.value = Math.max(0, window.Director.i); }, 500);
</script>
```

Set `max` to N−1 (shots minus 1). Omit if you prefer pure self-playing mode.

---

## Custom FX specs (data.js only — no engine edit)

Declare new particle effects in `data.js` via `meta.fx[name]`.

```js
meta: {
  fx: {
    'beam_saber': {
      onFire: {
        flash: { y:8, color:0x00ffff, intensity:[400,600] },
        emit: [{ sys:'glow', n:6, pos:[{},{b:4},{}],
                 vel:[{j:[-8,8]},{j:[6,14]},{j:[-8,8]}],
                 size:[8,16], life:[0.2,0.4], color:[[0,0.9,1],[0,0.7,0.9]] }]
      },
      cadence: { range:[0.8,1.4] }
    },
    'capture': {
      continuous: [{ sys:'glow', prob:0.4,
        pos:[{j:[-2,2]},{j:[0,6]},{j:[-2,2]}],
        vel:[{j:[-1,1]},{b:3},{j:[-1,1]}],
        size:[6,10], life:[0.6,1.0], color:[[0.9,0.8,0.2],[1,1,0.4]] }]
    }
  }
}
```

Reference in hotspots: `{ a:2, b:2.5, kind:'beam_saber', lng:30.72, lat:46.48, i:0.9 }`
