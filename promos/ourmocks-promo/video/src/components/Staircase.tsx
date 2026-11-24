import React from "react";
import {interpolate} from "remotion";
import {C, SANS} from "../brand";
import {enter} from "./anim";

// Four ascending steps, from basics to exam level. A logo-style circle climbs them
// and turns into the lime tick on the top step.
const LABELS = ["Basics", "Level 2", "Level 3", "Exam level"];
const FILLS = ["#E4EAFB", "#B9CBFF", C.blue, C.navy];
const INK = [C.navy, C.navy, C.white, C.white];
const LEFT = 90;
const STEP_W = 225;
const BASE = 1580;
const HEIGHTS = [170, 330, 490, 650];

export const Staircase: React.FC<{frame: number; stepAt: number[]}> = ({frame, stepAt}) => {
  // Climber position: hops onto each step 3 frames after it rises.
  const hop = (k: number) => enter(frame, stepAt[k] + 3, 8);
  let x = LEFT + STEP_W / 2;
  let y = BASE - HEIGHTS[0];
  let lift = 0;
  stepAt.forEach((_, k) => {
    if (k === 0) return;
    const p = hop(k);
    if (p > 0) {
      x = interpolate(p, [0, 1], [LEFT + STEP_W * (k - 0.5), LEFT + STEP_W * (k + 0.5)]);
      y = interpolate(p, [0, 1], [BASE - HEIGHTS[k - 1], BASE - HEIGHTS[k]]);
      lift = Math.sin(p * Math.PI) * 70;
    }
  });
  const climber = enter(frame, stepAt[0] + 2, 10);
  const done = enter(frame, stepAt[3] + 15, 12);

  return (
    <>
      {LABELS.map((label, k) => {
        const p = enter(frame, stepAt[k], 14);
        const h = HEIGHTS[k] * p;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: LEFT + k * STEP_W,
              top: BASE - h,
              width: STEP_W - 10,
              height: h,
              borderRadius: "28px 28px 6px 6px",
              background: FILLS[k],
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "26px 0 0 24px",
                fontFamily: SANS,
                fontSize: 34,
                fontWeight: 700,
                color: INK[k],
                opacity: enter(frame, stepAt[k] + 6, 10),
              }}
            >
              <div style={{fontSize: 26, fontWeight: 600, opacity: 0.7}}>0{k + 1}</div>
              {label}
            </div>
          </div>
        );
      })}
      <svg width={1080} height={1920} style={{position: "absolute", inset: 0, overflow: "visible"}}>
        <g transform={`translate(${x - 5} ${y - 46 - lift}) scale(${0.4 + 0.6 * climber})`} opacity={climber}>
          <circle r={34} fill={done > 0 ? `rgba(184,255,52,${done})` : C.bg} stroke={C.navy} strokeWidth={10} />
          <path d="M-14 1l9 9 18-20" stroke={C.navy} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - done} />
        </g>
      </svg>
    </>
  );
};
