'use client';

import { useEffect, useState } from 'react';

type ScrollProgressOptions = {
  enabled?: boolean;
  initial?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function useScrollProgress({ enabled = true, initial = 0.5 }: ScrollProgressOptions = {}) {
  const [progress, setProgress] = useState(initial);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;

      if (document.hidden) {
        return;
      }

      const { scrollHeight } = document.documentElement;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(scrollHeight - viewportHeight, 1);
      const next = clamp(window.scrollY / maxScroll, 0, 1);

      setProgress((current) => (current === next ? current : next));
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    requestUpdate();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [enabled]);

  return progress;
}
