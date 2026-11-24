import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {enter, exit} from "../components/anim";

// 0–4 s (120 f). The search that finds nothing, then "We made 15." with 15 test tiles.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const QUERY = "CUET Mass Media mock test";

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 112, 8);
  const typed = Math.floor(interpolate(f, [4, 40], [0, QUERY.length], clamp));
  const spin = f > 40 && f < 57;
  const drop = enter(f, 57, 10); // search block steps back
  const made = enter(f, 57, 9);
  return (
    <AbsoluteFill style={{background: C.navy, opacity: out}}>
      <div style={{position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 35%, rgba(31,95,255,0.35), transparent 60%)`}} />
      <div style={{position: "absolute", top: 260, left: 80, width: 900, fontFamily: SERIF, fontSize: 104, lineHeight: 1.02, color: C.white, transform: `translateY(${-140 * drop}px) scale(${1 - 0.25 * drop})`, transformOrigin: "left top", opacity: 1 - 0.5 * drop}}>
        Can't find a CUET mock test for <span style={{fontStyle: "italic", color: C.lime}}>Mass Media?</span>
      </div>
      {/* Generic search bar (no brand), typing from frame 4 */}
      <div style={{position: "absolute", top: 640, left: 80, width: 920, height: 120, borderRadius: 60, background: C.white, display: "flex", alignItems: "center", gap: 24, padding: "0 40px", boxSizing: "border-box", boxShadow: "0 20px 50px rgba(0,0,0,0.35)", opacity: 1 - drop, transform: `translateY(${drop * -60}px)`}}>
        <svg width="46" height="46" viewBox="0 0 46 46"><circle cx="19" cy="19" r="13" stroke={C.muted} strokeWidth="5" fill="none" /><path d="M29 29l11 11" stroke={C.muted} strokeWidth="5" strokeLinecap="round" /></svg>
        <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 46, color: C.navy, whiteSpace: "nowrap"}}>
          {QUERY.slice(0, typed)}
          <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1, color: C.blue}}>|</span>
        </div>
        {spin && (
          <div style={{marginLeft: "auto", width: 40, height: 40, borderRadius: 20, border: `5px solid ${C.line}`, borderTopColor: C.blue, transform: `rotate(${f * 24}deg)`}} />
        )}
      </div>

      {/* We made 15. */}
      <div style={{position: "absolute", top: 560, left: 80, fontFamily: SERIF, fontSize: 190, lineHeight: 1, color: C.white, opacity: Math.min(1, made * 2), transform: `scale(${1.4 - 0.4 * made})`, transformOrigin: "left center"}}>
        We made <span style={{fontStyle: "italic", color: C.lime}}>15.</span>
      </div>
      <div style={{position: "absolute", top: 820, left: 80, width: 920, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16}}>
        {Array.from({length: 15}, (_, k) => {
          const p = enter(f, 60 + k * 2, 9);
          return (
            <div key={k} style={{height: 150, borderRadius: 20, background: "rgba(255,255,255,0.08)", border: `3px solid ${k % 5 === 4 ? C.lime : "rgba(255,255,255,0.3)"}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p})`}}>
              <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: 2, color: "rgba(255,255,255,0.7)"}}>TEST</div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 54, color: C.white}}>{String(k + 1).padStart(2, "0")}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", top: 1340, left: 80, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.white, opacity: enter(f, 92, 12)}}>
        Full length · 50 questions · NTA pattern
      </div>
    </AbsoluteFill>
  );
};
