import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { LIME, BG, SAFE } from '../constants';
import { BEBAS, INTER } from '../fonts';
import { GrainOverlay } from '../components/GrainOverlay';

// Scene 1 — HOOK (0-5.5s)
// "¿CANSADO DE GIMNASIOS GENÉRICOS?"
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const ease = (f: number, a: number, b: number) =>
    interpolate(f, [a, b], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Lime sweep line: shoots across left→right in frames 0-18
  const lineScaleX = interpolate(frame, [0, 18], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "¿CANSADO DE" — slides up from offset + fades in (frames 18-45)
  const line1Progress = ease(frame, 18, 45);
  const line1Y = interpolate(line1Progress, [0, 1], [60, 0]);
  const line1Op = line1Progress;

  // "GIMNASIOS GENÉRICOS?" — delayed (frames 35-65)
  const line2Progress = ease(frame, 35, 65);
  const line2Y = interpolate(line2Progress, [0, 1], [60, 0]);
  const line2Op = line2Progress;

  // Lime underline accent — scales in (frames 60-80)
  const underlineScale = ease(frame, 60, 80);

  // Subtitle — fades up (frames 70-100)
  const subProgress = ease(frame, 70, 100);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);
  const subOp = subProgress;

  // Small badge "Est. 2024 – Buenos Aires" (frames 100-125)
  const badgeOp = ease(frame, 100, 125);

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      {/* Grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(204,255,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Lime sweep line */}
      <div
        style={{
          position: 'absolute',
          top: 420,
          left: SAFE.side,
          right: SAFE.side,
          height: 3,
          background: LIME,
          transformOrigin: 'left center',
          transform: `scaleX(${lineScaleX})`,
        }}
      />

      {/* Main text block */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top,
          left: SAFE.side,
          right: SAFE.side,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 200,
        }}
      >
        {/* ¿CANSADO DE */}
        <div
          style={{
            opacity: line1Op,
            transform: `translateY(${line1Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: 110,
              color: '#ffffff',
              lineHeight: 0.92,
              letterSpacing: 2,
            }}
          >
            ¿CANSADO DE
          </div>
        </div>

        {/* GIMNASIOS GENÉRICOS? */}
        <div
          style={{
            opacity: line2Op,
            transform: `translateY(${line2Y}px)`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: 110,
              color: LIME,
              lineHeight: 0.92,
              letterSpacing: 2,
            }}
          >
            GIMNASIOS
          </div>
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: 110,
              color: LIME,
              lineHeight: 0.92,
              letterSpacing: 2,
            }}
          >
            GENÉRICOS?
          </div>
        </div>

        {/* Lime underline */}
        <div
          style={{
            marginTop: 24,
            height: 4,
            background: LIME,
            width: 200,
            transformOrigin: 'left center',
            transform: `scaleX(${underlineScale})`,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            marginTop: 30,
            opacity: subOp,
            transform: `translateY(${subY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: INTER,
              fontSize: 38,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.45,
              fontWeight: 400,
              maxWidth: 820,
            }}
          >
            Vos merecés más que máquinas rancias y coaches de cartón.
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: 48,
            opacity: badgeOp,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: `1px solid ${LIME}`,
              padding: '8px 18px',
              borderRadius: 2,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: LIME }} />
            <span style={{ fontFamily: INTER, fontSize: 28, color: LIME, fontWeight: 700, letterSpacing: 2 }}>
              EST. 2024 — BUENOS AIRES
            </span>
          </div>
        </div>
      </div>

      <GrainOverlay />
    </AbsoluteFill>
  );
};
