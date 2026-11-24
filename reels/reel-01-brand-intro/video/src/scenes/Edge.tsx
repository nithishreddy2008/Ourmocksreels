import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {enter, exit} from "../components/anim";

// 15.5–22 s (195 f). Part A (0–105): 16 CUET subjects. Part B (105–195): reviewed by professors & PhD scholars.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const SUBJECTS = [
  "Accountancy", "Agriculture", "Biology", "Chemistry", "Computer Sc.", "Economics", "English", "General Test",
  "Geography", "Hindi", "History", "Mass Media", "Mathematics", "Physics", "Political Sc.", "Sanskrit",
];
const STEPS = ["Written to the NTA / official pattern", "Reviewed by subject experts", "Validated by university professors & PhD scholars", "Published with full solutions"];

export const Edge: React.FC = () => {
  const f = useCurrentFrame();
  const aOut = exit(f, 98, 8);
  const strike = interpolate(f, [22, 30], [0, 1], clamp);
  const bIn = enter(f, 106, 14);
  const out = exit(f, 187, 8);
  return (
    <AbsoluteFill style={{background: C.bg, opacity: out}}>
      {/* Part A */}
      <div style={{position: "absolute", inset: 0, opacity: aOut, transform: `translateY(${(1 - aOut) * -60}px)`}}>
        <div style={{position: "absolute", top: 250, left: 80, width: 900, fontFamily: SERIF, fontSize: 84, lineHeight: 1.02, color: C.navy, opacity: enter(f, 0, 12)}}>
          Most CUET prep{" "}
          <span style={{position: "relative", whiteSpace: "nowrap"}}>
            stops
            <span style={{position: "absolute", left: -4, top: "52%", height: 10, width: `calc(${strike * 100}% + 8px)`, background: C.blue, borderRadius: 5}} />
          </span>{" "}
          at English &amp; General Test.
        </div>
        <div style={{position: "absolute", top: 520, left: 80, width: 900, fontFamily: SERIF, fontSize: 96, lineHeight: 1, color: C.navy, opacity: enter(f, 30, 12), transform: `translateY(${(1 - enter(f, 30, 12)) * 30}px)`}}>
          We built mocks for <span style={{fontStyle: "italic", color: C.blue}}>16 subjects.</span>
        </div>
        <div style={{position: "absolute", top: 760, left: 80, width: 920, display: "flex", flexWrap: "wrap", gap: 16}}>
          {SUBJECTS.map((s, k) => {
            const p = enter(f, 30 + k * 2.8, 10);
            return (
              <div key={s} style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.navy, background: C.white, border: `3px solid ${C.line}`, borderRadius: 999, padding: "12px 26px", opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}>
                {s}
              </div>
            );
          })}
        </div>
        <div style={{position: "absolute", top: 1290, left: 80, display: "flex", alignItems: "center", gap: 18, opacity: enter(f, 82, 12)}}>
          <div style={{background: C.lime, color: C.navy, fontFamily: SANS, fontWeight: 800, fontSize: 44, padding: "12px 26px", borderRadius: 16}}>15 full tests each</div>
        </div>
      </div>

      {/* Part B */}
      <div style={{position: "absolute", inset: 0, opacity: bIn}}>
        <div style={{position: "absolute", top: 250, left: 80, width: 900, fontFamily: SERIF, fontSize: 100, lineHeight: 1, color: C.navy, transform: `translateY(${(1 - bIn) * 40}px)`}}>
          Reviewed <span style={{fontStyle: "italic", color: C.blue}}>before</span>
          <br />
          you see it.
        </div>
        <div style={{position: "absolute", top: 560, left: 80, width: 880}}>
          {STEPS.map((s, k) => {
            const at = 118 + k * 18;
            const p = enter(f, at, 12);
            const tick = enter(f, at + 4, 8);
            const hero = k === 2;
            return (
              <div key={s} style={{display: "flex", alignItems: "center", gap: 28, marginBottom: 34, opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
                <div style={{flex: "none", width: 92, height: 92, borderRadius: 46, background: hero ? C.navy : C.white, border: `4px solid ${hero ? C.navy : C.line}`, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <svg width="50" height="50" viewBox="0 0 50 50">
                    <path d="M10 26l10 10 20-22" stroke={hero ? C.lime : C.blue} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tick} />
                  </svg>
                </div>
                <div style={{fontFamily: SANS, fontWeight: hero ? 800 : 600, fontSize: hero ? 46 : 40, lineHeight: 1.18, color: C.navy, background: hero ? C.lime : "transparent", padding: hero ? "10px 20px" : 0, borderRadius: 14}}>
                  {s}
                </div>
              </div>
            );
          })}
        </div>
        {/* connector line */}
        <div style={{position: "absolute", left: 80 + 44, top: 650, width: 4, height: 3 * 126 - 92, background: C.line, zIndex: -1}} />
      </div>
    </AbsoluteFill>
  );
};
