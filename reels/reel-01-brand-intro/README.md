# Reel 1 · Brand intro (vision, mission, four exams)

`reel-01.mp4`: 31 s, 1080×1920, 30 fps, H.264 + AAC. `cover.jpg` is the suggested cover (the hook frame). `caption.txt` is ready to paste.

| Time | Scene |
|---|---|
| 0–3.5 s | **Hook.** "JEE / NEET" struck through. "…is that all they told you?" Then a lime **4** with "exams after Class 12 nobody tells you about." over a mosaic of the four campuses. |
| 3.5–15.5 s | **Four exams, 3 s each, each on a real campus photo.** CUET UG (BHU gate), IISER IAT (IISER Pune), NISER NEST (NISER, Jatni), COMEDK UGET (RV College of Engineering). |
| 15.5–22 s | **The edge.** "Most CUET prep stops at English & General Test. We built mocks for 16 subjects." Then the review pipeline, ending in "Validated by university professors & PhD scholars". |
| 22–26.5 s | **Mission.** "Discover. Understand. Decide." Then "Your dream deserves more than one path." |
| 26.5–31 s | **CTA.** Logo builds, "Beyond JEE & NEET.", the four exams with equal weight, "ourmocks.com · Follow". |

## Hook
"4 exams after Class 12 nobody tells you about." It scored **92 (strong)** on `ig-reel/hookscore.py`. The site's own line "Your dream deserves more than one path" scored 28 as an opener, so it closes the reel instead.

## Sound
- Original music, synthesized in `video/audio/build-audio.mjs`: 120 BPM, Cmaj7–Am7–Fmaj7–G.
- Effects from the earshot bank in `video/audio/sfx/`: hits, whooshes, chip pops, ticks, a riser and a logo sting.
- Measured −17.9 LUFS with a −0.9 dBTP true peak.
- No voiceover; the on-screen text carries the message, since most people watch muted.

## Photos
All four are real photos from Wikimedia Commons; `image-credits.json` lists each author, licence and source page. Each photo carries a small on-screen credit, and the caption's last line credits them too. Two CC BY-SA photos (NISER, RVCE) mean this reel should not be relicensed more restrictively.

## Rebuild
```bash
cd video
npm run audio
npm run render
```
`node_modules` is a symlink to `../../../brag-output/video/node_modules`.
