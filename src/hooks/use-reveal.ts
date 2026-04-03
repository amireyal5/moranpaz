
"use client";

import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // Once revealed, we don't need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.05, // Trigger earlier for better UX
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}
