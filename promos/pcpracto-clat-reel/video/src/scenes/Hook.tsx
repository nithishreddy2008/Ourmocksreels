import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, DISPLAY, SANS} from "../brand";
import {Backdrop} from "../components/Backdrop";
import {Logo} from "../components/Logo";
import {Presenter} from "../components/Presenter";
import {enter, exit} from "../components/anim";

// 0–5.5s (local 0–165). MEMORISED slams in and is struck out; HOW YOU THINK punches in.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 154, 11);
  const slam = enter(f, 4, 9);
  const strike = interpolate(f, [39, 45], [0, 1], clamp);
  const struck = enter(f, 45, 10);
  const shake = f >= 45 && f < 53 ? Math.sin(f * 2.7) * (53 - f) * 2.2 : 0;
  const think = enter(f, 72, 8);
  const howYou = enter(f, 66, 10);
  const train = enter(f, 111, 12);
  const arrow = Math.sin((f - 111) / 4) * 10;
  const top = 1 - enter(f, 104, 8); // MEMORISED block makes way for "HERE'S HOW TO TRAIN"

  return (
    <AbsoluteFill style={{opacity: out, transform: `translateY(${(1 - out) * -160}px)`, filter: `blur(${(1 - out) * 8}px)`}}>
      <Backdrop color={C.red} glow="#C21B22" />
      <Presenter f={f} at={4} width={880} />
      {/* Darken the top so the overlay text reads over the backdrop and hair. */}
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(94,10,14,0.55) 0%, rgba(94,10,14,0) 48%)"}} />
      <div style={{position: "absolute", top: 70, left: (1080 - 280) / 2, opacity: enter(f, 0, 12)}}>
        <Logo width={280} />
      </div>

      <div style={{position: "absolute", top: 220, width: "100%", textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 42, letterSpacing: 6, color: C.yellow, opacity: enter(f, 2, 10) * top}}>
        CLAT DOESN'T TEST WHAT YOU'VE
      </div>
      <div
        style={{
          position: "absolute",
          top: 280,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          transform: `translateX(${shake}px) translateY(${struck * 14}px) scale(${1.7 - 0.7 * slam})`,
          opacity: Math.min(1, slam * 2) * (1 - 0.45 * struck) * top,
          filter: `blur(${(1 - slam) * 12}px)`,
        }}
      >
        <div style={{position: "relative", fontFamily: DISPLAY, fontSize: 140, color: C.white, letterSpacing: -3, lineHeight: 1, textShadow: "0 10px 0 rgba(0,0,0,0.2)"}}>
          MEMORISED
          <div
            style={{
              position: "absolute",
              left: -20,
              top: "48%",
              height: 26,
              width: `calc(${strike * 100}% + ${strike * 40}px)`,
              background: C.yellow,
              borderRadius: 13,
              transform: "rotate(-4deg)",
              transformOrigin: "left center",
              boxShadow: "0 6px 0 rgba(0,0,0,0.25)",
            }}
          />
        </div>
      </div>

      <div style={{position: "absolute", top: 470, width: "100%", textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 42, letterSpacing: 6, color: C.white, opacity: howYou * 0.85}}>
        IT TESTS
      </div>
      <div style={{position: "absolute", top: 520, width: "100%", textAlign: "center", fontFamily: DISPLAY, lineHeight: 0.95, letterSpacing: -3, textShadow: "0 10px 0 rgba(0,0,0,0.22)"}}>
        <div style={{fontSize: 128, color: C.white, opacity: howYou, transform: `translateY(${(1 - howYou) * 50}px)`}}>HOW YOU</div>
        <div
          style={{
            fontSize: 196,
            color: C.yellow,
            opacity: Math.min(1, think * 2),
            transform: `scale(${1.5 - 0.5 * think}) rotate(${(1 - think) * -6}deg)`,
            textShadow: "0 12px 0 rgba(0,0,0,0.22)",
          }}
        >
          THINK.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 300,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 22,
          opacity: train,
          transform: `translateY(${(1 - train) * 40}px)`,
          fontFamily: DISPLAY,
          fontSize: 62,
          color: C.white,
          textShadow: "0 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        HERE'S HOW TO TRAIN
        <svg width="70" height="50" viewBox="0 0 70 50" style={{transform: `translateX(${f > 111 ? arrow : 0}px)`}}>
          <path d="M4 25h56M40 6l20 19-20 19" stroke={C.yellow} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
