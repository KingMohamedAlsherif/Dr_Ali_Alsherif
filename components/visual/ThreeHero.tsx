'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInView } from '@/lib/useInView';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { HeroFallbackVisual } from './HeroFallbackVisual';

type ThreeHeroImplType = ({ reduceMotion }: { reduceMotion: boolean }) => JSX.Element | null;

type ThreeHeroModule = {
  ThreeHeroImpl: ThreeHeroImplType;
  r3fAvailable: boolean;
};

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
  const [webglSupported, setWebglSupported] = useState(false);
  const [Impl, setImpl] = useState<ThreeHeroImplType | null>(null);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px', threshold: 0.1 });

  useEffect(() => {
    setWebglSupported(hasWebGLSupport());
  }, []);

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

  const allow3d = useMemo(() => {
    return inView && webglSupported && !isMobile && !isLowPower;
  }, [inView, webglSupported, isMobile, isLowPower]);

  useEffect(() => {
    if (!allow3d || hasAttemptedLoad) {
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const mod = (await import('./three/ThreeHeroImpl')) as ThreeHeroModule;
        if (active && mod.r3fAvailable) {
          setImpl(() => mod.ThreeHeroImpl);
        }
      } catch {
        if (active) {
          setImpl(null);
        }
      } finally {
        if (active) {
          setHasAttemptedLoad(true);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [allow3d, hasAttemptedLoad]);

  return (
    <div
      ref={ref}
      className="relative h-[260px] w-[210px] overflow-hidden rounded-[26px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/60 shadow-soft"
      aria-hidden="true"
    >
      {Impl ? <Impl reduceMotion={prefersReducedMotion} /> : <HeroFallbackVisual />}
    </div>
  );
}
