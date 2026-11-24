import React from "react";
import {AbsoluteFill, Audio, Freeze, Sequence, staticFile, useCurrentFrame} from "remotion";
import {C} from "./brand";
import {Captions} from "./components/Captions";
import {Hook} from "./scenes/Hook";
import {Truth} from "./scenes/Truth";
import {Method} from "./scenes/Method";
import {Academy} from "./scenes/Academy";
import {Cta} from "./scenes/Cta";
import {POSTER_FRAME, SCENES, sec} from "./timing";

const scene = (s: {from: number; to: number}) => ({from: sec(s.from), durationInFrames: sec(s.to) - sec(s.from)});

const Scenes: React.FC<{captions: boolean}> = ({captions}) => (
  <AbsoluteFill style={{background: C.redDeep}}>
    <Sequence {...scene(SCENES.hook)}>
      <Hook />
    </Sequence>
    <Sequence {...scene(SCENES.truth)}>
      <Truth />
    </Sequence>
    <Sequence {...scene(SCENES.method)}>
      <Method />
    </Sequence>
    <Sequence {...scene(SCENES.academy)}>
      <Academy />
    </Sequence>
    <Sequence {...scene(SCENES.cta)}>
      <Cta />
    </Sequence>
    {captions && <Captions />}
  </AbsoluteFill>
);

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {/* Frame 0 shows the settled CTA (without a subtitle) as the platform thumbnail. */}
      {frame === 0 ? (
        <Freeze frame={POSTER_FRAME}>
          <Scenes captions={false} />
        </Freeze>
      ) : (
        <Scenes captions />
      )}
      <Audio src={staticFile("soundtrack.wav")} />
    </AbsoluteFill>
  );
};
