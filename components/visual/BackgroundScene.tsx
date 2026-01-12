'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { BackgroundFallbackTexture } from './BackgroundFallbackTexture';

const BackgroundSceneImpl = dynamic(
  () => import('./three/BackgroundSceneImpl').then((mod) => mod.BackgroundSceneImpl),
  { ssr: false, loading: () => null }
);

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

export function BackgroundScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [webglSupported, setWebglSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    const updateVisibility = () => setIsVisible(!document.hidden);

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const allow3d = useMemo(() => {
    return webglSupported && !isMobile && !isLowPower;
  }, [isLowPower, isMobile, webglSupported]);

  const progress = useScrollProgress({ enabled: allow3d && !prefersReducedMotion && isVisible, initial: 0.5 });

  useEffect(() => {
    if (!allow3d) {
      setIsReady(false);
    }
  }, [allow3d]);

  const showFallback = !allow3d || !isReady;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {showFallback ? <BackgroundFallbackTexture /> : null}
      {allow3d ? (
        <BackgroundSceneImpl
          reduceMotion={prefersReducedMotion}
          progress={progress}
          isVisible={isVisible}
          onReady={() => setIsReady(true)}
        />
      ) : null}
      <div className="background-vignette" aria-hidden="true" />
    </div>
  );
}
