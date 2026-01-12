declare module '@react-three/fiber' {
  type ComponentType<P = Record<string, unknown>> = import('react').ComponentType<P>;

  export const Canvas: ComponentType<Record<string, unknown>>;
  export function useFrame(callback?: (state: { clock: { getElapsedTime(): number } }) => void): void;
  export function useThree(): { invalidate: () => void };
  export const __r3fShim: boolean;
}

declare namespace JSX {
  interface IntrinsicElements {
    ambientLight: any;
    boxGeometry: any;
    directionalLight: any;
    group: any;
    mesh: any;
    meshStandardMaterial: any;
    planeGeometry: any;
  }
}
