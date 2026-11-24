// public/soundtrack.wav: original synthesized music + sound effects from the earshot bank (audio/sfx/*.wav),
// all on the 120 BPM grid shared with the picture (src/timing.ts).
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {BPM, DURATION_S, SCENES, SFX} from "../src/timing.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const SR = 48000, N = Math.round(DURATION_S * SR), BEAT = 60 / BPM, BAR = BEAT * 4, TAU = Math.PI * 2;
const L = new Float32Array(N), R = new Float32Array(N);
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
let seed = 13579;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const add = (i, l, r) => { if (i >= 0 && i < N) { L[i] += l; R[i] += r; } };

// Bright and hopeful: Cmaj7 – Am7 – Fmaj7 – G6, one chord per bar.
const CHORDS = [[48, 55, 59, 62, 64], [45, 52, 55, 60, 64], [41, 48, 52, 57, 60], [43, 50, 55, 59, 62]];
const END = 30.0;
const chordAt = (t) => (t >= END ? CHORDS[0] : CHORDS[Math.floor(t / BAR) % 4]);
// 0 hook · 1 exams · 2 edge · 3 vision · 4 cta
const sect = (t) => (t < SCENES.cuet.from ? 0 : t < SCENES.edge.from ? 1 : t < SCENES.vision.from ? 2 : t < SCENES.cta.from ? 3 : 4);

// Pad
{
  const ph = new Map(); let lpL = 0, lpR = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR; let sL = 0, sR = 0;
    chordAt(t).forEach((m, k) => {
      for (const d of [-0.07, 0.07]) {
        const key = `${k}${d}`; const p = ((ph.get(key) ?? k * 0.27) + mtof(m + d + 12) / SR) % 1; ph.set(key, p);
        let v = 0; for (let h = 1; h <= 5; h++) v += Math.sin(TAU * p * h) / (h * h * 0.7 + 0.3);
        if (d < 0) sL += v; else sR += v;
      }
    });
    const cut = [1600, 3200, 2800, 2000, 4200][sect(t)];
    const a = 1 - Math.exp((-TAU * cut) / SR);
    lpL += a * (sL - lpL); lpR += a * (sR - lpR);
    const g = 0.012 * Math.min(1, (t % BAR) / 0.2) * Math.min(1, t / 0.4) * (sect(t) === 3 ? 1.3 : 1);
    L[i] += lpL * g; R[i] += lpR * g;
  }
}
// Plucks
const pluck = (t0, m, g, pan = 0, dec = 0.14) => {
  const f = mtof(m), i0 = Math.round(t0 * SR);
  for (let j = 0; j < dec * 5 * SR; j++) {
    const t = j / SR, e = Math.exp(-t / dec) * Math.min(1, t / 0.002);
    const v = (Math.sin(TAU * f * t) + 0.35 * Math.sin(TAU * 2 * f * t) * Math.exp(-t / 0.05)) * e * g;
    add(i0 + j, v * (1 - pan), v * (1 + pan));
  }
};
for (let s = 0; (s * BEAT) / 2 < END; s++) {
  const t = (s * BEAT) / 2, sc = sect(t), ch = chordAt(t);
  const g = [0.035, 0.065, 0.07, 0.05, 0.08][sc];
  pluck(t, ch[[0, 2, 4, 3, 1, 4, 2, 3][s % 8]] + 24, g * (s % 2 ? 0.65 : 1), s % 2 ? 0.35 : -0.35);
}
// Drums
const kick = (t0, g) => { const i0 = Math.round(t0 * SR); let p = 0; for (let j = 0; j < 0.35 * SR; j++) { const t = j / SR; p += (45 + 100 * Math.exp(-t / 0.03)) / SR; add(i0 + j, Math.sin(TAU * p) * Math.exp(-t / 0.16) * g, Math.sin(TAU * p) * Math.exp(-t / 0.16) * g); } };
const noise = (t0, dur, dec, g, hp, pan = 0) => { const i0 = Math.round(t0 * SR); let prev = 0, lp = 0; for (let j = 0; j < dur * SR; j++) { const n = rnd(), h = n - prev; prev = n; lp += 0.5 * (h - lp); const v = (hp ? lp : n) * Math.exp(-(j / SR) / dec) * g; add(i0 + j, v * (1 - pan), v * (1 + pan)); } };
for (let b = 0; b * BEAT < END; b++) {
  const t = b * BEAT, sc = sect(t);
  if (sc === 1 || sc === 2 || sc === 4) kick(t, sc === 2 ? 0.22 : 0.27);
  if (sc === 3 && b % 2 === 0) kick(t, 0.12);
  if ((sc === 1 || sc === 4) && b % 2 === 1) for (const d of [0, 0.011, 0.022]) noise(t + d, 0.2, 0.06, 0.08, false);
  if (sc >= 1) noise(t + BEAT / 2, 0.05, 0.014, 0.08, true, 0.3);
}
// Bass from the exams on
{ let p = 0; for (let i = Math.round(SCENES.cuet.from * SR); i < Math.round((END + 0.5) * SR); i++) { const t = i / SR; if (sect(t) === 3) continue; p += mtof(chordAt(t)[0] - 12) / SR; const duck = Math.min(1, Math.pow(((t % BEAT) / BEAT) / 0.4, 2)); const tail = t > END ? Math.max(0, 1 - (t - END) / 0.5) : 1; const v = Math.tanh(Math.sin(TAU * p) * 1.4) * 0.04 * duck * tail; L[i] += v; R[i] += v; } }

// SFX from the earshot bank (24-bit stereo WAV). `apex` = seconds into the file that should land on the cue.
const readWav = (name) => {
  const b = fs.readFileSync(path.join(here, "sfx", name));
  let o = 12, fmt, data;
  while (o < b.length) { const id = b.toString("ascii", o, o + 4), sz = b.readUInt32LE(o + 4); if (id === "fmt ") fmt = {ch: b.readUInt16LE(o + 10), bits: b.readUInt16LE(o + 22)}; if (id === "data") data = b.subarray(o + 8, o + 8 + sz); o += 8 + sz + (sz % 2); }
  const bps = fmt.bits / 8, n = data.length / (bps * fmt.ch), l = new Float32Array(n), r = new Float32Array(n);
  const rd = (k) => (bps === 3 ? data.readIntLE(k, 3) / 8388608 : data.readInt16LE(k) / 32768);
  for (let i = 0; i < n; i++) { l[i] = rd(i * bps * fmt.ch); r[i] = fmt.ch > 1 ? rd(i * bps * fmt.ch + bps) : l[i]; }
  return {l, r};
};
const place = (name, cue, apex, g) => { const s = readWav(name), i0 = Math.round((cue - apex) * SR); for (let j = 0; j < s.l.length; j++) add(i0 + j, s.l[j] * g, s.r[j] * g); };
SFX.hit.forEach((t) => place("cut_hit_punch.wav", t, 0.0, 0.35));
SFX.whoosh.forEach((t) => place("whoosh_fast_crisp.wav", t, 0.131, 0.28));
SFX.pops.forEach((t, k) => place("pro_pop_in_round.wav", t, 0.0, 0.16 * (k % 2 ? 0.8 : 1)));
SFX.ticks.forEach((t) => place("pro_tap_glass.wav", t, 0.0, 0.3));
SFX.words.forEach((t, k) => place("mallet_glock.wav", t, 0.0, 0.18 + k * 0.03));
place("riser_swell.wav", SFX.riser[1], 2.192, 0.3);
SFX.logo.forEach((t) => place("pro_logo_sting_swell_sting.wav", t, 0.164, 0.35));

// Master
let peak = 0;
for (let i = 0; i < N; i++) { const t = i / SR; const fade = Math.min(1, t / 0.01) * Math.min(1, Math.max(0, (DURATION_S - t) / 0.7)); L[i] = Math.tanh(L[i] * 1.1) * fade; R[i] = Math.tanh(R[i] * 1.1) * fade; peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
const norm = 0.89 / peak, out = Buffer.alloc(44 + N * 4);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 4, 4); out.write("WAVE", 8); out.write("fmt ", 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4); out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), 46 + i * 4); }
fs.writeFileSync(path.join(here, "..", "public", "soundtrack.wav"), out);
console.log("soundtrack.wav", DURATION_S, "s");
