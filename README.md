# OurMocks reels

Instagram reels and promos for OurMocks (CUET UG, IISER IAT, NISER NEST, COMEDK UGET), with the source to rebuild each one.

| Folder | What's in it |
|---|---|
| `reels/OURMOCKS_REEL_STRATEGY.md` | CMO strategy: positioning, claim guardrails, Phase 1 brand reels, Phase 2 comment→DM calendar, KPIs |
| `reels/reel-01-brand-intro/` | Reel 1: vision, mission, four exams (31 s), caption, cover, photo credits, Remotion source |
| `reels/reel-02-the-edge/` | Reel 2: 16 CUET subjects × 15 tests = 240, professor review pipeline (30 s) |
| `promos/ourmocks-promo/` | 17.5 s OurMocks launch promo |
| `promos/pcpracto-clat-reel/` | 45 s PC Practo CLAT reel with presenter cut-out |
| `skills/` | Claude Code skills used: brag, brag-slim, earshot, real-sound, lemo-opuscar, ig-* |
| `instagram/` | Voice template for the ig-* skills |

## Rebuild a reel
Each `video/` folder is a Remotion 4 project. `node_modules` is not committed.

```bash
cd reels/reel-02-the-edge/video
npm install
npm run audio
npm run render
```

Campus photos are from Wikimedia Commons; see each reel's `image-credits.json`. Third-party skills keep their own licences inside `skills/`.
