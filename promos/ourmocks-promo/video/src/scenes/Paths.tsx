import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, DISPLAY_SERIF, SANS} from "../brand";
import {RevealLine} from "../components/RevealText";
import {enter, exit} from "../components/anim";

// 4–8s. The familiar JEE / NEET track, and four new branches peeling off it.
const EXAMS = ["CUET UG", "IISER IAT", "NEST", "COMEDK UGET"];
const TRUNK_X = 150;
const NODE_Y = 1290;
const CARD_X = 270;
const CARD_W = 750;
const CARD_H = 136;
const cardY = (k: number) => 560 + k * 180;
// Card k pops on the eighth-note grid: 5.0, 5.25, 5.5, 5.75s → local frames 30, 37.5, 45, 52.5.
const cardAt = (k: number) => 30 + k * 7.5;

export const Paths: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 104, 14);
  const trunk = enter(f, 4, 22);
  return (
    <AbsoluteFill style={{opacity: out, transform: `translateY(${(1 - out) * -60}px)`}}>
      <div style={{position: "absolute", top: 250, width: "100%", fontFamily: DISPLAY_SERIF, fontSize: 100, color: C.navy, letterSpacing: -1}}>
        <RevealLine frame={f} start={2} words={[{text: "Beyond"}, {text: "JEE", italic: true, color: C.blue}, {text: "&", italic: true, color: C.blue}, {text: "NEET", italic: true, color: C.blue}]} />
      </div>

      <svg width={1080} height={1920} style={{position: "absolute", inset: 0}}>
        {/* The familiar path: muted, carrying on straight up and fading out. */}
        <defs>
          <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={C.muted} stopOpacity="0.7" />
            <stop offset="1" stopColor={C.muted} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1={TRUNK_X}
          y1={1660}
          x2={TRUNK_X}
          y2={1660 - trunk * (1660 - 470)}
          stroke="url(#fade)"
          strokeWidth={8}
          strokeDasharray="2 20"
          strokeLinecap="round"
        />
        {EXAMS.map((_, k) => {
          const p = enter(f, cardAt(k) - 8, 14);
          const y = cardY(k) + CARD_H / 2;
          const d = `M${TRUNK_X} ${NODE_Y} C ${TRUNK_X} ${y + 120}, ${TRUNK_X + 10} ${y}, ${CARD_X} ${y}`;
          return (
            <path key={k} d={d} fill="none" stroke={C.blue} strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
          );
        })}
        <circle cx={TRUNK_X} cy={NODE_Y} r={18 * enter(f, 18, 10)} fill={C.bg} stroke={C.blue} strokeWidth={7} />
      </svg>

      {[
        {label: "JEE", y: 1400, at: 10},
        {label: "NEET", y: 1520, at: 14},
      ].map(({label, y, at}) => {
        const p = enter(f, at, 12);
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: TRUNK_X - 90,
              top: y,
              width: 180,
              height: 72,
              borderRadius: 36,
              background: "#E9ECF4",
              color: C.muted,
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: p,
              transform: `scale(${0.8 + 0.2 * p})`,
            }}
          >
            {label}
          </div>
        );
      })}

      {EXAMS.map((name, k) => {
        const p = enter(f, cardAt(k), 14);
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: CARD_X,
              top: cardY(k),
              width: CARD_W,
              height: CARD_H,
              borderRadius: 34,
              background: C.white,
              boxShadow: "0 18px 40px rgba(6,26,77,0.10), 0 2px 6px rgba(6,26,77,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 30,
              paddingLeft: 40,
              opacity: p,
              transform: `translateX(${(1 - p) * 70}px) scale(${0.94 + 0.06 * p})`,
              transformOrigin: "left center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                border: `8px solid ${k % 2 ? C.navy : C.blue}`,
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 62, color: C.navy, letterSpacing: -1.5}}>{name}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
