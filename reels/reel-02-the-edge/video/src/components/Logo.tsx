import React from "react";
import {Img, staticFile} from "remotion";
import {enter} from "./anim";

// The OurMocks logo, element for element from public/logo.svg (notes brand kit).
// `start` animates the build: circles pop small → large, tick draws, wordmark wipes in.
// With start = undefined it renders the original SVG file untouched.
// The SVG canvas has empty space right of the wordmark (ink spans ~0–72% of its width),
// so a centred box looks left-heavy. Shift by that amount to centre the ink optically.
const OPTICAL_SHIFT = 0.139;

export const Logo: React.FC<{width: number; frame?: number; start?: number}> = (props) => (
  <div style={{transform: `translateX(${OPTICAL_SHIFT * props.width}px)`}}>
    <LogoArt {...props} />
  </div>
);

const LogoArt: React.FC<{width: number; frame?: number; start?: number; markOnly?: boolean}> = ({
  width,
  frame = 0,
  start,
  markOnly = false,
}) => {
  if (start === undefined && !markOnly) {
    return <Img src={staticFile("logo.svg")} style={{width, height: (width * 64) / 310, display: "block"}} />;
  }
  const s = start ?? -100;
  const pop = (d: number) => enter(frame, s + d, 12);
  const tick = enter(frame, s + 14, 9);
  const word = enter(frame, s + 16, 16);
  const vbW = markOnly ? 72 : 310;
  const circle = (cx: number, cy: number, p: number, el: React.ReactNode) => (
    <g style={{transformOrigin: `${cx}px ${cy}px`, transform: `scale(${0.3 + 0.7 * p})`, opacity: p}}>{el}</g>
  );
  return (
    <svg width={width} height={(width * 64) / vbW} viewBox={`0 0 ${vbW} 64`} fill="none" style={{display: "block", overflow: "visible"}}>
      {circle(11, 44, pop(0), <circle cx="11" cy="44" r="6" stroke="#071A4D" strokeWidth="5" />)}
      {circle(29, 35, pop(4), <circle cx="29" cy="35" r="9" stroke="#1F5EFF" strokeWidth="6" />)}
      {circle(50, 25, pop(8), <circle cx="50" cy="25" r="13" stroke="#071A4D" strokeWidth="7" />)}
      <path
        d="M45 24L51 30L65 8"
        stroke="#B8FF34"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - tick}
        opacity={tick > 0 ? 1 : 0}
      />
      {!markOnly && (
        <g style={{clipPath: `inset(0 ${(1 - word) * 100}% 0 0)`}}>
          <text
            x={82 - 14 * (1 - word)}
            y="43"
            fill="#071A4D"
            fontFamily="Arial, sans-serif"
            fontSize="31"
            fontWeight="800"
            letterSpacing="-1.5"
            opacity={word}
          >
            Our<tspan fill="#1F5EFF">Mocks</tspan>
          </text>
        </g>
      )}
    </svg>
  );
};
