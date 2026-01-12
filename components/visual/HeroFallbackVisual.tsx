'use client';

import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export function HeroFallbackVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative h-full w-full"
      style={prefersReducedMotion ? undefined : { transform: 'translateZ(0)' }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 240 320"
        className="absolute inset-0 h-full w-full text-accent/40"
        fill="none"
      >
        <defs>
          <linearGradient id="cardEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect x="28" y="22" width="184" height="276" rx="22" stroke="url(#cardEdge)" strokeWidth="1" />
        <rect x="42" y="40" width="156" height="240" rx="16" stroke="currentColor" strokeWidth="1" />
        <path d="M70 98h100" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M70 140h100" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M70 182h72" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="176" cy="188" r="6" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div
        className="absolute inset-6 rounded-[22px] bg-gradient-to-br from-[rgba(var(--accent),0.08)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 left-8 right-8 h-px bg-[rgba(var(--accent-2),0.35)]"
        aria-hidden="true"
      />
    </div>
  );
}
