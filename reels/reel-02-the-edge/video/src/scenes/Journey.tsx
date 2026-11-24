import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {enter, exit} from "../components/anim";
import {STEP_AT} from "../timing";

// 10–21.5 s (345 f). One real question (CUET27-ECO-T01-Q01, CUET/Economics/CUET ECONOMICS TEST 1.json)
// goes through the four steps the platform describes: written → expert review → professors & PhD scholars → published.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const Q = "When the price of a good falls from ₹10 to ₹8, the quantity demanded rises from 40 units to 50 units. What is the price elasticity of demand (in absolute value) by the percentage method?";
const OPTS = ["0.8", "1", "1.25", "2.5"];
const STEPS = ["Written", "Expert review", "Professor check", "Published"];
const SOLUTION = ["% change in quantity = 10 ÷ 40 × 100 = 25%", "% change in price = 2 ÷ 10 × 100 = 20%", "eD = 25 ÷ 20 = 1.25 → elastic"];

const Check: React.FC<{p: number; color?: string; size?: number}> = ({p, color = C.blue, size = 40}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{flex: "none"}}>
    <circle cx="20" cy="20" r="18" fill={color} opacity={0.12 + 0.88 * p} />
    <path d="M11 21l6 6 12-14" stroke={C.white} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
  </svg>
);

export const Journey: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 337, 8);
  const step = STEP_AT.filter((s) => f >= s).length - 1;
  const panel = (k: number) => enter(f, STEP_AT[k] + 4, 12) * (k === 3 ? 1 : exit(f, STEP_AT[k + 1] - 6, 6));
  const stamp = enter(f, STEP_AT[2] + 12, 8);
  const stampShrink = enter(f, STEP_AT[3], 14);
  const answer = enter(f, STEP_AT[3] + 6, 10);
  return (
    <AbsoluteFill style={{background: C.bg, opacity: out}}>
      {/* Title + step rail */}
      <div style={{position: "absolute", top: 240, left: 80, fontFamily: SERIF, fontSize: 76, color: C.navy, opacity: enter(f, 0, 12)}}>
        How one question <span style={{fontStyle: "italic", color: C.blue}}>gets in.</span>
      </div>
      <div style={{position: "absolute", top: 345, left: 80, width: 920, display: "flex", gap: 10}}>
        {STEPS.map((s, k) => {
          const on = k <= step;
          const cur = k === step;
          return (
            <div key={s} style={{flex: 1}}>
              <div style={{height: 10, borderRadius: 5, background: on ? (cur ? C.blue : C.navy) : C.line}} />
              <div style={{fontFamily: SANS, fontWeight: cur ? 800 : 600, fontSize: 21, marginTop: 10, color: on ? C.navy : C.muted}}>
                {k + 1}. {s}
              </div>
            </div>
          );
        })}
      </div>

      {/* The question card */}
      <div style={{position: "absolute", top: 450, left: 80, width: 920, background: C.white, borderRadius: 28, padding: "30px 36px 34px", boxSizing: "border-box", boxShadow: "0 18px 50px rgba(6,26,77,0.10)", border: `2px solid ${C.line}`, opacity: enter(f, 2, 12), transform: `translateY(${(1 - enter(f, 2, 12)) * 50}px)`}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.blue}}>CUET UG · ECONOMICS · TEST 1</div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>+5 / −1</div>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 34, lineHeight: 1.32, color: C.navy, marginTop: 18, clipPath: `inset(0 0 ${(1 - interpolate(f, [6, 40], [0, 1], clamp)) * 100}% 0)`}}>{Q}</div>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24}}>
          {OPTS.map((o, k) => {
            const right = k === 2;
            const p = enter(f, 30 + k * 4, 10);
            const g = right ? answer : 0;
            return (
              <div key={o} style={{display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 16, border: `3px solid ${g > 0.5 ? "#18A957" : C.line}`, background: `rgba(24,169,87,${0.12 * g})`, opacity: p * (1 - (right ? 0 : 0.45 * answer))}}>
                <div style={{width: 46, height: 46, borderRadius: 23, background: g > 0.5 ? "#18A957" : C.blueSoft, color: g > 0.5 ? C.white : C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 800, fontSize: 26}}>{"ABCD"[k]}</div>
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.navy}}>{o}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: written to pattern and syllabus */}
      <div style={{position: "absolute", top: 1110, left: 80, width: 920, opacity: panel(0), transform: `translateY(${(1 - panel(0)) * 30}px)`}}>
        {["Unit I · Consumer Behaviour — in the NTA syllabus", "NTA pattern: 50 questions · 60 min · +5 / −1"].map((t, k) => (
          <div key={t} style={{display: "flex", alignItems: "center", gap: 18, marginBottom: 22, fontFamily: SANS, fontWeight: 600, fontSize: 34, color: C.navy}}>
            <Check p={enter(f, 30 + k * 9, 8)} />
            {t}
          </div>
        ))}
      </div>

      {/* Step 2: expert review checklist */}
      <div style={{position: "absolute", top: 1100, left: 80, width: 920, opacity: panel(1), transform: `translateY(${(1 - panel(1)) * 30}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.blue, marginBottom: 18}}>SUBJECT EXPERT</div>
        {["Answer key worked out again", "Every wrong option is wrong for a reason", "Numbers and wording checked"].map((t, k) => (
          <div key={t} style={{display: "flex", alignItems: "center", gap: 18, marginBottom: 18, fontFamily: SANS, fontWeight: 600, fontSize: 34, color: C.navy}}>
            <Check p={enter(f, STEP_AT[1] + 15 + k * 12, 8)} />
            {t}
          </div>
        ))}
      </div>

      {/* Step 3: the professors' stamp */}
      <div
        style={{
          position: "absolute",
          left: interpolate(stampShrink, [0, 1], [190, 770]),
          top: interpolate(stampShrink, [0, 1], [1080, 410]),
          width: 700,
          transformOrigin: "left top",
          transform: `scale(${interpolate(stampShrink, [0, 1], [1, 0.3]) * (1.8 - 0.8 * stamp)}) rotate(-6deg)`,
          opacity: Math.min(1, stamp * 2) * (f >= STEP_AT[2] ? 1 : 0),
        }}
      >
        <div style={{border: `8px solid ${C.navy}`, borderRadius: 28, padding: "22px 30px", background: C.lime, textAlign: "center", boxShadow: "0 16px 40px rgba(6,26,77,0.25)"}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 84, letterSpacing: 6, color: C.navy, lineHeight: 1}}>VALIDATED</div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: C.navy, marginTop: 10, opacity: 1 - stampShrink}}>by university professors &amp; PhD scholars</div>
        </div>
      </div>

      {/* Step 4: published with a full solution */}
      <div style={{position: "absolute", top: 1085, left: 80, width: 920, background: C.navy, borderRadius: 26, padding: "28px 34px", boxSizing: "border-box", opacity: panel(3), transform: `translateY(${(1 - panel(3)) * 60}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.lime}}>FULL SOLUTION · ANSWER (C)</div>
        {SOLUTION.map((s, k) => (
          <div key={s} style={{fontFamily: SANS, fontWeight: 600, fontSize: 32, color: C.white, marginTop: 14, opacity: enter(f, STEP_AT[3] + 18 + k * 12, 10)}}>
            <span style={{color: C.lime, marginRight: 14}}>Step {k + 1}</span>
            {s}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
