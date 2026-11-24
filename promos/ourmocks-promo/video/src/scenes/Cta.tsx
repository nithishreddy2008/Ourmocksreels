import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, SANS, SERIF} from "../brand";
import {Logo} from "../components/Logo";
import {RevealLine} from "../components/RevealText";
import {enter, exit} from "../components/anim";

// 13–17.5s (local 0–135). Logo as the hero header, three verbs on the beat, tagline, URL.
export const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const ring = enter(f, 0, 24);
  const pill = enter(f, 38, 14);
  const tick = enter(f, 45, 12);
  const fadeOut = exit(f, 120, 15);

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <svg width={1080} height={1920} style={{position: "absolute", inset: 0}}>
        <circle cx={540} cy={630} r={300} fill="none" stroke={C.blue} strokeWidth={16} opacity={0.14 * ring} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform="rotate(-90 540 630)" />
        <circle cx={860} cy={380} r={36 * ring} fill="none" stroke={C.navy} strokeWidth={12} />
        <circle cx={210} cy={860} r={24 * ring} fill="none" stroke={C.blue} strokeWidth={10} />
      </svg>

      <div style={{position: "absolute", top: 540, left: (1080 - 860) / 2}}>
        <Logo width={860} frame={f} start={0} />
      </div>

      <div style={{position: "absolute", top: 960, width: "100%", fontFamily: SERIF, fontSize: 100, color: C.navy, letterSpacing: -1}}>
        <RevealLine frame={f} start={15} stagger={7.5} words={[{text: "Explore."}, {text: "Practice."}, {text: "Improve.", italic: true, color: C.blue}]} />
      </div>

      <div style={{position: "absolute", top: 1110, width: "100%", fontFamily: SERIF, fontSize: 70, lineHeight: 1.1, color: C.navy}}>
        <RevealLine frame={f} start={30} stagger={2} words={["Your", "dream", "deserves"].map((text) => ({text}))} />
        <RevealLine frame={f} start={36} stagger={2} words={["more", "than", "one", "path."].map((text) => ({text, italic: true, color: C.blue}))} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 1350,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - pill) * 30}px)`,
          opacity: pill,
          background: C.navy,
          borderRadius: 70,
          height: 128,
          padding: "0 54px 0 22px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          boxShadow: "0 24px 50px rgba(6,26,77,0.22)",
        }}
      >
        <svg width="86" height="86" viewBox="0 0 86 86">
          <circle cx="43" cy="43" r={40 * (0.6 + 0.4 * tick)} fill={C.lime} />
          <path d="M25 44l12 12 24-26" stroke={C.navy} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tick} />
        </svg>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 66, color: C.white, letterSpacing: -1.5}}>ourmocks.com</div>
      </div>
    </AbsoluteFill>
  );
};
