import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {Photo} from "../components/Photo";
import {enter, exit} from "../components/anim";

export type ExamCard = {
  n: number;
  exam: string;
  head: [string, string]; // plain, italic-lime
  sub: string;
  photo: string;
  focus?: string;
  place: string;
  credit: string;
};

// One exam, one real campus. 90 frames (3 s). Text sits inside the Reels safe zone (y 230–1440, x ≤ 850).
export const Exam: React.FC<{card: ExamCard; len: number}> = ({card, len}) => {
  const f = useCurrentFrame();
  const inP = enter(f, 0, 12);
  const out = exit(f, len - 8, 8);
  const chip = enter(f, 4, 12);
  const h1 = enter(f, 7, 14);
  const h2 = enter(f, 12, 14);
  const sub = enter(f, 18, 14);
  const place = enter(f, 24, 14);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div style={{position: "absolute", inset: 0, opacity: inP, transform: `scale(${1.04 - 0.04 * inP})`}}>
        <Photo src={card.photo} p={f / len} focus={card.focus} />
      </div>

      {/* Counter: which of the four. */}
      <div style={{position: "absolute", top: 250, left: 80, display: "flex", alignItems: "center", gap: 18, opacity: chip}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.white}}>4 EXAMS AFTER CLASS 12</div>
        <div style={{display: "flex", gap: 8}}>
          {[1, 2, 3, 4].map((k) => (
            <div key={k} style={{width: k === card.n ? 38 : 12, height: 12, borderRadius: 6, background: k <= card.n ? C.lime : "rgba(255,255,255,0.35)"}} />
          ))}
        </div>
      </div>

      <div style={{position: "absolute", left: 80, top: 900, width: 860}}>
        <div
          style={{
            display: "inline-block",
            background: C.lime,
            color: C.navy,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 40,
            letterSpacing: 1,
            padding: "10px 24px",
            borderRadius: 14,
            opacity: chip,
            transform: `translateX(${(1 - chip) * -60}px)`,
          }}
        >
          0{card.n} · {card.exam}
        </div>
        <div style={{fontFamily: SERIF, fontSize: 132, lineHeight: 0.98, color: C.white, marginTop: 26, letterSpacing: -2}}>
          <div style={{opacity: h1, transform: `translateY(${(1 - h1) * 50}px)`}}>{card.head[0]}</div>
          <div style={{opacity: h2, transform: `translateY(${(1 - h2) * 50}px)`, fontStyle: "italic", color: C.lime}}>{card.head[1]}</div>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, lineHeight: 1.25, color: C.white, marginTop: 26, opacity: sub, transform: `translateY(${(1 - sub) * 24}px)`}}>
          {card.sub}
        </div>
        <div style={{marginTop: 22, fontFamily: SANS, fontWeight: 500, fontSize: 24, color: "rgba(255,255,255,0.72)", opacity: place}}>
          <span style={{fontWeight: 700, color: C.white}}>📍 {card.place}</span>
          <span style={{marginLeft: 14}}>{card.credit}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
