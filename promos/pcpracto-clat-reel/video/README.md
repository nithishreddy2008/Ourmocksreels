# PC Practo — CLAT Master Reel (source)

Remotion project for `../brag.mp4` (1080×1920, 30fps, 45s). No voiceover: the script's VO runs as word-by-word subtitles.

```bash
npm run audio    # rebuild public/soundtrack.wav (original music + SFX)
npm run studio   # live preview and scrubbing
npm run render   # writes ../brag.mp4
```

`node_modules` is a symlink to `../../brag-output/video/node_modules`; run `npm install remotion@4 @remotion/cli@4 @remotion/google-fonts@4 react@18 react-dom@18` here if that folder moves.

| Path | What |
|---|---|
| `src/timing.ts` | Scene times, every subtitle line and every sound cue (120 BPM grid). Edit subtitles here. |
| `src/brand.ts` | Colours from the logo; Archivo Black, Libre Baskerville, Inter |
| `src/passage.ts` | The original Legal Reasoning passage, principle and facts used in scenes 2–3 |
| `src/scenes/` | `Hook`, `Truth`, `Method`, `Academy`, `Cta` |
| `src/components/` | `Logo` (ellipse-masked logo + shine), `Captions`, `Backdrop` (glow + grain) |
| `audio/build-audio.mjs` | Music and SFX synthesizer/mixer |
| `public/logo.jpg` | The supplied logo, cropped to its ellipse |
| `public/presenter.png` | The presenter, cut out of the academy banner (Vision foreground mask, edge eroded 2.5px) |
