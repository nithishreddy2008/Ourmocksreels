import React from "react";
import {enter} from "./anim";

// Word-by-word rise from behind a mask. Each word: {text, italic?, color?}.
export type Word = {text: string; italic?: boolean; color?: string};

export const RevealLine: React.FC<{
  words: Word[];
  frame: number;
  start: number;
  stagger?: number;
  dur?: number;
  style?: React.CSSProperties;
}> = ({words, frame, start, stagger = 3, dur = 16, style}) => (
  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "0.24em", ...style}}>
    {words.map((w, k) => {
      const p = enter(frame, start + k * stagger, dur);
      return (
        <span key={k} style={{display: "inline-block", overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em", paddingRight: w.italic ? "0.08em" : 0}}>
          <span
            style={{
              display: "inline-block",
              transform: `translateY(${(1 - p) * 105}%)`,
              opacity: Math.min(1, p * 1.6),
              fontStyle: w.italic ? "italic" : "normal",
              color: w.color,
            }}
          >
            {w.text}
          </span>
        </span>
      );
    })}
  </div>
);
