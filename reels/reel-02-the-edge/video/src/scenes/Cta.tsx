import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {Logo} from "../components/Logo";
import {enter} from "../components/anim";

// 26.5–31 s (135 f). Logo builds, four exams with equal weight, domain, follow.
const EXAMS = ["CUET UG", "IISER IAT", "NISER NEST", "COMEDK UGET"];

export const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const follow = enter(f, 60, 14);
  const pulse = 1 + 0.03 * Math.max(0, Math.sin(((f - 74) / 15) * Math.PI)) * (f > 74 ? 1 : 0);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <div style={{position: "absolute", left: -300, top: 200, width: 1680, height: 1680, borderRadius: "50%", background: `radial-gradient(circle, ${C.blueSoft} 0%, transparent 60%)`}} />
      <div style={{position: "absolute", top: 330, left: (1080 - 640) / 2}}>
        <Logo width={640} frame={f} start={2} />
      </div>
      <div style={{position: "absolute", top: 560, width: "100%", textAlign: "center", fontFamily: SERIF, fontSize: 92, lineHeight: 1, color: C.navy, opacity: enter(f, 18, 14), transform: `translateY(${(1 - enter(f, 18, 14)) * 30}px)`}}>
        Reviewed <span style={{fontStyle: "italic", color: C.blue}}>before</span> you see it.
      </div>
      <div style={{position: "absolute", top: 740, left: 90, width: 900, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}}>
        {EXAMS.map((e, k) => {
          const p = enter(f, 28 + k * 5, 12);
          return (
            <div key={e} style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.navy, background: C.white, border: `3px solid ${C.line}`, borderRadius: 24, padding: "26px 0", textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 30}px)`, boxShadow: "0 10px 30px rgba(6,26,77,0.08)"}}>
              {e}
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", top: 1030, width: "100%", textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 36, color: C.navy, opacity: enter(f, 48, 12)}}>
        CUET UG in 16 subjects · Free Test 1 on ourmocks.com
      </div>
      <div style={{position: "absolute", top: 1150, width: "100%", display: "flex", justifyContent: "center", opacity: follow, transform: `translateY(${(1 - follow) * 30}px) scale(${pulse})`}}>
        <div style={{background: C.navy, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 48, padding: "24px 50px", borderRadius: 70, display: "flex", gap: 18, alignItems: "center"}}>
          <span style={{color: C.lime}}>ourmocks.com</span>
          <span style={{opacity: 0.5}}>·</span>
          Follow
        </div>
      </div>
    </AbsoluteFill>
  );
};
