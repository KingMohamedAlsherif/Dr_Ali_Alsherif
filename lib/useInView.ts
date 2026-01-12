'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const observerOptions = useMemo(
    () => ({
      root: options?.root ?? null,
      rootMargin: options?.rootMargin ?? '0px',
      threshold: options?.threshold ?? 0
    }),
    [options?.root, options?.rootMargin, options?.threshold]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, observerOptions);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [observerOptions]);

  return { ref, inView };
}
