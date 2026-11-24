import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {C} from "./brand";
import {Hook} from "./scenes/Hook";
import {Exam, ExamCard} from "./scenes/Exam";
import {Edge} from "./scenes/Edge";
import {Vision} from "./scenes/Vision";
import {Cta} from "./scenes/Cta";
import {SCENES, sec} from "./timing";

const seq = (s: {from: number; to: number}) => ({from: sec(s.from), durationInFrames: sec(s.to) - sec(s.from)});

// Facts from the OurMocks exam guides (mocktest-sigma.vercel.app, verified 27 Oct 2026). Photos: Wikimedia Commons, see image-credits.json.
const CARDS: Record<"cuet" | "iat" | "nest" | "comedk", ExamCard> = {
  cuet: {n: 1, exam: "CUET UG", head: ["Central", "universities."], sub: "BHU, DU, JNU and many more", photo: "bhu.jpg", focus: "50% 62%", place: "Banaras Hindu University", credit: "Photo: Sundrampixel · CC0"},
  iat: {n: 2, exam: "IISER IAT", head: ["Research from", "year one."], sub: "BS-MS degrees at the 7 IISERs", photo: "iiser-pune.jpg", focus: "50% 55%", place: "IISER Pune", credit: "Photo: DesiBoy101 · CC BY 4.0"},
  nest: {n: 3, exam: "NISER NEST", head: ["Science, with", "a scholarship."], sub: "Integrated MSc at NISER & UM-DAE CEBS, with the ₹60,000-a-year DISHA scholarship", photo: "niser.jpg", focus: "50% 22%", place: "NISER, Jatni", credit: "Photo: Amiwins · CC BY-SA 4.0"},
  comedk: {n: 4, exam: "COMEDK UGET", head: ["Engineering in", "Karnataka."], sub: "About 150 colleges, about 20,000 seats", photo: "rvce.jpg", focus: "62% 55%", place: "RV College of Engineering, Bengaluru", credit: "Photo: Rvian00 · CC BY-SA 3.0"},
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: C.navy}}>
    <Sequence {...seq(SCENES.hook)}>
      <Hook />
    </Sequence>
    {(["cuet", "iat", "nest", "comedk"] as const).map((k) => (
      <Sequence key={k} {...seq(SCENES[k])}>
        <Exam card={CARDS[k]} len={seq(SCENES[k]).durationInFrames} />
      </Sequence>
    ))}
    <Sequence {...seq(SCENES.edge)}>
      <Edge />
    </Sequence>
    <Sequence {...seq(SCENES.vision)}>
      <Vision />
    </Sequence>
    <Sequence {...seq(SCENES.cta)}>
      <Cta />
    </Sequence>
    <Audio src={staticFile("soundtrack.wav")} />
  </AbsoluteFill>
);
