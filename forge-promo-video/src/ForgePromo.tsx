import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { FRAMES } from './constants';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene3Solution } from './scenes/Scene3Solution';
import { Scene4Proof } from './scenes/Scene4Proof';
import { Scene5CTA } from './scenes/Scene5CTA';

// Total: 165+165+220+165+95 = 810 frames, minus 4×15 transitions = 750 frames (25s @ 30fps)
export const ForgePromo: React.FC = () => {
  const t = linearTiming({ durationInFrames: FRAMES.transition });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={FRAMES.scene1}>
        <Scene1Hook />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence durationInFrames={FRAMES.scene2}>
        <Scene2Problem />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence durationInFrames={FRAMES.scene3}>
        <Scene3Solution />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence durationInFrames={FRAMES.scene4}>
        <Scene4Proof />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence durationInFrames={FRAMES.scene5}>
        <Scene5CTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
