// Single source of truth for timing, shared by the video and audio/build-audio.mjs.
// 120 BPM: one beat = 0.5s = 15 frames. Scene cuts and hits sit on the beat grid.
export const FPS = 30;
export const BPM = 120;
export const DURATION_S = 45;
export const DURATION_FRAMES = DURATION_S * FPS;

export const sec = (s: number) => Math.round(s * FPS);

export const SCENES = {
  hook: {from: 0, to: 5.5},
  truth: {from: 5.5, to: 13},
  method: {from: 13, to: 24},
  academy: {from: 24, to: 36.5},
  cta: {from: 36.5, to: DURATION_S},
};

// Method steps (seconds, absolute).
export const STEPS = [13, 16.5, 20];

// Subtitles: the script's VO, one phrase at a time. `em` words are highlighted in yellow.
export type Caption = {from: number; to: number; text: string; em?: string[]};
export const CAPTIONS: Caption[] = [
  {from: 0.3, to: 2.2, text: "CLAT doesn't test what you've memorised.", em: ["memorised."]},
  {from: 2.2, to: 3.7, text: "It tests how you think.", em: ["think."]},
  {from: 3.7, to: 5.4, text: "Here's how to train for that."},
  {from: 5.6, to: 7.4, text: "Every Legal Reasoning question gives you"},
  {from: 7.4, to: 9.4, text: "a passage, a principle and a fact situation.", em: ["passage,", "principle", "fact"]},
  {from: 9.4, to: 11.3, text: "You don't need to know the law in advance."},
  {from: 11.3, to: 12.9, text: "You need to apply it.", em: ["apply"]},
  {from: 13.6, to: 16.4, text: "“What rule is the passage giving you?”"},
  {from: 17.1, to: 19.9, text: "“Does this situation fit that rule?”"},
  {from: 20.6, to: 23.9, text: "“Answer from the passage, not from your memory.”", em: ["passage,"]},
  {from: 24.1, to: 26.3, text: "At PC Practo Online Academy, we train this skill"},
  {from: 26.3, to: 28.4, text: "on the topics CLAT actually picks from the news:", em: ["news:"]},
  {from: 28.4, to: 30.6, text: "the new criminal laws BNSS and BSA,", em: ["BNSS", "BSA,"]},
  {from: 30.6, to: 32.6, text: "cyber law and deepfakes,", em: ["deepfakes,"]},
  {from: 32.6, to: 36.4, text: "and landmark judgments with environment and international law."},
  {from: 37.0, to: 38.6, text: "Stop memorising.", em: ["memorising."]},
  {from: 38.6, to: 40.2, text: "Start reasoning.", em: ["reasoning."]},
  {from: 40.2, to: 42.2, text: "Join PC Practo Academy."},
  {from: 42.2, to: 44.4, text: "Link in bio."},
];

export const SFX = {
  impact: [1.5, 2.5, 11.5, 36.5],
  whoosh: [5.5, 13, 24, 36.5],
  steps: STEPS,
  ticks: [7.5, 7.75, 8, 10, 15, 18.5, 22.5],
  paper: [28.5, 30.5, 32.5],
  logo: [24.5, 37],
  riser: [34.5, 36.5],
};

// Settled CTA frame used as the poster and baked in as frame 0.
export const POSTER_FRAME = sec(43);
