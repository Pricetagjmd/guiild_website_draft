import { useEffect, useRef } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

const useScrollReveal = <T extends HTMLElement>({ threshold = 0.15, rootMargin = '0px' }: RevealOptions = {}) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return ref;
};

export default useScrollReveal;
