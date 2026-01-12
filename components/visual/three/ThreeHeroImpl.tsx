'use client';

import * as Fiber from '@react-three/fiber';
import { ArchiveCardsScene } from './scenes/ArchiveCardsScene';

const isShim = Boolean((Fiber as { __r3fShim?: boolean }).__r3fShim);

export const r3fAvailable = !isShim;

export function ThreeHeroImpl({ reduceMotion }: { reduceMotion: boolean }) {
  if (!r3fAvailable) {
    return null;
  }

  return <ArchiveCardsScene reduceMotion={reduceMotion} />;
}
