// One clock for picture and sound: 120 BPM, 1 beat = 0.5 s, 1 bar = 2 s.
export const FPS = 30;
export const BPM = 120;
export const DURATION_S = 30;
export const DURATION_FRAMES = DURATION_S * FPS;
export const sec = (s: number) => Math.round(s * FPS);

export const SCENES = {
  hook: {from: 0, to: 4},
  subjects: {from: 4, to: 10},
  journey: {from: 10, to: 21.5},
  four: {from: 21.5, to: 25.5},
  cta: {from: 25.5, to: 30},
};
// Journey steps (local frames inside the journey scene).
export const STEP_AT = [0, 75, 150, 225];

const tiles = (start: number, n: number, gap: number) => Array.from({length: n}, (_, k) => +(start + k * gap).toFixed(3));
// Sound cues (seconds), shared with audio/build-audio.mjs.
export const SFX = {
  hit: [0, 1.9, 25.5],
  typing: [0.15],
  whoosh: [4, 10, 21.5],
  testPops: tiles(2.0 + 0 / 30, 15, 2 / 30),
  subjectPops: tiles(4 + 14 / 30, 16, 4 / 30),
  steps: [10, 12.5, 15, 17.5],
  ticks: [11.0, 11.3, 13.0, 13.4, 13.8, 18.2, 22.2, 22.5, 22.8, 23.1],
  stamp: [15.4],
  riser: [23.5, 25.5],
  logo: [25.9],
};
