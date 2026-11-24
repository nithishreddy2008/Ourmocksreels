import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {C, SANS} from "../brand";
import {CAPTIONS, FPS} from "../timing";

// Subtitles in a fixed band above the Reels/Shorts UI. Words light up in reading order
// (timed by length, finishing at 75% of the phrase so the full line holds before it changes).
export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const cap = CAPTIONS.find((c) => t >= c.from && t < c.to);
  if (!cap) return null;
  const local = (t - cap.from) * FPS;
  const len = (cap.to - cap.from) * FPS;
  const boxIn = interpolate(local, [0, 5], [0, 1], {extrapolateRight: "clamp"});
  const boxOut = interpolate(local, [len - 3, len], [1, 0], {extrapolateLeft: "clamp"});
  const words = cap.text.split(" ");
  const weights = words.map((w) => w.length + 2);
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  const readEnd = len * 0.75;
  return (
    <div style={{position: "absolute", top: 1430, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: boxIn * boxOut}}>
      <div
        style={{
          maxWidth: 940,
          background: "rgba(20,6,7,0.86)",
          borderRadius: 28,
          padding: "20px 34px 24px",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 54,
          lineHeight: 1.22,
          letterSpacing: -0.6,
          color: C.white,
          textAlign: "center",
          transform: `translateY(${(1 - boxIn) * 18}px) scale(${0.97 + 0.03 * boxIn})`,
          boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
        }}
      >
        {words.map((w, k) => {
          const at = (acc / total) * readEnd;
          acc += weights[k];
          const on = interpolate(local, [at, at + 3], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
          const em = cap.em?.includes(w);
          return (
            <span key={k} style={{opacity: 0.38 + 0.62 * on, color: em ? C.yellow : C.white}}>
              {w}
              {k < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};
