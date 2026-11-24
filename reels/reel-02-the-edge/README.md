# Reel 2 · The edge (domain subjects + professor review)

`reel-02.mp4`: 30 s, 1080×1920, 30 fps. `cover.jpg` is the suggested cover ("We made 15." with the test grid). `caption.txt` is ready to paste.

| Time | Scene |
|---|---|
| 0–4 s | **Hook.** "Can't find a CUET mock test for Mass Media?" A plain search bar types the query and spins. Then **"We made 15."** and 15 test tiles snap in. |
| 4–10 s | **Not just Mass Media.** 16 subject tiles light up with their test counts (15 each). A counter climbs to **240 full-length CUET UG mocks**. |
| 10–21.5 s | **How one question gets in.** A real question from the bank: `CUET27-ECO-T01-Q01`, price elasticity, Economics Test 1. It goes through the four steps the website describes: written to the syllabus and pattern → subject-expert checks → **VALIDATED** stamp (university professors & PhD scholars) → answer C and the full step-by-step solution. |
| 21.5–25.5 s | **Same standard, all four exams.** CUET UG, IISER IAT, NISER NEST and COMEDK UGET, each on its real campus photo, each ticked. |
| 25.5–30 s | **End card.** Logo, "Reviewed before you see it.", the four exams, "CUET UG in 16 subjects · Free Test 1 on ourmocks.com", "ourmocks.com · Follow". |

## Hook
"Can't find a CUET mock test for Mass Media? We made 15." scored **80.8 (strong)** on `ig-reel/hookscore.py`. "Nobody makes CUET mocks for Mass Media" scored the same, but it's a claim we can't prove, so it wasn't used.

## Facts checked against the repo
- 240 tests: 16 subjects × 15. Accountancy is shown as 15 at your request; the repo has a 16th Accountancy file.
- The question, options, answer and solution steps are copied from `CUET/Economics/CUET ECONOMICS TEST 1.json`. "Unit I · Consumer Behaviour" matches the syllabus in `CUET SYLLABUS/md/`.
- The expert-review checklist shows what the step checks; it doesn't claim a specific error was found in this question.
- No test counts are shown for IAT, NEST or COMEDK. This repo has no COMEDK tests yet, so the reel only says "same standard".

## Sound
- Original music: 120 BPM, Fmaj7–Dm7–B♭maj7–C.
- earshot sound effects: typing, tile pops, marimba on each step, glass ticks, a stamp impact, riser and logo sting.
- Measured −18.0 LUFS, −1.4 dBTP true peak.

## Rebuild
```bash
cd video
npm run audio
npm run render
```
