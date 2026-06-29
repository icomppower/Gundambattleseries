# Known Issues & Gotchas

Cross-project lessons learned. Read this before building to avoid repeating known problems.

---

## GitHub / network
- `api.github.com` rate-limits on shared IPs — always use `raw.githubusercontent.com` to read files
- `git push` requires auth — Claude Code needs GitHub token configured; can't push from sandboxed environments

## Notion MCP
- `update_content` / `replace_content` fails silently on Unicode mismatches — use `insert_content` with `start`/`end` as most reliable
- Detach child pages before `replace_content` on parent pages
- Pass `parent` separately from `pages` array when batch-creating pages

## Engine / terrain
- Coords too close to box edge sink below sea level — keep every unit/arrow coord >8% inside each edge of `meta.geo`
- Flat terrain (steppe, desert, city) — always pin `meta.vexag` to ~2.0; default auto-exaggeration reads as spiky
- Wide geo box (>150km) renders imagery soft up close — tighten box or accept lower detail
- `lib/tiles` must be committed into repo before deploy — Vercel serves static files only, no tile fetcher at runtime
- `file://` does not work for local testing — always use `node tools/serve.js` → `http://localhost:5050`

## Validation
- `notes.sources` must be non-empty or engine refuses to boot
- `node tools/check-agnostic.mjs` — run after every build; battle text outside `data.js`/`flags.js`/`<head>` fails this check
- Camera values (`dist`/`az`/`el`/`orbit`) from old MapLibre builds don't translate — re-frame every shot in real browser

## Music
- Leave `<audio>` tag commented out in initial build — upload music manually in separate pass
- Engine auto-shows music button when `<audio>` present, auto-hides when absent

## Deployment
- Vercel framework preset: **Static HTML** (no framework, output dir `.`, no build command)
- Commit tiles + music into repo before `vercel --prod`
- The engine's default `.gitignore` excludes `lib/tiles/` — remove that line in every fork before committing tiles; Vercel 404s if tiles aren't in the repo
- Always use `vercel --prod --force` for this project — incremental deploys (without `--force`) only upload changed files; Vercel does not carry forward unchanged files from prior deployments and the site goes fully 404
