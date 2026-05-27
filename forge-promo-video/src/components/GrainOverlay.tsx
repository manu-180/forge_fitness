import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const GrainOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 60;
  const id = `g${seed}`;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 50 }}>
      <svg
        width="100%"
        height="100%"
        style={{ opacity, display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            seed={seed}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </AbsoluteFill>
  );
};
