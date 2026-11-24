// Builds public/soundtrack.wav: original music + SFX + voiceover, one mix on one beat grid.
// Usage: node audio/build-audio.mjs <dir with raw say() WAVs l1..l5>
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {BPM, DURATION_S, VO_STARTS, SFX} from "../src/timing.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const voDir = process.argv[2];
const SR = 48000;
const N = Math.round(DURATION_S * SR);
const BEAT = 60 / BPM;
const L = new Float32Array(N);
const R = new Float32Array(N);
const music = {L: new Float32Array(N), R: new Float32Array(N)};

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const TAU = Math.PI * 2;

// Deterministic noise so every render is identical.
let seed = 1234567;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

const add = (buf, i, l, r) => {
  if (i >= 0 && i < N) {
    buf.L[i] += l;
    buf.R[i] += r;
  }
};

// ---------- Harmony: Dmaj9 – Bm9 – Gmaj7 – A6sus, one chord per bar ----------
const CHORDS = [
  [50, 57, 61, 64, 66],
  [47, 54, 57, 61, 62],
  [43, 50, 54, 59, 62],
  [45, 52, 54, 59, 62],
];
const BAR = BEAT * 4;
const chordAt = (t) => {
  // last 1.5s rings out on the home chord
  if (t >= 16) return CHORDS[0];
  return CHORDS[Math.floor(t / BAR) % 4];
};

// Section intensity (0..1) — the track builds towards the CTA.
const section = (t) => (t < 4 ? 0 : t < 8 ? 1 : t < 13 ? 2 : 3);

// ---------- Pad: soft additive saws, filter opens as the video builds ----------
{
  let lpL = 0, lpR = 0;
  const phases = new Map();
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const chord = chordAt(t);
    const barPos = (t % BAR) / BAR;
    const env = Math.min(1, (t % BAR) / 0.25) * (t >= 16 ? 1 : 1 - 0.25 * barPos);
    let sL = 0, sR = 0;
    chord.forEach((m, k) => {
      for (const det of [-0.07, 0.07]) {
        const key = `${k}${det}`;
        const f = mtof(m + 12 + det);
        const ph = (phases.get(key) ?? k * 0.37) + f / SR;
        phases.set(key, ph % 1);
        let v = 0;
        for (let h = 1; h <= 5; h++) v += Math.sin(TAU * ph * h) / h;
        if (det < 0) sL += v; else sR += v;
      }
    });
    const cutoff = [900, 1400, 2200, 3200][section(t)] + 600 * Math.sin((t / DURATION_S) * Math.PI);
    const a = 1 - Math.exp((-TAU * cutoff) / SR);
    lpL += a * (sL - lpL);
    lpR += a * (sR - lpR);
    const g = 0.022 * env * (t < 1 ? t : 1);
    music.L[i] += lpL * g;
    music.R[i] += lpR * g;
  }
}

// ---------- Pluck arpeggio on eighths ----------
const pluck = (t0, m, gain, pan, decay = 0.22) => {
  const f = mtof(m);
  const i0 = Math.round(t0 * SR);
  const len = Math.round(decay * 5 * SR);
  for (let j = 0; j < len; j++) {
    const t = j / SR;
    const env = Math.exp(-t / decay) * Math.min(1, t / 0.003);
    const v = (Math.sin(TAU * f * t) + 0.35 * Math.sin(TAU * 2 * f * t) * Math.exp(-t / 0.05)) * env * gain;
    add(music, i0 + j, v * (1 - pan), v * (1 + pan));
  }
};
for (let s = 0; s * BEAT / 2 < 16; s++) {
  const t = (s * BEAT) / 2;
  const chord = chordAt(t);
  const order = [0, 2, 3, 4, 2, 3, 1, 4];
  const m = chord[order[s % 8]] + 24;
  const g = [0.05, 0.055, 0.06, 0.065][section(t)] * (s % 2 ? 0.75 : 1);
  pluck(t, m, g, s % 2 ? 0.35 : -0.35);
}

// ---------- Kick + sidechain-style bass ----------
const kickTimes = [];
for (let b = 0; b * BEAT < 16; b++) {
  const t = b * BEAT;
  if (t >= 4) kickTimes.push(t);
}
for (const t0 of kickTimes) {
  const i0 = Math.round(t0 * SR);
  const g = section(t0) === 1 ? 0.35 : 0.45;
  let ph = 0;
  for (let j = 0; j < 0.35 * SR; j++) {
    const t = j / SR;
    const f = 45 + 85 * Math.exp(-t / 0.035);
    ph += f / SR;
    const v = Math.sin(TAU * ph) * Math.exp(-t / 0.16) * g;
    add(music, i0 + j, v, v);
  }
}
{
  // Bass: offbeat eighths on the chord root, ducked by the kick grid.
  let ph = 0;
  for (let i = Math.round(4 * SR); i < Math.round(16.5 * SR); i++) {
    const t = i / SR;
    const root = chordAt(t)[0] - 12 + (chordAt(t)[0] < 47 ? 12 : 0);
    ph += mtof(root) / SR;
    const inBeat = (t % BEAT) / BEAT;
    const duck = Math.min(1, Math.pow(inBeat / 0.45, 2));
    let v = Math.sin(TAU * ph) + 0.25 * Math.sin(TAU * 2 * ph);
    v = Math.tanh(v * 1.4) * 0.11 * duck * (t > 16 ? Math.max(0, 1 - (t - 16) / 0.5) : 1);
    music.L[i] += v;
    music.R[i] += v;
  }
}

// ---------- Hats and clap from scene 3 ----------
const noiseHit = (t0, dur, decay, gain, hp, pan = 0) => {
  const i0 = Math.round(t0 * SR);
  let prev = 0, lp = 0;
  for (let j = 0; j < dur * SR; j++) {
    const t = j / SR;
    const n = rnd();
    const hiPassed = n - prev;
    prev = n;
    lp += 0.5 * (hiPassed - lp);
    const v = (hp ? lp : n) * Math.exp(-t / decay) * gain;
    add(music, i0 + j, v * (1 - pan), v * (1 + pan));
  }
};
for (let s = 0; s * BEAT / 2 < 16; s++) {
  const t = (s * BEAT) / 2;
  if (t >= 8 && s % 2 === 1) noiseHit(t, 0.08, 0.018, section(t) === 3 ? 0.07 : 0.05, true, 0.25);
  if (t >= 8 && s % 4 === 2) {
    for (const d of [0, 0.011, 0.022]) noiseHit(t + d, 0.2, 0.06, 0.06, false);
  }
}

// ---------- Transitions ----------
const whoosh = (center, gain) => {
  const start = center - 0.35;
  const i0 = Math.round(start * SR);
  let lp = 0;
  for (let j = 0; j < 0.6 * SR; j++) {
    const t = j / SR;
    const x = t / 0.6;
    const env = Math.sin(Math.PI * Math.min(1, x * 1.15)) ** 2;
    const cutoff = 300 + 4200 * Math.sin(Math.PI * x);
    const a = 1 - Math.exp((-TAU * cutoff) / SR);
    lp += a * (rnd() - lp);
    const pan = Math.sin(Math.PI * x * 2) * 0.6;
    add(music, i0 + j, lp * env * gain * (1 - pan), lp * env * gain * (1 + pan));
  }
};
SFX.whoosh.forEach((t) => whoosh(t, 0.16));

// Riser into the CTA.
{
  let lp = 0;
  const a0 = SFX.riser[0], a1 = SFX.riser[1];
  for (let i = Math.round(a0 * SR); i < Math.round(a1 * SR); i++) {
    const x = (i / SR - a0) / (a1 - a0);
    const cutoff = 400 + 6000 * x * x;
    const a = 1 - Math.exp((-TAU * cutoff) / SR);
    lp += a * (rnd() - lp);
    const v = lp * 0.09 * x * x;
    music.L[i] += v;
    music.R[i] += v;
  }
}

// UI clicks and in-key pings.
const click = (t0, gain) => noiseHit(t0, 0.02, 0.003, gain, true);
const ping = (t0, m, gain, decay = 0.35) => pluck(t0, m, gain, 0, decay);
SFX.logoTick.forEach((t) => ping(t, 86, 0.06, 0.3));
SFX.cards.forEach((t, k) => { click(t, 0.12); ping(t, [74, 78, 81, 86][k], 0.035, 0.18); });
SFX.tap.forEach((t) => click(t, 0.25));
SFX.correct.forEach((t) => { ping(t, 86, 0.07); ping(t + 0.08, 93, 0.06); });
SFX.steps.forEach((t, k) => ping(t, [62, 66, 69, 74][k] + 12, 0.05, 0.25));

// Final logo reveal: chord stab + bell.
const bell = (t0, m, gain) => {
  const f = mtof(m);
  const i0 = Math.round(t0 * SR);
  for (let j = 0; j < 2.5 * SR; j++) {
    const t = j / SR;
    let v = 0;
    [[1, 1, 1.4], [2.76, 0.45, 0.6], [5.4, 0.2, 0.3], [2, 0.3, 1.0]].forEach(([r, a, d]) => {
      v += a * Math.sin(TAU * f * r * t) * Math.exp(-t / d);
    });
    v *= gain * Math.min(1, t / 0.002);
    add(music, i0 + j, v, v);
  }
};
SFX.logoReveal.forEach((t) => {
  bell(t, 86, 0.05);
  CHORDS[0].forEach((m) => pluck(t, m + 12, 0.04, 0, 0.9));
});
SFX.finalTick.forEach((t) => { ping(t, 93, 0.05, 0.5); ping(t + 0.125, 98, 0.04, 0.6); });

// ---------- Voiceover ----------
const readWav = (file) => {
  const buf = fs.readFileSync(file);
  let p = 12, fmt, data;
  while (p < buf.length) {
    const id = buf.toString("ascii", p, p + 4);
    const size = buf.readUInt32LE(p + 4);
    if (id === "fmt ") fmt = {ch: buf.readUInt16LE(p + 10), sr: buf.readUInt32LE(p + 12), bits: buf.readUInt16LE(p + 22)};
    if (id === "data") data = buf.subarray(p + 8, p + 8 + size);
    p += 8 + size + (size % 2);
  }
  if (fmt.bits !== 16 || fmt.sr !== SR) throw new Error(`${file}: need 16-bit ${SR} Hz`);
  const n = data.length / 2 / fmt.ch;
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = data.readInt16LE(i * 2 * fmt.ch) / 32768;
  return out;
};
const trim = (x) => {
  const th = 0.006;
  let a = 0, b = x.length - 1;
  while (a < b && Math.abs(x[a]) < th) a++;
  while (b > a && Math.abs(x[b]) < th) b--;
  const pad = Math.round(0.02 * SR);
  return x.subarray(Math.max(0, a - pad), Math.min(x.length, b + pad));
};

const voice = new Float32Array(N);
const voTimings = [];
VO_STARTS.forEach((start, k) => {
  const x = trim(readWav(path.join(voDir, `l${k + 1}.wav`)));
  const i0 = Math.round(start * SR);
  // Light presence: a touch of high-shelf by mixing in the first difference.
  let prev = 0;
  for (let j = 0; j < x.length; j++) {
    const v = x[j] + 0.25 * (x[j] - prev);
    prev = x[j];
    if (i0 + j < N) voice[i0 + j] += v;
  }
  voTimings.push({start, end: +(start + x.length / SR).toFixed(3)});
});

// Duck the music under the voice (smoothed gain).
{
  let g = 1;
  const active = (t) => voTimings.some((v) => t >= v.start - 0.08 && t <= v.end + 0.05);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const target = active(t) ? 0.3 : 1;
    g += (target - g) * (target < g ? 0.004 : 0.0006);
    // Overall fade-in on the first frames and fade-out at the end.
    const fade = Math.min(1, t / 0.05) * Math.min(1, Math.max(0, (DURATION_S - t) / 0.6));
    L[i] = (music.L[i] * g + voice[i] * 0.85) * fade;
    R[i] = (music.R[i] * g + voice[i] * 0.85) * fade;
  }
}

// ---------- Master: gentle soft-clip, normalise to -1 dBFS ----------
let peak = 0;
for (let i = 0; i < N; i++) {
  L[i] = Math.tanh(L[i] * 1.1);
  R[i] = Math.tanh(R[i] * 1.1);
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
const pub = path.join(here, "..", "public");
fs.writeFileSync(path.join(pub, "soundtrack.wav"), out);
fs.writeFileSync(path.join(pub, "vo-timings.json"), JSON.stringify(voTimings, null, 2));
console.log("soundtrack.wav", DURATION_S, "s; VO", voTimings);
