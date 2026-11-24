import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, EASE_IN_OUT, SANS, SERIF} from "../brand";
import {Logo} from "../components/Logo";
import {RevealLine} from "../components/RevealText";
import {TestCard} from "../components/TestCard";
import {Staircase} from "../components/Staircase";
import {enter, exit, lerp} from "../components/anim";

// 8–13s (local frames 0–150).
//   0–21   "Meet" + logo in focus
//   21–78  real CUET question card, tap → correct, three proof chips
//   78–150 "Learn step by step." + four-step staircase
const CHIPS = ["Exam-pattern focused", "Expert-reviewed questions", "Step-by-step solutions"];

export const Meet: React.FC = () => {
  const f = useCurrentFrame();

  // Logo: centre focus, then glides to the top and stays as a header.
  const focus = enter(f, 0, 16);
  const rise = interpolate(f, [20, 36], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_IN_OUT});
  const logoW = lerp(rise, 820, 380);
  const logoTop = lerp(rise, 900, 170);
  const meet = enter(f, 2, 12) * exit(f, 20, 8);

  const card = enter(f, 26, 18) * exit(f, 68, 9);
  const stepsIn = f >= 78;
  const sceneOut = exit(f, 136, 12);

  return (
    <AbsoluteFill style={{opacity: sceneOut}}>
      <div
        style={{
          position: "absolute",
          top: 780,
          width: "100%",
          textAlign: "center",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 96,
          color: C.blue,
          opacity: meet,
          transform: `translateY(${(1 - meet) * 30}px)`,
        }}
      >
        Meet
      </div>
      <div
        style={{
          position: "absolute",
          top: logoTop,
          left: (1080 - logoW) / 2,
          opacity: focus,
          filter: `blur(${(1 - focus) * 10}px)`,
          transform: `scale(${0.9 + 0.1 * focus})`,
        }}
      >
        <Logo width={logoW} />
      </div>

      {card > 0.001 && (
        <div style={{position: "absolute", top: 360, left: 70, opacity: card, transform: `translateY(${(1 - card) * 140}px)`}}>
          <TestCard frame={f} tapAt={45} correctAt={52} />
        </div>
      )}
      {card > 0.001 && (
        <div style={{position: "absolute", top: 1370, width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, padding: "0 60px", boxSizing: "border-box"}}>
          {CHIPS.map((c, k) => {
            const p = enter(f, 33 + k * 6, 12) * exit(f, 68, 9);
            return (
              <div
                key={c}
                style={{
                  fontFamily: SANS,
                  fontWeight: 600,
                  fontSize: 38,
                  color: C.navy,
                  background: C.white,
                  border: `2px solid ${C.line}`,
                  borderRadius: 40,
                  padding: "16px 30px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: p,
                  transform: `translateY(${(1 - p) * 24}px)`,
                }}
              >
                <span style={{width: 18, height: 18, borderRadius: 9, background: k === 1 ? C.lime : C.blue, outline: k === 1 ? `3px solid ${C.navy}` : "none", outlineOffset: -3}} />
                {c}
              </div>
            );
          })}
        </div>
      )}

      {stepsIn && (
        <>
          <div style={{position: "absolute", top: 380, width: "100%", fontFamily: SERIF, fontSize: 120, color: C.navy, letterSpacing: -1, lineHeight: 1.05}}>
            <RevealLine frame={f} start={79} words={[{text: "Learn"}, {text: "step", italic: true, color: C.blue}, {text: "by", italic: true, color: C.blue}, {text: "step.", italic: true, color: C.blue}]} />
          </div>
          <div
            style={{
              position: "absolute",
              top: 540,
              width: "100%",
              textAlign: "center",
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: 50,
              color: C.navy,
              opacity: enter(f, 86, 14) * 0.8,
            }}
          >
            From basics to exam level.
          </div>
          <Staircase frame={f} stepAt={[82.5, 90, 97.5, 105]} />
        </>
      )}
    </AbsoluteFill>
  );
};
