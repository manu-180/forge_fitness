import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing, spring } from 'remotion';
import { LIME, SAFE } from '../constants';
import { BEBAS, INTER } from '../fonts';
import { GrainOverlay } from '../components/GrainOverlay';

const PAIN_POINTS = [
  { icon: '✗', text: 'Coaches que ni te miran' },
  { icon: '✗', text: 'Máquinas viejas y sin mantenimiento' },
  { icon: '✗', text: 'Sin plan, sin métricas, sin progreso' },
  { icon: '✗', text: 'Pagás caro por un espacio genérico' },
];

// Scene 2 — PROBLEM (0-5.5s within this scene)
export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ease = (f: number, a: number, b: number) =>
    interpolate(f, [a, b], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Red accent bar sweeps in (0-15)
  const barScaleX = ease(frame, 0, 15);

  // Eyebrow "EL PROBLEMA" (frames 10-30)
  const eyebrowOp = ease(frame, 10, 30);

  // "LOS GYMS" headline (frames 20-45)
  const h1Progress = ease(frame, 20, 45);
  const h1Y = interpolate(h1Progress, [0, 1], [50, 0]);

  // "NO FUNCIONAN" (frames 35-60)
  const h2Progress = ease(frame, 35, 60);
  const h2Y = interpolate(h2Progress, [0, 1], [50, 0]);

  // Lime separator (frames 58-72)
  const sepScale = ease(frame, 58, 72);

  // Pain points appear sequentially (frames 70, 90, 110, 130)
  const painOpacities = PAIN_POINTS.map((_, i) => {
    const startFrame = 70 + i * 20;
    const s = spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 14, stiffness: 120, mass: 0.8 },
    });
    return {
      opacity: interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
      translateY: interpolate(s, [0, 1], [28, 0]),
    };
  });

  return (
    <AbsoluteFill style={{ background: '#0d0d0d', overflow: 'hidden' }}>
      {/* Grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Red accent bar (top-left) */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top,
          left: SAFE.side,
          width: 140,
          height: 4,
          background: '#FF3B3B',
          transformOrigin: 'left center',
          transform: `scaleX(${barScaleX})`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: SAFE.top + 30,
          left: SAFE.side,
          right: SAFE.side,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: eyebrowOp,
            fontFamily: INTER,
            fontSize: 28,
            color: '#FF3B3B',
            letterSpacing: 5,
            fontWeight: 700,
            marginBottom: 18,
          }}
        >
          EL PROBLEMA
        </div>

        {/* "LOS GYMS" */}
        <div
          style={{
            opacity: h1Progress,
            transform: `translateY(${h1Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 115, color: '#ffffff', lineHeight: 0.9, letterSpacing: 2 }}>
            LOS GYMS
          </div>
        </div>

        {/* "COMUNES" */}
        <div
          style={{
            opacity: h1Progress,
            transform: `translateY(${h1Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: BEBAS, fontSize: 115, color: '#ffffff', lineHeight: 0.9, letterSpacing: 2 }}>
            COMUNES
          </div>
        </div>

        {/* "NO FUNCIONAN" */}
        <div
          style={{
            opacity: h2Progress,
            transform: `translateY(${h2Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: 115,
              color: '#FF3B3B',
              lineHeight: 0.9,
              letterSpacing: 2,
            }}
          >
            NO FUNCIONAN
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            marginTop: 32,
            height: 2,
            background: 'rgba(255,255,255,0.15)',
            width: '100%',
            transformOrigin: 'left center',
            transform: `scaleX(${sepScale})`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0,
              height: '100%',
              width: '30%',
              background: LIME,
              transformOrigin: 'left center',
              transform: `scaleX(${sepScale})`,
            }}
          />
        </div>

        {/* Pain points */}
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                opacity: painOpacities[i].opacity,
                transform: `translateY(${painOpacities[i].translateY}px)`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '2px solid #FF3B3B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ color: '#FF3B3B', fontFamily: INTER, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>
                  {point.icon}
                </span>
              </div>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 40,
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 400,
                }}
              >
                {point.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <GrainOverlay />
    </AbsoluteFill>
  );
};
