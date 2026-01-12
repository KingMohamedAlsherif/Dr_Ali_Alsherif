'use client';

import * as Fiber from '@react-three/fiber';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Group } from 'three';

type Vec3 = [number, number, number];

type CardSpec = {
  position: Vec3;
  rotation: Vec3;
  scale: number;
};

type SpineSpec = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

const CARD_SPECS: CardSpec[] = [
  { position: [0, 0.2, 0], rotation: [0.05, -0.18, 0.02], scale: 1.2 },
  { position: [1.2, 0.6, -0.6], rotation: [0.08, -0.25, -0.03], scale: 0.9 },
  { position: [-1.1, -0.4, -0.8], rotation: [0.02, -0.08, 0.04], scale: 1.05 },
  { position: [0.6, -0.9, -1.2], rotation: [0.06, 0.06, -0.02], scale: 0.95 },
  { position: [-0.8, 1.1, -1.4], rotation: [-0.02, 0.12, 0.01], scale: 0.85 },
  { position: [1.4, -0.1, -1.6], rotation: [0.04, -0.16, 0.02], scale: 0.9 },
  { position: [-1.4, 0.3, -1.8], rotation: [0.03, 0.1, -0.01], scale: 0.8 },
  { position: [0.2, 1.4, -2.1], rotation: [-0.04, -0.1, 0.03], scale: 0.75 }
];

const SPINE_SPECS: SpineSpec[] = [
  { position: [-1.9, -0.6, -0.4], rotation: [0, 0.1, 0], scale: [0.35, 1.3, 0.2] },
  { position: [-1.55, -0.55, -0.55], rotation: [0, 0.2, 0], scale: [0.28, 1.1, 0.18] },
  { position: [1.7, -0.6, -0.7], rotation: [0, -0.12, 0], scale: [0.34, 1.25, 0.2] },
  { position: [1.45, -0.52, -0.95], rotation: [0, -0.2, 0], scale: [0.26, 1.05, 0.18] }
];

const DEFAULT_PALETTE = {
  paper: '#efe2cf',
  paperShadow: '#d1bfa6',
  edge: '#b6936a',
  ink: '#2f241b',
  brass: '#b38a5a'
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

function usePalette() {
  const [palette, setPalette] = useState(DEFAULT_PALETTE);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const updatePalette = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setPalette(
        isDark
          ? {
              paper: '#3a3128',
              paperShadow: '#2c241e',
              edge: '#78634c',
              ink: '#f3e6d6',
              brass: '#b38a5a'
            }
          : DEFAULT_PALETTE
      );
    };

    updatePalette();

    const observer = new MutationObserver(updatePalette);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return palette;
}

function ArchiveAtmosphere({
  progress,
  reduceMotion,
  isVisible,
  palette
}: {
  progress: number;
  reduceMotion: boolean;
  isVisible: boolean;
  palette: typeof DEFAULT_PALETTE;
}) {
  const group = useRef<Group>(null);
  const { invalidate } = useThree();

  const t = clamp(progress, 0, 1);
  const rotationY = lerp(-0.12, 0.12, t);
  const rotationX = lerp(0.06, -0.06, t);
  const positionY = lerp(0.08, -0.08, t);
  const positionZ = lerp(0.08, -0.08, t);

  useEffect(() => {
    if (!group.current) {
      return;
    }

    group.current.rotation.set(rotationX, rotationY, 0);
    group.current.position.set(0, positionY, positionZ);

    if (!reduceMotion && isVisible) {
      invalidate();
    }
  }, [invalidate, isVisible, positionY, positionZ, reduceMotion, rotationX, rotationY]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    invalidate();
  }, [invalidate, isVisible]);

  const cardMaterial = useMemo(
    () => ({
      color: palette.paper,
      roughness: 0.85,
      metalness: 0.05,
      transparent: true,
      opacity: 0.2
    }),
    [palette.paper]
  );

  const spineMaterial = useMemo(
    () => ({
      color: palette.edge,
      roughness: 0.7,
      metalness: 0.12,
      transparent: true,
      opacity: 0.22
    }),
    [palette.edge]
  );

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0.02, -0.08, 0]}>
      {CARD_SPECS.map((card, index) => (
        <mesh
          key={`archive-card-${index}`}
          position={card.position}
          rotation={card.rotation}
          scale={card.scale}
        >
          <boxGeometry args={[1.2, 0.72, 0.04]} />
          <meshStandardMaterial {...cardMaterial} />
        </mesh>
      ))}

      {SPINE_SPECS.map((spine, index) => (
        <mesh key={`archive-spine-${index}`} position={spine.position} rotation={spine.rotation}>
          <boxGeometry args={spine.scale} />
          <meshStandardMaterial {...spineMaterial} />
        </mesh>
      ))}

      <mesh position={[0.1, -1.1, -2.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 32]} />
        <meshStandardMaterial color={palette.ink} transparent opacity={0.08} />
      </mesh>

      <mesh position={[-0.35, 0.5, -0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={palette.brass} transparent opacity={0.32} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0.8, -0.2, -1.1]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={palette.brass} transparent opacity={0.28} roughness={0.35} metalness={0.5} />
      </mesh>
    </group>
  );
}

const isShim = Boolean((Fiber as { __r3fShim?: boolean }).__r3fShim);

export const r3fAvailable = !isShim;

export function BackgroundSceneImpl({
  reduceMotion,
  progress,
  isVisible,
  onReady
}: {
  reduceMotion: boolean;
  progress: number;
  isVisible: boolean;
  onReady?: () => void;
}) {
  if (!r3fAvailable) {
    return null;
  }

  const palette = usePalette();

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="demand"
        onCreated={() => onReady?.()}
      >
        <ambientLight intensity={0.7} color={palette.paperShadow} />
        <directionalLight position={[3, 2, 4]} intensity={0.8} color={palette.paper} />
        <directionalLight position={[-4, -2, 1]} intensity={0.35} color={palette.brass} />
        <ArchiveAtmosphere progress={progress} reduceMotion={reduceMotion} isVisible={isVisible} palette={palette} />
      </Canvas>
    </div>
  );
}
