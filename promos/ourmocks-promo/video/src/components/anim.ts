import {interpolate} from "remotion";
import {EASE_IN, EASE_OUT} from "../brand";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

// 0→1 over [start, start+dur] with expo-out.
export const enter = (frame: number, start: number, dur = 14) =>
  interpolate(frame, [start, start + dur], [0, 1], {...clamp, easing: EASE_OUT});

// 1→0 over [start, start+dur] with expo-in.
export const exit = (frame: number, start: number, dur = 10) =>
  interpolate(frame, [start, start + dur], [1, 0], {...clamp, easing: EASE_IN});

export const lerp = (p: number, a: number, b: number) => a + (b - a) * p;
