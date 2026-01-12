'use client';

export function BackgroundFallbackTexture() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" fill="none">
        <defs>
          <linearGradient id="archiveGrid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="rgb(var(--accent-2))" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="archiveGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(600 240) rotate(90) scale(420 520)">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="rgb(var(--bg))" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#archiveGlow)" />
        <g stroke="url(#archiveGrid)" strokeWidth="1">
          <path d="M120 0v800" />
          <path d="M300 0v800" />
          <path d="M480 0v800" />
          <path d="M660 0v800" />
          <path d="M840 0v800" />
          <path d="M1020 0v800" />
          <path d="M0 120h1200" />
          <path d="M0 260h1200" />
          <path d="M0 400h1200" />
          <path d="M0 540h1200" />
          <path d="M0 680h1200" />
        </g>
        <g stroke="rgb(var(--accent))" strokeOpacity="0.18">
          <circle cx="220" cy="200" r="6" />
          <circle cx="860" cy="520" r="5" />
          <circle cx="540" cy="640" r="4" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(var(--accent),0.08),transparent_60%)]" />
    </div>
  );
}
