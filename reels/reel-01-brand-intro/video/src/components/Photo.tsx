import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";
import {lerp} from "./anim";

// A real campus photo, full bleed, with a slow push-in (Ken Burns) and a navy grade for text.
export const Photo: React.FC<{src: string; p: number; focus?: string; from?: number; to?: number; dx?: number; shade?: number}> = ({
  src,
  p,
  focus = "50% 50%",
  from = 1.14,
  to = 1.02,
  dx = 30,
  shade = 1,
}) => (
  <AbsoluteFill style={{overflow: "hidden", background: "#061A4D"}}>
    <Img
      src={staticFile(`campus/${src}`)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: focus,
        transform: `scale(${lerp(p, from, to)}) translateX(${lerp(p, -dx, dx)}px)`,
      }}
    />
    <AbsoluteFill
      style={{
        opacity: shade,
        background:
          "linear-gradient(180deg, rgba(6,26,77,0.55) 0%, rgba(6,26,77,0.05) 22%, rgba(6,26,77,0.15) 42%, rgba(6,26,77,0.88) 66%, rgba(6,26,77,0.97) 100%)",
      }}
    />
  </AbsoluteFill>
);
