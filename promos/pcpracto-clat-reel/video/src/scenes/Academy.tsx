import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, DISPLAY, EASE_IN_OUT, SANS, SERIF} from "../brand";
import {Backdrop} from "../components/Backdrop";
import {Logo} from "../components/Logo";
import {enter, exit, lerp} from "../components/anim";

// 24–36.5s (local 0–375). The logo lands, a FROM THE NEWS ticker runs, and three
// news clippings drop in on the beat as the subtitles name each topic.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const CLIPS: {at: number; top: number; h: number; kicker: string; head: string; sub?: string; rot: number}[] = [
  {at: 135, top: 470, h: 310, kicker: "CRIMINAL LAW", head: "New criminal laws: BNSS\u00A0&\u00A0BSA", sub: "Bharatiya Nagarik Suraksha Sanhita · Bharatiya Sakshya Adhiniyam", rot: -2.5},
  {at: 195, top: 810, h: 200, kicker: "TECHNOLOGY & LAW", head: "Cyber law & deepfakes", rot: 2},
  {at: 255, top: 1040, h: 260, kicker: "LANDMARK JUDGMENTS", head: "Environment & international law", rot: -1.5},
];

export const Academy: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 364, 11);
  const land = enter(f, 4, 12);
  const up = interpolate(f, [60, 80], [0, 1], {...clamp, easing: EASE_IN_OUT});
  const logoW = lerp(up, 900, 560);
  const logoTop = lerp(up, 560, 150);
  const tagline = enter(f, 18, 12) * exit(f, 58, 8);
  const ticker = enter(f, 66, 12);
  const push = 1 + 0.035 * interpolate(f, [255, 375], [0, 1], clamp);

  return (
    <AbsoluteFill style={{opacity: out, transform: `translateY(${(1 - out) * -140}px)`}}>
      <Backdrop color={C.red} glow="#C21B22" />
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <div
          style={{
            position: "absolute",
            top: logoTop,
            left: (1080 - logoW) / 2,
            opacity: Math.min(1, land * 1.5),
            transform: `scale(${1.25 - 0.25 * land}) rotate(${(1 - land) * -4}deg)`,
          }}
        >
          <Logo width={logoW} shine={interpolate(f, [16, 44], [0, 1], clamp)} />
        </div>
        <div style={{position: "absolute", top: 860, width: "100%", textAlign: "center", fontFamily: DISPLAY, fontSize: 70, color: C.white, opacity: tagline, transform: `translateY(${(1 - tagline) * 30}px)`}}>
          ONLINE <span style={{color: C.yellow}}>ACADEMY</span>
        </div>

        {/* Ticker */}
        <div style={{position: "absolute", top: 330, left: 0, right: 0, height: 96, background: C.cream, transform: `rotate(-2deg) scaleX(${ticker})`, transformOrigin: "left center", overflow: "hidden", boxShadow: "0 12px 26px rgba(0,0,0,0.25)"}}>
          <div style={{display: "flex", whiteSpace: "nowrap", transform: `translateX(${-((f * 6) % 720)}px)`, alignItems: "center", height: "100%"}}>
            {Array.from({length: 6}).map((_, k) => (
              <span key={k} style={{fontFamily: SERIF, fontWeight: 700, fontSize: 50, color: C.ink, paddingRight: 60, width: 660}}>
                From the News <span style={{color: C.red}}>●</span>
              </span>
            ))}
          </div>
        </div>

        {CLIPS.map((c, k) => {
          const p = enter(f, c.at - 6, 10);
          if (p <= 0) return null;
          return (
            <div
              key={c.head}
              style={{
                position: "absolute",
                left: 80,
                right: 80,
                top: c.top,
                height: c.h,
                background: C.cream,
                borderRadius: 10,
                padding: "26px 40px",
                boxSizing: "border-box",
                boxShadow: "0 22px 40px rgba(0,0,0,0.32)",
                opacity: Math.min(1, p * 2),
                transform: `translateY(${(1 - p) * -260}px) rotate(${c.rot + (1 - p) * 10}deg) scale(${1.15 - 0.15 * p})`,
                // Torn-paper bottom edge.
                clipPath:
                  "polygon(0 0,100% 0,100% 92%,95% 96%,90% 92%,84% 97%,78% 93%,71% 98%,64% 93%,57% 97%,50% 92%,43% 97%,36% 93%,29% 98%,22% 93%,15% 97%,8% 92%,0 96%)",
              }}
            >
              <div style={{display: "flex", alignItems: "center", gap: 16, fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 4, color: C.red}}>
                <span style={{width: 40, height: 6, background: C.red}} />
                {c.kicker}
              </div>
              <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 54, lineHeight: 1.12, color: C.ink, marginTop: 10, letterSpacing: -0.5}}>{c.head}</div>
              {c.sub && <div style={{fontFamily: SERIF, fontStyle: "italic", fontSize: 25, color: C.grey, marginTop: 10}}>{c.sub}</div>}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
