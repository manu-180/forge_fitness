import './index.css';
import React from 'react';
import { Composition } from 'remotion';
import { ForgePromo } from './ForgePromo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ForgePromo"
      component={ForgePromo}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
