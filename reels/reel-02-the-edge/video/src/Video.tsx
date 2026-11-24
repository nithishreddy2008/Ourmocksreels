import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {C} from "./brand";
import {Hook} from "./scenes/Hook";
import {Subjects} from "./scenes/Subjects";
import {Journey} from "./scenes/Journey";
import {Four} from "./scenes/Four";
import {Cta} from "./scenes/Cta";
import {SCENES, sec} from "./timing";

const seq = (s: {from: number; to: number}) => ({from: sec(s.from), durationInFrames: sec(s.to) - sec(s.from)});

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: C.navy}}>
    <Sequence {...seq(SCENES.hook)}><Hook /></Sequence>
    <Sequence {...seq(SCENES.subjects)}><Subjects /></Sequence>
    <Sequence {...seq(SCENES.journey)}><Journey /></Sequence>
    <Sequence {...seq(SCENES.four)}><Four /></Sequence>
    <Sequence {...seq(SCENES.cta)}><Cta /></Sequence>
    <Audio src={staticFile("soundtrack.wav")} />
  </AbsoluteFill>
);
