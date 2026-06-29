# Gundam Battle Map Series
**by Johnny · [icomppower](https://linkedin.com/in/icomppower/)**

Self-playing 3D documentary battle maps rendered on real Earth terrain.
Each entry is a cinematic, sourced reconstruction of a Gundam battle — narrated, bilingual, self-directing.

---

## Series Registry

| # | Battle | Series | Real Location | Status | Repo | Live |
|---|--------|--------|---------------|--------|------|------|
| 01 | Operation Odessa | U.C. 0079 | Odessa, Ukraine | 🟡 Building | [gundam0079odessa](https://github.com/icomppower/gundam0079odessa) | gundam0079odessa.vercel.app |
| 02 | The Day of Dakar | Z Gundam (U.C. 0087) | Dakar, Senegal | 🟡 Building | [Zgundamdakar](https://github.com/icomppower/Zgundamdakar) | icomppower.github.io/Zgundamdakar |

> Add a row here every time a new project is deployed.

---

## How to start a new project

1. Read `ENGINE_NOTES.md` + `FACTION_FLAGS.md` in this repo
2. Read `keithligh/battle-of-jaburo-0079` — the closest Gundam reference fork
3. Copy `MASTER_TEMPLATE/` into new repo `icomppower/[slug]`
4. Fill every `[VARIABLE]` in the three template files
5. Follow `CLI_BRIEF.md` — Opus for scaffolding, Sonnet for troubleshooting
6. Add a row to this registry when deployed

---

## Workflow

```
Notion (planning / canon research / scene script)
	↓
Gundambattleseries (this repo — template + engine notes)
	↓
Claude Code Opus (scaffold: data.js + flags.js + tiles + validate)
	↓
Claude Code Sonnet (camera reframe / coord fixes / music / deploy)
	↓
Vercel (vercel --prod → [slug].vercel.app)
```

---

## Reference forks (read before building)

- Engine: `keithligh/cinematic-3d-battle-engine` — PLAYBOOK.md, AGENTS.md, data.example.js
- Gundam reference fork: `keithligh/battle-of-jaburo-0079`
- Real-war reference fork: `icomppower/kyiv2022-3d`
- HK 1941 reference fork: `icomppower/battle-of-hong-kong-1941`

---

## Credits
- **Series creator:** Johnny — [linkedin.com/in/icomppower](https://linkedin.com/in/icomppower/)
- **Engine:** cinematic-3d-battle-engine by Keith Li (MIT) — used as base, not modified
- **Imagery:** Sentinel-2 © EOX IT Services GmbH · **Terrain:** AWS Terrarium / SRTM © USGS
