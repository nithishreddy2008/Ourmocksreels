import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, SERIF} from "../brand";
import {Logo} from "../components/Logo";
import {RevealLine} from "../components/RevealText";
import {exit} from "../components/anim";

// 0–4s. Logo builds, then "Your dream deserves / more than one path."
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const out = exit(f, 102, 14);
  return (
    <AbsoluteFill style={{alignItems: "center", opacity: out, transform: `translateY(${(1 - out) * -90}px)`}}>
      <div style={{position: "absolute", top: 650}}>
        <Logo width={540} frame={f} start={0} />
      </div>
      <div style={{position: "absolute", top: 910, width: 960, fontFamily: SERIF, fontSize: 116, lineHeight: 1.08, color: C.navy, letterSpacing: -1}}>
        <RevealLine frame={f} start={26} words={[{text: "Your"}, {text: "dream"}, {text: "deserves"}]} />
        <RevealLine
          frame={f}
          start={44}
          stagger={4}
          words={["more", "than", "one", "path."].map((text) => ({text, italic: true, color: C.blue}))}
        />
      </div>
      <Underline frame={f} />
    </AbsoluteFill>
  );
};

// A lime stroke draws under "one path." once the line has landed.
const Underline: React.FC<{frame: number}> = ({frame}) => {
  const p = Math.min(1, Math.max(0, (frame - 66) / 14));
  const e = 1 - Math.pow(1 - p, 3);
  return (
    <svg width={420} height={40} viewBox="0 0 420 40" style={{position: "absolute", top: 1158, left: 545}}>
      <path
        d="M6 26 C 120 10, 280 8, 414 20"
        stroke={C.lime}
        strokeWidth={14}
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - e}
      />
    </svg>
  );
};
