import React from "react";
import {AbsoluteFill, Audio, Freeze, Sequence, staticFile, useCurrentFrame} from "remotion";
import {C} from "./brand";
import {Rings} from "./components/Rings";
import {Hook} from "./scenes/Hook";
import {Paths} from "./scenes/Paths";
import {Meet} from "./scenes/Meet";
import {Cta} from "./scenes/Cta";
import {POSTER_FRAME, SCENES, sec} from "./timing";

const scene = (s: {from: number; to: number}) => ({from: sec(s.from), durationInFrames: sec(s.to) - sec(s.from)});

const Scenes: React.FC = () => (
  <AbsoluteFill style={{background: C.bg}}>
    <Rings />
    <Sequence {...scene(SCENES.hook)}>
      <Hook />
    </Sequence>
    <Sequence {...scene(SCENES.paths)}>
      <Paths />
    </Sequence>
    <Sequence {...scene(SCENES.meet)}>
      <Meet />
    </Sequence>
    <Sequence {...scene(SCENES.cta)}>
      <Cta />
    </Sequence>
  </AbsoluteFill>
);

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {/* Frame 0 shows the settled CTA as the platform thumbnail; duration and audio sync are unchanged. */}
      {frame === 0 ? (
        <Freeze frame={POSTER_FRAME}>
          <Scenes />
        </Freeze>
      ) : (
        <Scenes />
      )}
      {/* Music, SFX and voiceover are pre-mixed on one beat grid by audio/build-audio.mjs. */}
      <Audio src={staticFile("soundtrack.wav")} />
    </AbsoluteFill>
  );
};
