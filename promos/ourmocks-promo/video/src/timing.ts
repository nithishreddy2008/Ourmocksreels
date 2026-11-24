// Single source of truth for timing, shared by the video and audio/build-audio.mjs.
// 120 BPM: one beat = 0.5s = 15 frames. Every cut and SFX sits on the eighth-note grid.
export const FPS = 30;
export const BPM = 120;
export const DURATION_S = 17.5;
export const DURATION_FRAMES = Math.round(DURATION_S * FPS);

export const sec = (s: number) => Math.round(s * FPS);

export const SCENES = {
  hook: {from: 0, to: 4},
  paths: {from: 4, to: 8},
  meet: {from: 8, to: 13},
  cta: {from: 13, to: DURATION_S},
};

// Settled CTA frame used as the poster (brag.jpg) and baked in as frame 0.
export const POSTER_FRAME = sec(16.2);

// Voiceover line start times (seconds), l1..l5.
export const VO_STARTS = [0.45, 4.2, 8.05, 10.5, 13.35];

export const SFX = {
  whoosh: [4, 8, 13],
  riser: [11.5, 13],
  logoTick: [0.75],
  cards: [5, 5.25, 5.5, 5.75],
  tap: [9.5],
  correct: [9.75],
  steps: [10.75, 11, 11.25, 11.5],
  logoReveal: [13],
  finalTick: [14.5],
};
