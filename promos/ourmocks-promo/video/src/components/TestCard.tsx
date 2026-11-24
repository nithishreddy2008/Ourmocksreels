import React from "react";
import {interpolate} from "remotion";
import {C, SANS} from "../brand";
import {enter} from "./anim";

// A CUET-pattern question card using a real question from this repo:
// CUET/Chemistry/CUET CHEMISTRY TEST 1.json → CUET27-CHE-T01-Q23 (answer B).
const QUESTION = "Which of the following is the most acidic?";
const OPTIONS = ["Phenol", "4-Nitrophenol", "4-Methylphenol", "Ethanol"];
const ANSWER = 1;
const CARD_W = 940;
const OPT_H = 96;
const OPT_GAP = 16;
const OPT_TOP = 388; // y of the first option inside the card

export const TestCard: React.FC<{frame: number; tapAt: number; correctAt: number}> = ({frame, tapAt, correctAt}) => {
  const secs = 42 * 60 + 18 - Math.floor(frame / 30);
  const timer = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const correct = enter(frame, correctAt, 10);
  const pressed = frame >= tapAt;

  // Touch point glides in to option B, presses, ripples, then lifts away.
  const travel = enter(frame, tapAt - 10, 10);
  const target = {x: CARD_W / 2 + 120, y: OPT_TOP + ANSWER * (OPT_H + OPT_GAP) + OPT_H / 2};
  const tx = interpolate(travel, [0, 1], [CARD_W - 40, target.x]);
  const ty = interpolate(travel, [0, 1], [target.y + 420, target.y]);
  const press = frame >= tapAt && frame < tapAt + 4 ? 0.82 : 1;
  const touchOpacity = travel * interpolate(frame, [tapAt + 10, tapAt + 18], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const ripple = interpolate(frame, [tapAt, tapAt + 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div
      style={{
        position: "relative",
        width: CARD_W,
        borderRadius: 44,
        background: C.white,
        boxShadow: "0 40px 80px rgba(6,26,77,0.14), 0 4px 10px rgba(6,26,77,0.06)",
        padding: 44,
        boxSizing: "border-box",
        fontFamily: SANS,
        color: C.navy,
      }}
    >
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: 52}}>
        <div style={{fontSize: 32, fontWeight: 600, color: C.muted}}>CUET UG · Chemistry</div>
        <div style={{display: "flex", alignItems: "center", gap: 10, fontSize: 32, fontWeight: 700, fontVariantNumeric: "tabular-nums"}}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="16" r="11" fill="none" stroke={C.navy} strokeWidth="3.5" />
            <path d="M15 10v6l4 3" stroke={C.blue} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </svg>
          {timer}
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 26}}>
        <div style={{fontSize: 34, fontWeight: 700, color: C.blue}}>Question 23 of 50</div>
        <div style={{fontSize: 30, fontWeight: 800, background: C.blueSoft, color: C.navy, padding: "8px 20px", borderRadius: 20}}>+5 / −1</div>
      </div>
      <div style={{marginTop: 18, height: 10, borderRadius: 5, background: "#EDF0F7", overflow: "hidden"}}>
        <div style={{width: `${(23 / 50) * 100}%`, height: "100%", background: C.blue, borderRadius: 5}} />
      </div>
      <div style={{marginTop: 34, fontSize: 50, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.8, height: 120}}>{QUESTION}</div>

      <div style={{position: "absolute", top: OPT_TOP, left: 44, right: 44, display: "flex", flexDirection: "column", gap: OPT_GAP}}>
        {OPTIONS.map((o, k) => {
          const isAns = k === ANSWER;
          const sel = isAns && pressed;
          return (
            <div
              key={o}
              style={{
                height: OPT_H,
                borderRadius: 26,
                border: `3px solid ${sel ? C.navy : C.line}`,
                background: isAns ? `rgba(184,255,52,${correct})` : C.white,
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "0 26px",
                boxSizing: "border-box",
                transform: `scale(${sel ? 1 + 0.02 * Math.sin(Math.min(1, ripple) * Math.PI) : 1})`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  border: `3px solid ${sel ? C.navy : C.line}`,
                  background: sel ? C.navy : C.white,
                  color: sel ? C.white : C.navy,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 800,
                  boxSizing: "border-box",
                }}
              >
                {"ABCD"[k]}
              </div>
              <div style={{fontSize: 42, fontWeight: 600, flex: 1}}>{o}</div>
              {isAns && correct > 0 && (
                <svg width="52" height="52" viewBox="0 0 52 52" style={{opacity: correct, transform: `scale(${0.6 + 0.4 * correct})`}}>
                  <circle cx="26" cy="26" r="24" fill={C.navy} />
                  <path d="M15 27l7 7 15-16" stroke={C.lime} strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - correct} />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div style={{height: OPT_TOP - 44 - 52 - 26 - 46 - 18 - 10 - 34 - 120 + 4 * OPT_H + 3 * OPT_GAP}} />

      <div style={{marginTop: 28, height: 56, display: "flex", alignItems: "center", gap: 16, opacity: correct, transform: `translateY(${(1 - correct) * 12}px)`}}>
        <div style={{fontSize: 36, fontWeight: 800, color: C.navy}}>Correct</div>
        <div style={{fontSize: 34, fontWeight: 800, color: C.navy, background: C.lime, padding: "4px 18px", borderRadius: 18}}>+5</div>
        <div style={{fontSize: 32, fontWeight: 500, color: C.muted, marginLeft: 8}}>See step-by-step solution →</div>
      </div>

      {touchOpacity > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              left: target.x - 70 * ripple,
              top: target.y - 70 * ripple,
              width: 140 * ripple,
              height: 140 * ripple,
              borderRadius: "50%",
              border: `4px solid ${C.blue}`,
              opacity: (1 - ripple) * 0.8,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: tx - 36,
              top: ty - 36,
              width: 72,
              height: 72,
              borderRadius: 36,
              background: "rgba(6,26,77,0.28)",
              border: "4px solid rgba(255,255,255,0.9)",
              boxShadow: "0 6px 16px rgba(6,26,77,0.25)",
              opacity: touchOpacity,
              transform: `scale(${press})`,
            }}
          />
        </>
      )}
    </div>
  );
};
