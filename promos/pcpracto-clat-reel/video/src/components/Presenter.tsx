import React from "react";
import {Img, staticFile} from "remotion";
import {enter} from "./anim";

// The presenter, cut out of the academy banner (public/presenter.png, 790×921), anchored to the
// bottom edge. Rises in at `at`, then breathes slightly so the still reads as a live shot.
const RATIO = 921 / 790;

export const Presenter: React.FC<{f: number; at: number; width: number; glow?: string}> = ({f, at, width, glow = "rgba(255,230,0,0.28)"}) => {
  const rise = enter(f, at, 16);
  const breathe = 1 + 0.008 * Math.sin((f - at) / 11);
  const h = width * RATIO;
  return (
    <div style={{position: "absolute", left: (1080 - width) / 2, bottom: 0, width, height: h}}>
      {/* Soft halo behind the head. */}
      <div
        style={{
          position: "absolute",
          left: width * 0.5 - width * 0.42,
          top: h * 0.02,
          width: width * 0.84,
          height: width * 0.84,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glow} 0%, transparent 65%)`,
          opacity: rise,
          transform: `scale(${0.7 + 0.3 * rise})`,
        }}
      />
      <Img
        src={staticFile("presenter.png")}
        style={{
          position: "absolute",
          inset: 0,
          width,
          height: h,
          opacity: Math.min(1, rise * 1.5),
          transform: `translateY(${(1 - rise) * 260}px) scale(${breathe})`,
          transformOrigin: "50% 100%",
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.35)) drop-shadow(0 24px 40px rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
};
