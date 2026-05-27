import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing, spring } from 'remotion';
import { LIME, BG, SAFE } from '../constants';
import { BEBAS, INTER } from '../fonts';
import { GrainOverlay } from '../components/GrainOverlay';

// Scene 5 — CTA (0-3.2s within this scene, 95 frames)
export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ease = (f: number, a: number, b: number) =>
    interpolate(f, [a, b], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Full lime flash (frames 0-8)
  const flashOp = interpolate(frame, [0, 4, 8], [1, 0.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "RESERVÁ TU" (frames 5-25)
  const line1Progress = ease(frame, 5, 25);
  const line1Y = interpolate(line1Progress, [0, 1], [60, 0]);

  // "CLASE DE PRUEBA" (frames 18-40)
  const line2Progress = ease(frame, 18, 40);
  const line2Y = interpolate(line2Progress, [0, 1], [60, 0]);

  // "GRATIS" badge (frames 38-55)
  const badgeSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 12, stiffness: 130, mass: 0.7 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeOp = interpolate(frame, [38, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA button pulsing (frames 55-95)
  const buttonOp = ease(frame, 55, 72);
  const buttonSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.7, 1]);

  // Pulse animation on button: oscillates in scale
  const pulse = interpolate(
    Math.sin(((frame - 70) / 15) * Math.PI),
    [-1, 1],
    [0.97, 1.03],
  );
  const effectivePulse = frame < 70 ? 1 : pulse;

  // Bottom info (frames 70-90)
  const infoOp = ease(frame, 70, 90);

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      {/* Lime flash */}
      <AbsoluteFill
        style={{
          background: LIME,
          opacity: flashOp,
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(204,255,0,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(204,255,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: SAFE.side,
          paddingRight: SAFE.side,
          paddingTop: SAFE.top,
          paddingBottom: SAFE.bottom,
          textAlign: 'center',
          gap: 0,
        }}
      >
        {/* GRATIS badge — appears first with spring pop */}
        <div
          style={{
            opacity: badgeOp,
            transform: `scale(${badgeScale})`,
            marginBottom: 28,
            background: LIME,
            color: '#000',
            fontFamily: INTER,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 4,
            padding: '10px 28px',
            borderRadius: 2,
          }}
        >
          ★ CLASE DE PRUEBA GRATIS ★
        </div>

        {/* "RESERVÁ TU" */}
        <div
          style={{
            opacity: line1Progress,
            transform: `translateY(${line1Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 130, color: '#ffffff', lineHeight: 0.88, letterSpacing: 3 }}>
            RESERVÁ TU
          </div>
        </div>

        {/* "CLASE DE" */}
        <div
          style={{
            opacity: line2Progress,
            transform: `translateY(${line2Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 130, color: LIME, lineHeight: 0.88, letterSpacing: 3 }}>
            CLASE DE
          </div>
        </div>

        {/* "PRUEBA" */}
        <div
          style={{
            opacity: line2Progress,
            transform: `translateY(${line2Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 130, color: LIME, lineHeight: 0.88, letterSpacing: 3 }}>
            PRUEBA
          </div>
        </div>

        {/* Lime underline */}
        <div
          style={{
            marginTop: 28,
            height: 4,
            background: LIME,
            width: 200,
            opacity: line2Progress,
          }}
        />

        {/* CTA button */}
        <div
          style={{
            marginTop: 44,
            opacity: buttonOp,
            transform: `scale(${buttonScale * effectivePulse})`,
          }}
        >
          <div
            style={{
              background: LIME,
              color: '#000',
              fontFamily: INTER,
              fontSize: 46,
              fontWeight: 900,
              padding: '22px 60px',
              borderRadius: 4,
              letterSpacing: 2,
              boxShadow: '0 0 60px rgba(204,255,0,0.35)',
            }}
          >
            EMPEZÁ HOY →
          </div>
        </div>

        {/* Bottom brand info */}
        <div
          style={{
            marginTop: 50,
            opacity: infoOp,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 38, color: 'rgba(255,255,255,0.5)', letterSpacing: 4 }}>
            FORGE FITNESS
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span style={{ fontFamily: INTER, fontSize: 28, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
              Palermo, Buenos Aires
            </span>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: LIME, opacity: 0.6 }} />
            <span style={{ fontFamily: INTER, fontSize: 28, color: LIME, fontWeight: 700, opacity: 0.75 }}>
              @forgefitness
            </span>
          </div>
        </div>
      </AbsoluteFill>

      <GrainOverlay />
    </AbsoluteFill>
  );
};
