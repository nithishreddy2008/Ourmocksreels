import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

// 2×2 mosaic of the four campuses, used behind the hook and the vision lines.
export const PHOTOS = [
  {src: "bhu.jpg", focus: "50% 65%"},
  {src: "iiser-pune.jpg", focus: "50% 55%"},
  {src: "niser.jpg", focus: "50% 28%"},
  {src: "rvce.jpg", focus: "62% 55%"},
];

export const Grid: React.FC<{f: number; reveal: (k: number) => number; dim: number; zoom?: number}> = ({f, reveal, dim, zoom = 1}) => (
  <AbsoluteFill style={{background: "#061A4D", transform: `scale(${zoom})`}}>
    {PHOTOS.map((p, k) => {
      const r = reveal(k);
      return (
        <div
          key={p.src}
          style={{
            position: "absolute",
            left: (k % 2) * 540 + 4,
            top: Math.floor(k / 2) * 960 + 4,
            width: 532,
            height: 952,
            overflow: "hidden",
            borderRadius: 18,
            opacity: r,
            transform: `scale(${0.9 + 0.1 * r})`,
          }}
        >
          <Img src={staticFile(`campus/${p.src}`)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: p.focus, transform: `scale(${1.15 - f * 0.0012})`}} />
        </div>
      );
    })}
    <AbsoluteFill style={{background: `rgba(6,26,77,${dim})`}} />
  </AbsoluteFill>
);
