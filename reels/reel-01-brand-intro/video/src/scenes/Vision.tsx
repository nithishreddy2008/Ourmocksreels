import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {Grid} from "../components/Grid";
import {enter, exit} from "../components/anim";

// 22–26.5 s (135 f). The method, then the promise, over the four campuses.
export const Vision: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 127, 8);
  const words = ["Discover.", "Understand.", "Decide."];
  const promise = enter(f, 62, 16);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <Grid f={f + 200} reveal={() => enter(f, 0, 16)} dim={0.82} zoom={1.04 - f * 0.0003} />
      <div style={{position: "absolute", top: 250, left: 80, fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 5, color: C.lime, opacity: enter(f, 2, 12)}}>OUR MISSION</div>
      <div style={{position: "absolute", top: 320, left: 80, fontFamily: SERIF, fontSize: 120, lineHeight: 1.02, color: C.white}}>
        {words.map((w, k) => {
          const p = enter(f, 10 + k * 15, 12);
          return (
            <div key={w} style={{opacity: p * (1 - 0.55 * promise), transform: `translateX(${(1 - p) * 80}px)`, fontStyle: k === 2 ? "italic" : "normal", color: k === 2 ? C.lime : C.white}}>
              {w}
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", top: 820, left: 80, width: 880, opacity: promise, transform: `translateY(${(1 - promise) * 50}px)`}}>
        <div style={{width: 120, height: 8, background: C.lime, borderRadius: 4, marginBottom: 36}} />
        <div style={{fontFamily: SERIF, fontSize: 104, lineHeight: 1.02, color: C.white}}>
          Your dream deserves <span style={{fontStyle: "italic", color: C.lime}}>more than one path.</span>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 36, lineHeight: 1.35, color: "rgba(255,255,255,0.85)", marginTop: 34, opacity: enter(f, 80, 14)}}>
          Know your options after Class 12. Prepare for them with purpose.
        </div>
      </div>
    </AbsoluteFill>
  );
};
