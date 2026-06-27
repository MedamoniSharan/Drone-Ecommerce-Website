import React, { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js';

let scriptPromise: Promise<void> | null = null;

function loadPlayer(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.customElements?.get('lottie-player')) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load lottie-player'));
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let element: HTMLElement | null = null;
    let cancelled = false;

    loadPlayer()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        element = document.createElement('lottie-player');
        element.setAttribute('src', src);
        if (autoplay) element.setAttribute('autoplay', '');
        if (loop) element.setAttribute('loop', '');
        element.setAttribute('background', 'transparent');
        element.style.width = '100%';
        element.style.height = '100%';
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(element);
      })
      .catch(() => {
        /* CDN unavailable — fail silently */
      });

    return () => {
      cancelled = true;
      element?.remove();
    };
  }, [src, loop, autoplay]);

  return <div ref={containerRef} className={className} />;
}
