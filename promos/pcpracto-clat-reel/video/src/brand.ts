import {Easing} from "remotion";
import {loadFont as loadDisplay} from "@remotion/google-fonts/ArchivoBlack";
import {loadFont as loadSerif} from "@remotion/google-fonts/LibreBaskerville";
import {loadFont as loadSans} from "@remotion/google-fonts/Inter";

// Colours sampled from the PC Practo logo, plus paper and ink.
export const C = {
  yellow: "#FFE600",
  red: "#9B1218",
  redDeep: "#5E0A0E",
  cream: "#FBF4E4",
  paperLine: "#E7DCC4",
  ink: "#1A0A0B",
  white: "#FFFFFF",
  grey: "#8C7F76",
};

export const DISPLAY = loadDisplay("normal", {weights: ["400"], subsets: ["latin"]}).fontFamily;
export const SERIF = loadSerif("normal", {weights: ["400", "700"], subsets: ["latin"]}).fontFamily;
loadSerif("italic", {weights: ["400"], subsets: ["latin"]});
export const SANS = loadSans("normal", {weights: ["500", "600", "700", "800", "900"], subsets: ["latin"]}).fontFamily;

export const W = 1080;
export const H = 1920;

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
