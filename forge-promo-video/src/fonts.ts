import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const { fontFamily: BEBAS } = loadBebas('normal', {
  weights: ['400'],
  subsets: ['latin'],
});

const { fontFamily: INTER } = loadInter('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export { BEBAS, INTER };
