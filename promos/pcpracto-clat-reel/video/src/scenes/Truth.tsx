import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, DISPLAY, EASE_IN_OUT, SANS, SERIF} from "../brand";
import {Backdrop} from "../components/Backdrop";
import {Logo} from "../components/Logo";
import {enter, exit} from "../components/anim";
import {FACTS, PASSAGE, PRINCIPLE} from "../passage";

// 5.5–13s (local 0–225). The passage scrolls fast, brakes on the principle and facts,
// the three parts get tagged, the law book is ruled out, and APPLY stamps in.
const CARD = {x: 70, y: 330, w: 940, h: 1040};
const HEADER_H = 92;
const FILLER_H = 1500; // fixed so the scroll can stop exactly on the principle
const SCROLL_END = -(FILLER_H - 230);
// Real word count of the passage as written in passage.ts.
const WORDS = [...PASSAGE, PRINCIPLE, FACTS].join(" ").split(/\s+/).length;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

// Highlighter that sweeps across inline text (wraps across lines).
const marker = (p: number, color: string, underline = false): React.CSSProperties => ({
  backgroundImage: `linear-gradient(${color}, ${color})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: `${p * 100}% ${underline ? "6px" : "100%"}`,
  backgroundPosition: underline ? "0 92%" : "0 0",
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
  padding: underline ? 0 : "2px 4px",
});

export const Truth: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 214, 11);
  const cardIn = enter(f, 0, 14);
  // Fast scroll, then a hard brake onto the principle.
  const scroll = interpolate(f, [4, 50], [0, 1], {...clamp, easing: EASE_IN_OUT});
  const y = SCROLL_END * scroll;
  const blurAmt = interpolate(f, [8, 22, 38, 50], [0, 3, 3, 0], clamp);

  const tagAt = [60, 67, 75];
  const hl = interpolate(f, [67, 83], [0, 1], clamp);
  const ul = interpolate(f, [75, 95], [0, 1], clamp);
  const book = enter(f, 120, 12) * exit(f, 172, 8);
  const cross = interpolate(f, [127, 135], [0, 1], clamp);
  const apply = enter(f, 174, 8);
  const dim = 1 - 0.6 * enter(f, 174, 10);

  return (
    <AbsoluteFill style={{opacity: out, transform: `translateY(${(1 - out) * -140}px)`}}>
      <Backdrop color={C.cream} glow="#FFFDF6" grain={0.05} />
      <div style={{position: "absolute", top: 100, left: (1080 - 280) / 2}}>
        <Logo width={280} shadow={false} />
      </div>
      <div style={{position: "absolute", top: 232, width: "100%", textAlign: "center", fontFamily: DISPLAY, fontSize: 56, color: C.red, letterSpacing: 1}}>
        LEGAL REASONING
      </div>

      <div
        style={{
          position: "absolute",
          left: CARD.x,
          top: CARD.y,
          width: CARD.w,
          height: CARD.h,
          borderRadius: 30,
          background: C.white,
          boxShadow: "0 30px 70px rgba(60,20,10,0.16), 0 3px 8px rgba(60,20,10,0.08)",
          overflow: "hidden",
          opacity: cardIn * dim,
          transform: `translateY(${(1 - cardIn) * 120}px)`,
        }}
      >
        <div style={{height: HEADER_H, borderBottom: `2px solid ${C.paperLine}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", fontFamily: SANS, fontWeight: 700, fontSize: 30, color: C.grey}}>
          <span>Passage 1 · Questions 1–6</span>
          <span style={{color: C.red}}>{WORDS} words</span>
        </div>
        <div style={{position: "absolute", top: HEADER_H, left: 0, right: 0, bottom: 0, overflow: "hidden"}}>
        <div style={{position: "absolute", top: 0, left: 0, right: 0, padding: "34px 50px", transform: `translateY(${y}px)`, filter: `blur(${blurAmt}px)`, fontFamily: SERIF, fontSize: 31, lineHeight: 1.62, color: C.ink}}>
          <div style={{height: FILLER_H, overflow: "hidden"}}>
            {PASSAGE.map((p, k) => (
              <p key={k} style={{margin: "0 0 26px"}}>{p}</p>
            ))}
          </div>
          <div style={{height: 290, paddingTop: 30, boxSizing: "border-box"}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.red, marginBottom: 8}}>PRINCIPLE</div>
            <span style={{...marker(hl, C.yellow), fontWeight: 700}}>{PRINCIPLE}</span>
          </div>
          <div style={{paddingTop: 20}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.red, marginBottom: 8}}>FACTS</div>
            <span style={marker(ul, C.red, true)}>{FACTS}</span>
          </div>
        </div>
        </div>
      </div>

      {/* Tags on the card's edge, one per part. */}
      {[
        {label: "PASSAGE", top: CARD.y + HEADER_H + 40, bg: C.ink, fg: C.white},
        {label: "PRINCIPLE", top: CARD.y + HEADER_H + 270, bg: C.yellow, fg: C.ink},
        {label: "FACTS", top: CARD.y + HEADER_H + 560, bg: C.red, fg: C.white},
      ].map((t, k) => {
        const p = enter(f, tagAt[k], 10);
        return (
          <div
            key={t.label}
            style={{
              position: "absolute",
              right: 30,
              top: t.top,
              background: t.bg,
              color: t.fg,
              fontFamily: DISPLAY,
              fontSize: 34,
              padding: "12px 26px",
              borderRadius: 16,
              transform: `translateX(${(1 - p) * 120}px) rotate(${(1 - p) * 8 + 2}deg)`,
              opacity: p * dim,
              boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
            }}
          >
            {t.label}
          </div>
        );
      })}

      {/* "You don't need to know the law in advance": the law book is ruled out. */}
      {book > 0.001 && (
        <div style={{position: "absolute", left: 360, top: 980, width: 360, opacity: book, transform: `scale(${0.8 + 0.2 * book}) rotate(-6deg)`}}>
          <svg width="360" height="300" viewBox="0 0 360 300">
            <rect x="40" y="20" width="280" height="250" rx="18" fill={C.redDeep} />
            <rect x="40" y="20" width="40" height="250" rx="12" fill="#3E0609" />
            <rect x="96" y="60" width="200" height="70" rx="8" fill="none" stroke={C.yellow} strokeWidth="5" />
            <text x="196" y="108" textAnchor="middle" fontFamily={DISPLAY} fontSize="40" fill={C.yellow}>LAW</text>
            <rect x="110" y="170" width="170" height="10" rx="5" fill="#7A1A1E" />
            <rect x="110" y="200" width="130" height="10" rx="5" fill="#7A1A1E" />
            <path d="M30 30L330 270M330 30L30 270" stroke={C.red} strokeWidth="26" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - cross} style={{filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.25))"}} />
          </svg>
        </div>
      )}

      {apply > 0.001 && (
        <div style={{position: "absolute", top: 700, width: "100%", display: "flex", justifyContent: "center"}}>
          <div
            style={{
              position: "relative",
              fontFamily: DISPLAY,
              fontSize: 250,
              color: C.red,
              letterSpacing: -6,
              lineHeight: 1,
              opacity: Math.min(1, apply * 2),
              transform: `scale(${1.6 - 0.6 * apply}) rotate(-5deg)`,
            }}
          >
            <div style={{position: "absolute", left: -30, right: -30, top: "52%", height: "40%", background: C.yellow, borderRadius: 14, zIndex: -1}} />
            APPLY
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
