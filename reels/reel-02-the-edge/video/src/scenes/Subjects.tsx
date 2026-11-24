import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {enter, exit} from "../components/anim";

// 4–10 s (180 f). Not just Mass Media: the 16 CUET UG subjects with test series, and the running total.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const SUBJECTS: [string, number][] = [
  ["Accountancy", 15], ["Agriculture", 15], ["Biology", 15], ["Chemistry", 15],
  ["Computer Sc.", 15], ["Economics", 15], ["English", 15], ["General Test", 15],
  ["Geography", 15], ["Hindi", 15], ["History", 15], ["Mass Media", 15],
  ["Mathematics", 15], ["Physics", 15], ["Political Sc.", 15], ["Sanskrit", 15],
];
const TOTAL = SUBJECTS.reduce((a, [, n]) => a + n, 0); // 240

export const Subjects: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 172, 8);
  const count = Math.round(interpolate(f, [14, 90], [0, TOTAL], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)}));
  return (
    <AbsoluteFill style={{background: C.bg, opacity: out}}>
      <div style={{position: "absolute", top: 250, left: 80, width: 900, fontFamily: SERIF, fontSize: 104, lineHeight: 1, color: C.navy, opacity: enter(f, 0, 12)}}>
        Not just <span style={{fontStyle: "italic", color: C.blue}}>Mass Media.</span>
      </div>
      <div style={{position: "absolute", top: 380, left: 80, fontFamily: SANS, fontWeight: 600, fontSize: 38, color: C.navy, opacity: enter(f, 6, 12) * 0.8}}>
        16 CUET UG subjects. Full test series in each.
      </div>
      <div style={{position: "absolute", top: 480, left: 80, width: 920, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14}}>
        {SUBJECTS.map(([s, n], k) => {
          const p = enter(f, 14 + k * 4, 10);
          const mm = s === "Mass Media";
          return (
            <div key={s} style={{height: 158, borderRadius: 22, background: mm ? C.navy : C.white, border: `3px solid ${mm ? C.navy : C.line}`, padding: "18px 18px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: p, transform: `scale(${0.75 + 0.25 * p})`, boxShadow: "0 8px 22px rgba(6,26,77,0.06)"}}>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 28, lineHeight: 1.1, color: mm ? C.white : C.navy}}>{s}</div>
              <div style={{display: "flex", alignItems: "baseline", gap: 8}}>
                <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 48, color: mm ? C.lime : C.blue}}>{n}</span>
                <span style={{fontFamily: SANS, fontWeight: 600, fontSize: 22, color: mm ? "rgba(255,255,255,0.7)" : C.muted}}>tests</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", top: 1220, left: 80, width: 920, display: "flex", alignItems: "center", gap: 28, opacity: enter(f, 14, 12)}}>
        <div style={{fontFamily: SERIF, fontSize: 170, lineHeight: 1, color: C.navy, fontVariantNumeric: "tabular-nums"}}>{count}</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, lineHeight: 1.15, color: C.navy}}>
          full-length
          <br />
          CUET UG mocks
        </div>
      </div>
    </AbsoluteFill>
  );
};
