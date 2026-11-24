# OurMocks promo — source

Remotion project for `../brag.mp4` (1080×1920, 30fps, 17.5s).

```bash
npm install
npm run audio    # rebuild public/soundtrack.wav from the raw voice lines in ../work/vo
npm run studio   # live preview and scrubbing
npm run render   # writes ../brag.mp4
```

| Path | What |
|---|---|
| `src/timing.ts` | Every scene, voice line and sound cue time (120 BPM grid). Shared by video and audio. |
| `src/brand.ts` | Colours, fonts (Instrument Serif, Playfair Display for the JEE & NEET headline, Inter), easings |
| `src/scenes/` | `Hook`, `Paths`, `Meet`, `Cta` — one per scene |
| `src/components/` | `Logo` (animated build of the real logo), `TestCard`, `Staircase`, `Rings`, `RevealText` |
| `audio/build-audio.mjs` | Original music, sound effects and voiceover mix with ducking |
| `public/` | `logo.svg` (from the notes brand kit), `soundtrack.wav` |

Voice lines were made with macOS `say -v Rishi` (Indian English); to change a line, regenerate its WAV in `../work/vo` (`--file-format=WAVE --data-format=LEI16@48000`) and run `npm run audio`.
The test card uses the real question `CUET27-CHE-T01-Q23` from `CUET/Chemistry/CUET CHEMISTRY TEST 1.json`.
