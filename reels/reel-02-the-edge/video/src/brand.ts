import {Easing} from "remotion";
import {loadFont as loadSerif} from "@remotion/google-fonts/InstrumentSerif";
import {loadFont as loadSans} from "@remotion/google-fonts/Inter";
import {loadFont as loadDisplay} from "@remotion/google-fonts/PlayfairDisplay";

export const C = {
  navy: "#061A4D",
  blue: "#1F5FFF",
  lime: "#B8FF34",
  bg: "#F6F7FB",
  white: "#FFFFFF",
  muted: "#8A93AC",
  line: "#DCE1EE",
  blueSoft: "#E7EEFF",
};

export const SERIF = loadSerif("normal", {weights: ["400"], subsets: ["latin"]}).fontFamily;
loadSerif("italic", {weights: ["400"], subsets: ["latin"]});
// Headline serif for "Beyond JEE & NEET": its italic J keeps a clear hook (Instrument Serif's reads as "/").
export const DISPLAY_SERIF = loadDisplay("normal", {weights: ["500"], subsets: ["latin"]}).fontFamily;
loadDisplay("italic", {weights: ["500"], subsets: ["latin"]});
export const SANS =loadSans("normal", {weights: ["400", "500", "600", "700", "800"], subsets: ["latin"]}).fontFamily;

export const W = 1080;
export const H = 1920;

// Expo-out for entrances, expo-in for exits.
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
