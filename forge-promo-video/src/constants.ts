export const LIME = '#CCFF00';
export const BG = '#0a0a0a';

// Scene durations: 165+165+220+165+95 = 810, minus 4×15 transitions = 750 frames (25s @ 30fps)
export const FRAMES = {
  scene1: 165,
  scene2: 165,
  scene3: 220,
  scene4: 165,
  scene5: 95,
  transition: 15,
} as const;

// Safe zone for 1080×1920
export const SAFE = {
  top: 150,
  bottom: 170,
  side: 60,
} as const;
