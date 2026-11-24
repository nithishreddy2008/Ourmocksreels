import React from "react";
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {enter, exit} from "../components/anim";
import {PHOTOS} from "../components/Grid";

// 21.5–25.5 s (120 f). The same review standard for all four exams, each on its real campus photo.
const EXAMS = ["CUET UG", "IISER IAT", "NISER NEST", "COMEDK UGET"];
const PLACES = ["BHU", "IISER Pune", "NISER", "RVCE Bengaluru"];

export const Four: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 112, 8);
  return (
    <AbsoluteFill style={{background: C.navy, opacity: out}}>
      <div style={{position: "absolute", top: 240, left: 80, width: 940, fontFamily: SERIF, fontSize: 80, lineHeight: 1, color: C.white, opacity: enter(f, 0, 12)}}>
        Same standard. <span style={{fontStyle: "italic", color: C.lime}}>All four exams.</span>
      </div>
      <div style={{position: "absolute", top: 480, left: 80, width: 920, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}}>
        {EXAMS.map((e, k) => {
          const p = enter(f, 8 + k * 6, 12);
          const tick = enter(f, 21 + k * 9, 8);
          return (
            <div key={e} style={{position: "relative", height: 440, borderRadius: 26, overflow: "hidden", opacity: p, transform: `scale(${0.85 + 0.15 * p})`}}>
              <Img src={staticFile(`campus/${PHOTOS[k].src}`)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: PHOTOS[k].focus, transform: `scale(${1.12 - f * 0.0008})`}} />
              <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,26,77,0.1) 30%, rgba(6,26,77,0.92) 100%)"}} />
              <div style={{position: "absolute", left: 24, bottom: 24, right: 24}}>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 42, color: C.white}}>{e}</div>
                <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 22, color: "rgba(255,255,255,0.75)", marginTop: 4}}>📍 {PLACES[k]}</div>
              </div>
              <div style={{position: "absolute", top: 20, right: 20, width: 70, height: 70, borderRadius: 35, background: C.lime, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${tick})`}}>
                <svg width="40" height="40" viewBox="0 0 40 40"><path d="M9 21l7 7 15-16" stroke={C.navy} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", top: 1400, left: 80, fontFamily: SANS, fontWeight: 500, fontSize: 20, color: "rgba(255,255,255,0.55)", opacity: enter(f, 30, 12)}}>
        Photos: Wikimedia Commons · Sundrampixel (CC0), DesiBoy101 (CC BY 4.0), Amiwins (CC BY-SA 4.0), Rvian00 (CC BY-SA 3.0)
      </div>
    </AbsoluteFill>
  );
};
