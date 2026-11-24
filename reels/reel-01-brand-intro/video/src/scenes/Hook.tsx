import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {Grid} from "../components/Grid";
import {enter, exit} from "../components/anim";

// 0–3.5 s (105 f). Frame 0 already carries text. JEE and NEET get pushed aside; a lime 4 slams in.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 97, 8);
  const aside = enter(f, 40, 12); // JEE/NEET shrink to the top
  const four = enter(f, 45, 10);
  const line = enter(f, 52, 14);
  const strike = interpolate(f, [30, 38], [0, 1], clamp);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <Grid f={f} reveal={(k) => enter(f, 44 + k * 4, 12)} dim={0.78} />
      {/* JEE · NEET: big at first, then struck and pushed up */}
      <div
        style={{
          position: "absolute",
          top: interpolate(aside, [0, 1], [560, 270]),
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          transform: `scale(${1 - 0.55 * aside})`,
          opacity: 1 - 0.35 * aside,
        }}
      >
        {["JEE", "NEET"].map((t) => (
          <div key={t} style={{position: "relative", fontFamily: SANS, fontWeight: 800, fontSize: 150, color: C.white, background: "rgba(255,255,255,0.08)", border: "4px solid rgba(255,255,255,0.4)", borderRadius: 40, padding: "10px 46px"}}>
            {t}
            <div style={{position: "absolute", left: "8%", top: "50%", height: 14, width: `${84 * strike}%`, background: C.lime, borderRadius: 7, transform: "rotate(-6deg)"}} />
          </div>
        ))}
      </div>
      <div style={{position: "absolute", top: 820 - 260 * aside + 260, width: "100%", textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 64, color: C.white, opacity: 1 - aside}}>
        …is that all they told you?
      </div>

      {/* The 4 */}
      <div style={{position: "absolute", top: 470, left: 80, width: 920}}>
        <div style={{display: "flex", alignItems: "flex-end", gap: 24}}>
          <div style={{fontFamily: SERIF, fontSize: 420, lineHeight: 0.8, color: C.lime, opacity: Math.min(1, four * 2), transform: `scale(${1.6 - 0.6 * four})`, transformOrigin: "left bottom"}}>4</div>
          <div style={{fontFamily: SERIF, fontSize: 118, lineHeight: 0.95, color: C.white, opacity: line, transform: `translateX(${(1 - line) * 60}px)`, paddingBottom: 18}}>
            exams
            <br />
            after Class 12
          </div>
        </div>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontSize: 112, lineHeight: 1, color: C.white, marginTop: 30, opacity: enter(f, 60, 14), transform: `translateY(${(1 - enter(f, 60, 14)) * 40}px)`}}>
          nobody tells you <span style={{color: C.lime}}>about.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
