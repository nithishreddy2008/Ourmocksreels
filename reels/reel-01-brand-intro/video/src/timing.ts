// One clock for picture and sound: 120 BPM, 1 beat = 0.5 s, 1 bar = 2 s.
export const FPS = 30;
export const BPM = 120;
export const DURATION_S = 31;
export const DURATION_FRAMES = DURATION_S * FPS;
export const sec = (s: number) => Math.round(s * FPS);

export const SCENES = {
  hook: {from: 0, to: 3.5},
  cuet: {from: 3.5, to: 6.5},
  iat: {from: 6.5, to: 9.5},
  nest: {from: 9.5, to: 12.5},
  comedk: {from: 12.5, to: 15.5},
  edge: {from: 15.5, to: 22},
  vision: {from: 22, to: 26.5},
  cta: {from: 26.5, to: 31},
};

// Sound cues (seconds), shared with audio/build-audio.mjs.
export const SFX = {
  hit: [0.0, 1.5, 15.5, 26.5],
  whoosh: [3.5, 6.5, 9.5, 12.5, 22],
  pops: [16.5, 16.59, 16.69, 16.78, 16.87, 16.97, 17.06, 17.15, 17.25, 17.34, 17.43, 17.53, 17.62, 17.71, 17.81, 17.9],
  ticks: [19.6, 20.2, 20.8, 21.4],
  words: [22.5, 23.0, 23.5],
  riser: [24.5, 26.5],
  logo: [26.9],
};
