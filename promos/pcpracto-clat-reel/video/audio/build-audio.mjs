// Builds public/soundtrack.wav: original music + SFX on one 120 BPM grid (no voiceover).
// Usage: node audio/build-audio.mjs
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {BPM, DURATION_S, SCENES, SFX} from "../src/timing.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const SR = 48000;
const N = Math.round(DURATION_S * SR);
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const TAU = Math.PI * 2;
const L = new Float32Array(N);
const R = new Float32Array(N);
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

let seed = 7654321;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const add = (i, l, r) => {
  if (i >= 0 && i < N) {
    L[i] += l;
    R[i] += r;
  }
};

// D minor: Dm7 – B♭maj7 – F – Cadd9, one chord per bar.
const CHORDS = [
  [50, 57, 60, 62, 65],
  [46, 53, 57, 58, 62],
  [41, 48, 53, 57, 60],
  [48, 55, 60, 62, 64],
];
const END_MUSIC = 44.0; // last bar rings out on Dm
const chordAt = (t) => (t >= END_MUSIC ? CHORDS[0] : CHORDS[Math.floor(t / BAR) % 4]);
// 0 hook · 1 truth · 2 method · 3 academy · 4 cta
const sect = (t) => (t < SCENES.truth.from ? 0 : t < SCENES.method.from ? 1 : t < SCENES.academy.from ? 2 : t < SCENES.cta.from ? 3 : 4);

// ---------- Pad: additive saws through a one-pole filter that opens section by section ----------
{
  const phases = new Map();
  let lpL = 0, lpR = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    let sL = 0, sR = 0;
    chordAt(t).forEach((m, k) => {
      for (const det of [-0.08, 0.08]) {
        const key = `${k}${det}`;
        const ph = ((phases.get(key) ?? k * 0.31) + mtof(m + det) / SR) % 1;
        phases.set(key, ph);
        let v = 0;
        for (let h = 1; h <= 6; h++) v += Math.sin(TAU * ph * h) / h;
        if (det < 0) sL += v; else sR += v;
      }
    });
    const cut = [500, 900, 1400, 2200, 3000][sect(t)];
    const a = 1 - Math.exp((-TAU * cut) / SR);
    lpL += a * (sL - lpL);
    lpR += a * (sR - lpR);
    const env = Math.min(1, (t % BAR) / 0.15) * Math.min(1, t / 1.5);
    const g = 0.016 * env;
    L[i] += lpL * g;
    R[i] += lpR * g;
  }
}

// ---------- Plucks ----------
const pluck = (t0, m, gain, pan = 0, decay = 0.16) => {
  const f = mtof(m);
  const i0 = Math.round(t0 * SR);
  for (let j = 0; j < decay * 5 * SR; j++) {
    const t = j / SR;
    const env = Math.exp(-t / decay) * Math.min(1, t / 0.002);
    const v = (Math.sin(TAU * f * t) + 0.4 * Math.sin(TAU * 2 * f * t) * Math.exp(-t / 0.04)) * env * gain;
    add(i0 + j, v * (1 - pan), v * (1 + pan));
  }
};
// Sixteenth-note arpeggio from the truth scene on.
for (let s = 0; (s * BEAT) / 4 < END_MUSIC; s++) {
  const t = (s * BEAT) / 4;
  const sc = sect(t);
  if (sc === 0) continue;
  const ch = chordAt(t);
  const order = [0, 2, 4, 2, 3, 4, 1, 4];
  const accent = s % 4 === 0 ? 1 : 0.6;
  pluck(t, ch[order[s % 8]] + 24, [0, 0.028, 0.035, 0.04, 0.045][sc] * accent, s % 2 ? 0.4 : -0.4, 0.09);
}

// ---------- Clock tick (exam pressure) on eighths until the CTA ----------
const click = (t0, gain, freq) => {
  const i0 = Math.round(t0 * SR);
  for (let j = 0; j < 0.03 * SR; j++) {
    const t = j / SR;
    const v = (Math.sin(TAU * freq * t) * 0.6 + rnd() * 0.4) * Math.exp(-t / 0.004) * gain;
    add(i0 + j, v, v);
  }
};
for (let s = 0; (s * BEAT) / 2 < SCENES.cta.from; s++) {
  const t = (s * BEAT) / 2;
  click(t, sect(t) === 0 ? 0.09 : 0.05, s % 2 ? 2600 : 3400);
}

// ---------- Drums ----------
const kick = (t0, g) => {
  const i0 = Math.round(t0 * SR);
  let ph = 0;
  for (let j = 0; j < 0.4 * SR; j++) {
    const t = j / SR;
    ph += (42 + 95 * Math.exp(-t / 0.03)) / SR;
    const v = Math.sin(TAU * ph) * Math.exp(-t / 0.18) * g;
    add(i0 + j, v, v);
  }
};
const noise = (t0, dur, decay, gain, hp, pan = 0) => {
  const i0 = Math.round(t0 * SR);
  let prev = 0, lp = 0;
  for (let j = 0; j < dur * SR; j++) {
    const t = j / SR;
    const n = rnd();
    const h = n - prev;
    prev = n;
    lp += 0.5 * (h - lp);
    const v = (hp ? lp : n) * Math.exp(-t / decay) * gain;
    add(i0 + j, v * (1 - pan), v * (1 + pan));
  }
};
for (let b = 0; b * BEAT < END_MUSIC; b++) {
  const t = b * BEAT;
  const sc = sect(t);
  if (sc >= 1) kick(t, [0, 0.3, 0.42, 0.48, 0.5][sc]);
  if (sc >= 2 && b % 2 === 1) for (const d of [0, 0.01, 0.021]) noise(t + d, 0.22, 0.07, 0.07, false);
  if (sc >= 3) noise(t + BEAT / 2, 0.06, 0.016, 0.06, true, 0.3);
}

// ---------- Bass: offbeat eighths, ducked by the kick ----------
{
  let ph = 0;
  for (let i = Math.round(SCENES.method.from * SR); i < Math.round((END_MUSIC + 0.6) * SR); i++) {
    const t = i / SR;
    ph += mtof(chordAt(t)[0] - 12 + (chordAt(t)[0] < 45 ? 12 : 0)) / SR;
    const duck = Math.min(1, Math.pow(((t % BEAT) / BEAT) / 0.45, 2));
    const tail = t > END_MUSIC ? Math.max(0, 1 - (t - END_MUSIC) / 0.6) : 1;
    const v = Math.tanh((Math.sin(TAU * ph) + 0.3 * Math.sin(TAU * 2 * ph)) * 1.5) * 0.1 * duck * tail;
    L[i] += v;
    R[i] += v;
  }
}

// ---------- SFX ----------
const impact = (t0) => {
  kick(t0, 0.7);
  noise(t0, 0.5, 0.12, 0.12, false);
  CHORDS[0].forEach((m) => pluck(t0, m + 12, 0.035, 0, 0.6));
};
const whoosh = (center, gain, len = 0.6) => {
  const i0 = Math.round((center - len * 0.6) * SR);
  let lp = 0;
  for (let j = 0; j < len * SR; j++) {
    const x = j / (len * SR);
    const env = Math.sin(Math.PI * Math.min(1, x * 1.1)) ** 2;
    const a = 1 - Math.exp((-TAU * (300 + 4500 * Math.sin(Math.PI * x))) / SR);
    lp += a * (rnd() - lp);
    const pan = Math.sin(Math.PI * x * 2) * 0.6;
    add(i0 + j, lp * env * gain * (1 - pan), lp * env * gain * (1 + pan));
  }
};
const bell = (t0, m, gain) => {
  const f = mtof(m);
  const i0 = Math.round(t0 * SR);
  for (let j = 0; j < 2.2 * SR; j++) {
    const t = j / SR;
    let v = 0;
    [[1, 1, 1.2], [2.76, 0.45, 0.5], [5.4, 0.2, 0.25], [2, 0.3, 0.9]].forEach(([r, a, d]) => (v += a * Math.sin(TAU * f * r * t) * Math.exp(-t / d)));
    v *= gain * Math.min(1, t / 0.002);
    add(i0 + j, v, v);
  }
};

SFX.impact.forEach(impact);
SFX.whoosh.forEach((t) => whoosh(t, 0.16));
SFX.steps.forEach((t, k) => { whoosh(t, 0.09, 0.4); pluck(t, [74, 77, 81][k], 0.06, 0, 0.3); });
SFX.ticks.forEach((t, k) => pluck(t, [81, 84, 86, 74, 86, 86, 89][k] ?? 86, 0.05, 0, 0.22));
SFX.paper.forEach((t) => { whoosh(t, 0.1, 0.3); noise(t, 0.08, 0.02, 0.1, false); kick(t, 0.25); });
SFX.logo.forEach((t) => { bell(t, 86, 0.045); bell(t + 0.125, 93, 0.03); });
{
  const [a0, a1] = SFX.riser;
  let lp = 0;
  for (let i = Math.round(a0 * SR); i < Math.round(a1 * SR); i++) {
    const x = (i / SR - a0) / (a1 - a0);
    const a = 1 - Math.exp((-TAU * (400 + 7000 * x * x)) / SR);
    lp += a * (rnd() - lp);
    const v = lp * 0.12 * x * x;
    L[i] += v;
    R[i] += v;
  }
}

// ---------- Master: fades, soft clip, normalise to -1 dBFS ----------
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = Math.min(1, t / 0.03) * Math.min(1, Math.max(0, (DURATION_S - t) / 0.6));
  L[i] = Math.tanh(L[i] * 1.15) * fade;
  R[i] = Math.tanh(R[i] * 1.15) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.89 / peak;
const out = Buffer.alloc(44 + N * 4);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 4, 4); out.write("WAVE", 8);
out.write("fmt ", 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34);
out.write("data", 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4);
  out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), 46 + i * 4);
}
fs.writeFileSync(path.join(here, "..", "public", "soundtrack.wav"), out);
console.log("soundtrack.wav", DURATION_S, "s");
