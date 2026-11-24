import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {C, DISPLAY, SANS, SERIF} from "../brand";
import {Backdrop} from "../components/Backdrop";
import {Logo} from "../components/Logo";
import {enter, exit} from "../components/anim";
import {sec, STEPS} from "../timing";

// 13–24s (local 0–330). Three steps, one at a time, each worked on the passage's example.
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const START = STEPS.map((s) => sec(s) - sec(STEPS[0])); // 0, 105, 210
const END = [START[1], START[2], sec(24) - sec(STEPS[0])];

const STEP_TITLES = [
  ["FIND THE", "PRINCIPLE"],
  ["MATCH THE", "FACTS"],
  ["IGNORE WHAT", "YOU ‘KNOW’"],
];

export const Method: React.FC = () => {
  const f = useCurrentFrame();
  const sceneOut = exit(f, 320, 10);
  const active = f < START[1] ? 0 : f < START[2] ? 1 : 2;

  return (
    <AbsoluteFill style={{opacity: sceneOut}}>
      <Backdrop color={C.ink} glow="#3B0E12" grain={0.08} />
      <div style={{position: "absolute", top: 100, left: (1080 - 280) / 2}}>
        <Logo width={280} />
      </div>

      {/* Progress: three segments, filled as each step arrives. */}
      <div style={{position: "absolute", top: 230, left: 140, right: 140, display: "flex", gap: 18}}>
        {[0, 1, 2].map((k) => {
          const p = interpolate(f, [START[k], START[k] + 10], [0, 1], clamp);
          return (
            <div key={k} style={{flex: 1, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.14)", overflow: "hidden"}}>
              <div style={{width: `${p * 100}%`, height: "100%", background: C.yellow, borderRadius: 7}} />
            </div>
          );
        })}
      </div>

      {[0, 1, 2].map((k) => {
        const local = f - START[k];
        const inP = enter(f, START[k], 12);
        const outP = k < 2 ? exit(f, END[k] - 9, 9) : 1;
        if (local < -2 || f > END[k] + 1) return null;
        return (
          <div key={k} style={{position: "absolute", inset: 0, opacity: inP * outP, transform: `translateX(${(1 - inP) * 160 - (1 - outP) * 160}px)`}}>
            <div style={{position: "absolute", top: 300, left: 90, fontFamily: DISPLAY, fontSize: 230, lineHeight: 1, color: "transparent", WebkitTextStroke: `5px ${C.yellow}`}}>
              0{k + 1}
            </div>
            <div style={{position: "absolute", top: 540, left: 90, fontFamily: DISPLAY, fontSize: 96, lineHeight: 1.02, letterSpacing: -1.5}}>
              <div style={{color: C.white}}>{STEP_TITLES[k][0]}</div>
              <div style={{color: C.yellow}}>{STEP_TITLES[k][1]}</div>
            </div>
            <div style={{position: "absolute", top: 820, left: 90, right: 90, height: 560}}>
              {k === 0 && <FindPrinciple t={local} />}
              {k === 1 && <MatchFacts t={local} />}
              {k === 2 && <IgnoreMemory t={local} />}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Step 1: a scan bar runs down the passage and locks on the rule.
const FindPrinciple: React.FC<{t: number}> = ({t}) => {
  const lines = [0.92, 0.78, 0.86, 1, 0.7, 0.9, 0.64];
  const RULE = 3;
  const scan = interpolate(t, [8, 54], [0, RULE], {...clamp, easing: (x) => 1 - Math.pow(1 - x, 3)});
  const locked = enter(t, 56, 10);
  return (
    <div style={{position: "relative", height: 520, borderRadius: 30, background: C.cream, padding: "44px 50px", boxSizing: "border-box", overflow: "hidden"}}>
      {lines.map((w, k) => (
        <div key={k} style={{height: 54, marginBottom: 12, display: "flex", alignItems: "center"}}>
          {k === RULE ? (
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: C.ink, background: `rgba(255,230,0,${locked})`, padding: "6px 12px", borderRadius: 8, whiteSpace: "nowrap"}}>
              Known risk, freely accepted → no claim.
            </div>
          ) : (
            <div style={{width: `${w * 100}%`, height: 16, borderRadius: 8, background: C.paperLine}} />
          )}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          top: 44 + scan * 66 - 6,
          height: 66,
          borderRadius: 12,
          border: `5px solid ${C.red}`,
          boxShadow: `0 0 0 ${locked * 10}px rgba(155,18,24,0.18)`,
          opacity: interpolate(t, [4, 10], [0, 1], clamp),
        }}
      />
      <div style={{position: "absolute", right: 40, top: 44 + RULE * 66 + 74, fontFamily: DISPLAY, fontSize: 34, color: C.white, background: C.red, padding: "8px 20px", borderRadius: 12, opacity: locked, transform: `translateY(${(1 - locked) * 20}px)`}}>
        THE RULE
      </div>
    </div>
  );
};

// Step 2: the RULE and FACTS pieces slide together and lock with a tick.
const MatchFacts: React.FC<{t: number}> = ({t}) => {
  const join = enter(t, 28, 16);
  const tick = enter(t, 60, 10);
  const card = (label: string, body: string, bg: string, fg: string, dir: number) => (
    <div
      style={{
        width: 380,
        height: 330,
        borderRadius: 30,
        background: bg,
        color: fg,
        padding: 36,
        boxSizing: "border-box",
        transform: `translateX(${dir * (1 - join) * 90}px) rotate(${dir * (1 - join) * 4}deg)`,
      }}
    >
      <div style={{fontFamily: DISPLAY, fontSize: 40, marginBottom: 16}}>{label}</div>
      <div style={{fontFamily: SERIF, fontSize: 32, lineHeight: 1.4}}>{body}</div>
    </div>
  );
  return (
    <div style={{position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", height: 520}}>
      {card("RULE", "Known risk, freely accepted → no claim.", C.yellow, C.ink, -1)}
      {card("FACTS", "Front row. Warning sign. Hit by a six.", C.cream, C.ink, 1)}
      <svg width="110" height="110" viewBox="0 0 140 140" style={{position: "absolute", left: 450 - 55, top: 260 - 55, transform: `scale(${0.4 + 0.6 * tick})`, opacity: Math.max(join > 0.95 ? 1 : 0, tick)}}>
        <circle cx="70" cy="70" r="62" fill={C.red} stroke={C.ink} strokeWidth="8" />
        <path d="M40 72l20 20 40-44" stroke={C.white} strokeWidth="13" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tick} />
      </svg>
      <div style={{position: "absolute", bottom: 20, width: "100%", textAlign: "center", fontFamily: DISPLAY, fontSize: 44, color: C.yellow, opacity: tick}}>
        IT FITS.
      </div>
    </div>
  );
};

// Step 3: what you "know" is struck out; the passage wins.
const IgnoreMemory: React.FC<{t: number}> = ({t}) => {
  const memIn = enter(t, 6, 12);
  const strike = interpolate(t, [40, 48], [0, 1], clamp);
  const passIn = enter(t, 62, 12);
  const tick = enter(t, 75, 10);
  return (
    <div style={{position: "relative", height: 520}}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 10,
          width: 660,
          borderRadius: 34,
          background: "rgba(255,255,255,0.1)",
          border: "3px dashed rgba(255,255,255,0.35)",
          padding: "30px 36px",
          opacity: memIn * (1 - 0.4 * strike),
          transform: `translateY(${(1 - memIn) * 30}px) rotate(-2deg)`,
        }}
      >
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: C.grey, marginBottom: 10}}>YOUR MEMORY</div>
        <div style={{position: "relative", fontFamily: SERIF, fontStyle: "italic", fontSize: 34, lineHeight: 1.35, color: C.white, whiteSpace: "nowrap"}}>
          “Stadiums always have to pay.”
          <div style={{position: "absolute", left: -10, top: "46%", height: 12, width: `${strike * 104}%`, background: C.red, borderRadius: 6, transform: "rotate(-3deg)"}} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 230,
          width: 600,
          borderRadius: 34,
          background: C.yellow,
          padding: "30px 36px",
          opacity: passIn,
          transform: `translateY(${(1 - passIn) * 40}px) rotate(2deg)`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: C.redDeep}}>THE PASSAGE</div>
          <svg width="64" height="64" viewBox="0 0 64 64" style={{transform: `scale(${0.5 + 0.5 * tick})`, opacity: tick}}>
            <circle cx="32" cy="32" r="29" fill={C.red} />
            <path d="M18 33l9 9 19-21" stroke={C.white} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 36, lineHeight: 1.35, color: C.ink, marginTop: 8}}>Meera accepted a known risk. No claim.</div>
      </div>
    </div>
  );
};
