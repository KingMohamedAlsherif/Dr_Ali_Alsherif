'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useInView } from '@/lib/useInView';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const ArchiveCardsScene = dynamic(
  () => import('./scenes/ArchiveCardsScene').then((mod) => mod.ArchiveCardsScene),
  { ssr: false }
);

function StaticOrnament() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 320"
      className="h-full w-full text-accent/40"
      fill="none"
    >
      <rect x="28" y="22" width="184" height="276" rx="22" stroke="currentColor" strokeWidth="1" />
      <rect x="42" y="40" width="156" height="240" rx="16" stroke="currentColor" strokeWidth="1" />
      <path d="M70 98h100" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M70 140h100" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M70 182h72" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="176" cy="188" r="6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function hasWebGLSupport() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function ThreeHero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px', threshold: 0.1 });

  const webglSupported = useMemo(() => hasWebGLSupport(), []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return;
    }

    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    setIsLowPower(deviceMemory <= 4 || cores <= 4);
  }, []);

  const showFallback = isMobile || isLowPower || !webglSupported;
  const shouldRender = inView && !showFallback;

  return (
    <div
      ref={ref}
      className="relative h-[260px] w-[210px] overflow-hidden rounded-[26px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/60 shadow-soft"
      aria-hidden="true"
    >
      {shouldRender ? (
        <Suspense fallback={<StaticOrnament />}>
          <ArchiveCardsScene reduceMotion={prefersReducedMotion} />
        </Suspense>
      ) : (
        <StaticOrnament />
      )}
    </div>
  );
}
