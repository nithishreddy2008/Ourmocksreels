import React from "react";
import {Img, staticFile} from "remotion";

// The supplied PC Practo logo (public/logo.jpg, cropped to its ellipse).
// An elliptical clip drops the photo's grey background so it sits on any colour.
// Aspect ratio is fixed to the source (1460×398), so it is never stretched.
const RATIO = 398 / 1460;

export const Logo: React.FC<{width: number; shine?: number; shadow?: boolean}> = ({width, shine, shadow = true}) => (
  <div style={{width, height: width * RATIO, filter: shadow ? "drop-shadow(0 18px 30px rgba(0,0,0,0.35))" : undefined}}>
    <div style={{position: "relative", width: "100%", height: "100%", clipPath: "ellipse(49.2% 47.6% at 50% 50%)", overflow: "hidden"}}>
      <Img src={staticFile("logo.jpg")} style={{width: "100%", height: "100%", display: "block"}} />
      {shine !== undefined && shine > 0 && shine < 1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "22%",
            left: `${-30 + shine * 130}%`,
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.65), transparent)",
            transform: "skewX(-18deg)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  </div>
);
