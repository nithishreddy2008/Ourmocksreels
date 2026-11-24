import React from "react";
import {useCurrentFrame} from "remotion";
import {C, H, W} from "../brand";

// Faint rising circles from the logo mark, drifting slowly behind every scene.
export const Rings: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  const f = useCurrentFrame();
  const drift = (k: number) => Math.sin((f / 90) * Math.PI + k) * 14;
  const rings = [
    {cx: 930, cy: 300, r: 260, w: 26, c: C.navy, o: 0.045},
    {cx: 1010, cy: 170, r: 120, w: 18, c: C.blue, o: 0.08},
    {cx: 110, cy: 1680, r: 300, w: 30, c: C.blue, o: 0.05},
    {cx: 250, cy: 1820, r: 110, w: 16, c: C.navy, o: 0.05},
  ];
  return (
    <svg width={W} height={H} style={{position: "absolute", inset: 0, opacity}}>
      {rings.map((r, k) => (
        <circle
          key={k}
          cx={r.cx + drift(k)}
          cy={r.cy - drift(k + 1)}
          r={r.r + Math.sin(f / 70 + k) * 6}
          fill="none"
          stroke={r.c}
          strokeWidth={r.w}
          opacity={r.o}
        />
      ))}
    </svg>
  );
};
