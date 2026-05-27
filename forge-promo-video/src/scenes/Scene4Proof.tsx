import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing, spring } from 'remotion';
import { LIME, BG, SAFE } from '../constants';
import { BEBAS, INTER } from '../fonts';
import { GrainOverlay } from '../components/GrainOverlay';

const STATS = [
  { value: '500+', label: 'MIEMBROS ACTIVOS', icon: '👥' },
  { value: '50+', label: 'CLASES SEMANALES', icon: '📅' },
  { value: '4.9★', label: 'GOOGLE REVIEWS', icon: '⭐' },
  { value: '98%', label: 'RETENCIÓN', icon: '🔥' },
];

const FEATURES = [
  '🔥 Clases de 45 Min — máxima quema',
  '🎯 Coaching 1:1 personalizado',
  '⚡ Heart Rate Tracking en vivo',
  '🧬 Recovery Zone: sauna + crioterapia',
  '🏗️ Equipamiento Rogue premium',
  '👥 Comunidad elite que te empuja',
];

// Scene 4 — PROOF (0-5.5s within this scene, 165 frames)
export const Scene4Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ease = (f: number, a: number, b: number) =>
    interpolate(f, [a, b], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Lime top bar sweeps in (0-18)
  const topBarScale = ease(frame, 0, 18);

  // Eyebrow (8-28)
  const eyebrowOp = ease(frame, 8, 28);

  // Headline (18-45)
  const headProgress = ease(frame, 18, 45);
  const headY = interpolate(headProgress, [0, 1], [45, 0]);

  // Stats cards: staggered spring entrance, 2×2 grid
  const statSprings = STATS.map((_, i) => {
    const startF = 50 + i * 18;
    return {
      s: spring({ frame: frame - startF, fps, config: { damping: 14, stiffness: 110, mass: 0.9 } }),
      op: interpolate(frame, [startF, startF + 12], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    };
  });

  // Feature list appears (frames 110-155)
  const featureOp = ease(frame, 110, 135);
  const featureY = interpolate(featureOp, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(204,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Lime top bar */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top,
          left: SAFE.side,
          right: SAFE.side,
          height: 4,
          background: LIME,
          transformOrigin: 'left center',
          transform: `scaleX(${topBarScale})`,
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
            color: LIME,
            letterSpacing: 5,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          POR QUÉ FORGE
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: headProgress,
            transform: `translateY(${headY}px)`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: 105,
              color: '#fff',
              lineHeight: 0.92,
              letterSpacing: 2,
            }}
          >
            LOS NÚMEROS
          </div>
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: 105,
              color: LIME,
              lineHeight: 0.92,
              letterSpacing: 2,
            }}
          >
            NO MIENTEN
          </div>
        </div>

        {/* Stats grid: 2×2 */}
        <div
          style={{
            marginTop: 44,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 18,
          }}
        >
          {STATS.map((stat, i) => {
            const { s, op } = statSprings[i];
            const translateY = interpolate(s, [0, 1], [40, 0]);
            const scale = interpolate(s, [0, 1], [0.85, 1]);
            return (
              <div
                key={stat.label}
                style={{
                  opacity: op,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(204,255,0,0.18)`,
                  borderRadius: 6,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 32 }}>{stat.icon}</span>
                <div
                  style={{
                    fontFamily: BEBAS,
                    fontSize: 80,
                    color: LIME,
                    lineHeight: 1,
                    letterSpacing: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: INTER,
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.55)',
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features strip */}
        <div
          style={{
            marginTop: 36,
            opacity: featureOp,
            transform: `translateY(${featureY}px)`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px 20px',
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f}
              style={{
                fontFamily: INTER,
                fontSize: 28,
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.04)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
                padding: '6px 14px',
                whiteSpace: 'nowrap',
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>

      <GrainOverlay />
    </AbsoluteFill>
  );
};
