declare module '@react-three/drei' {
  type ComponentType<P = Record<string, unknown>> = import('react').ComponentType<P>;
  type PropsWithChildren<P = Record<string, unknown>> = import('react').PropsWithChildren<P>;

  export const Center: ComponentType<PropsWithChildren>;
}
