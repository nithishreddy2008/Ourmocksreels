import React from "react";
import {Composition} from "remotion";
import {Video} from "./Video";
import {H, W} from "./brand";
import {DURATION_FRAMES, FPS} from "./timing";

export const Root: React.FC = () => (
  <Composition id="OurMocks" component={Video} durationInFrames={DURATION_FRAMES} fps={FPS} width={W} height={H} />
);
