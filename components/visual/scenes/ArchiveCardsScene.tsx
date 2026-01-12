'use client';

import { Center } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

const CARD_SPECS = [
  { position: [0, 0, 0] as const, rotation: [0.05, -0.2, 0.02] as const },
  { position: [0.12, 0.08, -0.08] as const, rotation: [0.08, -0.12, -0.03] as const },
  { position: [-0.1, -0.06, -0.16] as const, rotation: [0.02, -0.05, 0.04] as const },
  { position: [0.06, -0.14, -0.24] as const, rotation: [0.06, 0.05, -0.02] as const },
  { position: [-0.08, 0.16, -0.32] as const, rotation: [-0.02, 0.1, 0.01] as const }
];

const DEFAULT_PALETTE = {
  paper: '#efe2cf',
  paperShadow: '#d1bfa6',
  edge: '#b6936a',
  ink: '#2f241b',
  brass: '#b38a5a'
};

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

function ArchiveCards({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<Group>(null);
  const palette = usePalette();
  const { invalidate } = useThree();

  useEffect(() => {
    if (!reduceMotion) {
      invalidate();
    }
  }, [invalidate, reduceMotion]);

  useFrame(({ clock }) => {
    if (!group.current) {
      return;
    }

    if (!reduceMotion) {
      const time = clock.getElapsedTime();
      group.current.rotation.y = Math.sin(time / 14) * 0.08;
      group.current.rotation.x = Math.sin(time / 18) * 0.05;
      group.current.position.y = Math.sin(time / 16) * 0.08;
      invalidate();
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0.02, -0.12, 0]}>
      <mesh position={[0, -0.58, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.6]} />
        <meshStandardMaterial color={palette.ink} transparent opacity={0.18} />
      </mesh>

      {CARD_SPECS.map((card, index) => (
        <group key={`card-${index}`} position={card.position} rotation={card.rotation}>
          <mesh>
            <boxGeometry args={[1.4, 0.85, 0.04]} />
            <meshStandardMaterial color={palette.paper} roughness={0.8} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <boxGeometry args={[1.42, 0.87, 0.01]} />
            <meshStandardMaterial color={palette.edge} roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.18, 0.03]}>
            <boxGeometry args={[0.8, 0.02, 0.01]} />
            <meshStandardMaterial color={palette.brass} roughness={0.4} metalness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function ArchiveCardsScene({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const palette = usePalette();

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 4.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="demand"
    >
      <ambientLight intensity={0.7} color={palette.paperShadow} />
      <directionalLight position={[3, 2, 4]} intensity={0.9} color={palette.paper} />
      <directionalLight position={[-4, -2, 1]} intensity={0.35} color={palette.brass} />
      <Center>
        <ArchiveCards reduceMotion={reduceMotion} />
      </Center>
    </Canvas>
  );
}
