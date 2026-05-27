import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  spring,
} from 'remotion';
import { LIME, BG, SAFE } from '../constants';
import { BEBAS, INTER } from '../fonts';
import { GrainOverlay } from '../components/GrainOverlay';
import { PhoneMockup } from '../components/PhoneMockup';

// Scene 3 — SOLUTION (0-7.3s within this scene, 220 frames)
export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ease = (f: number, a: number, b: number) =>
    interpolate(f, [a, b], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Lime vertical stripe sweeps in from left (0-20)
  const stripeScale = ease(frame, 0, 18);

  // "FORGE FITNESS" headline (frames 15-45)
  const h1Progress = ease(frame, 15, 45);
  const h1Y = interpolate(h1Progress, [0, 1], [60, 0]);

  // Tagline (frames 38-65)
  const tagProgress = ease(frame, 38, 65);
  const tagY = interpolate(tagProgress, [0, 1], [30, 0]);

  // Subtitle (frames 58-85)
  const subProgress = ease(frame, 58, 85);
  const subY = interpolate(subProgress, [0, 1], [25, 0]);

  // Phone enters from bottom with spring (frames 70-120)
  const phoneSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 16, stiffness: 100, mass: 1.1 },
  });
  const phoneY = interpolate(phoneSpring, [0, 1], [500, 0]);
  const phoneOp = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phone content scroll: frames 100-210
  const scrollProgress = interpolate(frame, [100, 210], [0, 1], {
    easing: Easing.bezier(0.37, 0, 0.63, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Location tag (frames 185-210)
  const locOp = ease(frame, 185, 210);

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      {/* Subtle radial bg glow */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 20% 40%, rgba(204,255,0,0.04) 0%, transparent 55%)',
        }}
      />

      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(204,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Lime vertical stripe (left edge) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 8,
          height: '100%',
          background: LIME,
          transformOrigin: 'top center',
          transform: `scaleY(${stripeScale})`,
        }}
      />

      {/* Left column: headline + text */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top,
          left: SAFE.side + 20,
          right: 490, // leave room for phone
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 140,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: h1Progress,
            fontFamily: INTER,
            fontSize: 28,
            color: LIME,
            letterSpacing: 5,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          LA SOLUCIÓN
        </div>

        {/* FORGE */}
        <div
          style={{
            opacity: h1Progress,
            transform: `translateY(${h1Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 130, color: '#ffffff', lineHeight: 0.88, letterSpacing: 3 }}>
            FORGE
          </div>
        </div>

        {/* FITNESS */}
        <div
          style={{
            opacity: h1Progress,
            transform: `translateY(${h1Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 130, color: LIME, lineHeight: 0.88, letterSpacing: 3 }}>
            FITNESS
          </div>
        </div>

        {/* Lime bar */}
        <div style={{ marginTop: 28, height: 3, background: LIME, width: 80 }} />

        {/* Tagline */}
        <div
          style={{
            marginTop: 22,
            opacity: tagProgress,
            transform: `translateY(${tagY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: INTER,
              fontSize: 32,
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: 0.5,
            }}
          >
            GYM BOUTIQUE PREMIUM
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 18,
            opacity: subProgress,
            transform: `translateY(${subY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: INTER,
              fontSize: 36,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Entrenamiento de élite en un espacio diseñado para quienes buscan resultados reales.
          </div>
        </div>

        {/* Location badge */}
        <div
          style={{
            marginTop: 36,
            opacity: locOp,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(204,255,0,0.08)',
              border: `1px solid rgba(204,255,0,0.3)`,
              padding: '10px 18px',
              borderRadius: 3,
            }}
          >
            <span style={{ fontSize: 26 }}>📍</span>
            <span style={{ fontFamily: INTER, fontSize: 28, color: LIME, fontWeight: 700, letterSpacing: 1 }}>
              PALERMO, BUENOS AIRES
            </span>
          </div>
        </div>
      </div>

      {/* Phone mockup (right side) */}
      <div
        style={{
          position: 'absolute',
          right: SAFE.side - 20,
          top: SAFE.top,
          bottom: SAFE.bottom,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: phoneOp,
          transform: `translateY(${phoneY}px)`,
        }}
      >
        <PhoneMockup scrollProgress={scrollProgress} />
      </div>

      <GrainOverlay />
    </AbsoluteFill>
  );
};
