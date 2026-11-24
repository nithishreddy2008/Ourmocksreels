import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";

// Flat brand colour with a soft radial glow and a light film grain that changes every 2 frames.
export const Backdrop: React.FC<{color: string; glow: string; grain?: number}> = ({color, glow, grain = 0.07}) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 50;
  return (
    <AbsoluteFill style={{background: `radial-gradient(120% 70% at 50% 38%, ${glow} 0%, ${color} 70%)`}}>
      <svg width="100%" height="100%" style={{position: "absolute", inset: 0, opacity: grain, mixBlendMode: "overlay"}}>
        <filter id={`grain${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
