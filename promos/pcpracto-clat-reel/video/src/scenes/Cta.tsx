import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, DISPLAY} from "../brand";
import {Backdrop} from "../components/Backdrop";
import {Logo} from "../components/Logo";
import {Presenter} from "../components/Presenter";
import {enter, exit} from "../components/anim";

// 36.5–45s (local 0–255). Big logo with a shine, the tagline, a pulsing LINK IN BIO.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const land = enter(f, 0, 14);
  const think = enter(f, 18, 12);
  const lawyer = enter(f, 26, 12);
  const start = enter(f, 40, 12);
  const underline = interpolate(f, [48, 62], [0, 1], clamp);
  const link = enter(f, 56, 12);
  const pulse = 1 + 0.035 * Math.max(0, Math.cos(((f - 56) / 15) * Math.PI * 2)) * (f > 70 ? 1 : 0);
  const fade = exit(f, 240, 15);
  const rays = f * 0.25;

  return (
    <AbsoluteFill style={{opacity: fade}}>
      <Backdrop color={C.redDeep} glow="#B5171E" />
      {/* Slow sunburst behind the logo. */}
      <div
        style={{
          position: "absolute",
          left: 540 - 900,
          top: 1150 - 900,
          width: 1800,
          height: 1800,
          borderRadius: "50%",
          background: `repeating-conic-gradient(from ${rays}deg, rgba(255,230,0,0.07) 0deg 8deg, transparent 8deg 22deg)`,
          maskImage: "radial-gradient(circle, black 15%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle, black 15%, transparent 60%)",
          opacity: land,
        }}
      />
      <Presenter f={f} at={6} width={860} />
      <div style={{position: "absolute", top: 110, left: (1080 - 720) / 2, opacity: Math.min(1, land * 1.6), transform: `scale(${1.35 - 0.35 * land})`}}>
        <Logo width={720} shine={interpolate(f, [14, 44], [0, 1], clamp)} />
      </div>

      <div style={{position: "absolute", top: 340, width: "100%", textAlign: "center", fontFamily: DISPLAY, fontSize: 104, lineHeight: 1.02, letterSpacing: -2, textShadow: "0 8px 0 rgba(0,0,0,0.2)"}}>
        <div style={{color: C.white, opacity: think, transform: `translateY(${(1 - think) * 50}px)`}}>THINK LIKE</div>
        <div style={{color: C.yellow, opacity: Math.min(1, lawyer * 2), transform: `scale(${1.3 - 0.3 * lawyer})`}}>A LAWYER.</div>
      </div>
      <div style={{position: "absolute", top: 580, width: "100%", display: "flex", justifyContent: "center"}}>
        <div style={{position: "relative", fontFamily: DISPLAY, fontSize: 74, color: C.white, opacity: start, transform: `translateY(${(1 - start) * 30}px)`}}>
          START TODAY.
          <div style={{position: "absolute", left: 0, bottom: -10, height: 14, width: `${underline * 100}%`, background: C.yellow, borderRadius: 7}} />
        </div>
      </div>

      <div style={{position: "absolute", top: 715, width: "100%", display: "flex", justifyContent: "center", zIndex: 2, opacity: link, transform: `translateY(${(1 - link) * 40}px) scale(${pulse})`}}>
        <div style={{display: "flex", alignItems: "center", gap: 20, background: C.yellow, color: C.red, fontFamily: DISPLAY, fontSize: 50, padding: "18px 42px", borderRadius: 70, boxShadow: "0 18px 40px rgba(0,0,0,0.35)"}}>
          LINK IN BIO
          <svg width="46" height="46" viewBox="0 0 46 46" style={{transform: `translateY(${Math.sin(f / 5) * -5}px)`}}>
            <path d="M23 40V8M9 21L23 7l14 14" stroke={C.red} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
