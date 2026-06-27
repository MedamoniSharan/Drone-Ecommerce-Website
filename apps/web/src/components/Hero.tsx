import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
}

const slides: Slide[] = [
  {
    badge: 'New Release',
    title: 'Mavic 3 Pro',
    subtitle: 'Inspiration in Focus',
    description:
      'Triple-camera system. A new era of camera drones with three sensors and lenses at different focal lengths.',
    cta: 'Shop Now',
    image: 'https://raw.createusercontent.com/bc0a5f67-1d18-4dc6-958a-b4800c9cc1b1/',
  },
  {
    badge: 'Adventure Ready',
    title: 'DJI Air 3',
    subtitle: 'Dual Cameras, Double Vision',
    description:
      'A wide-angle and a 3x medium tele camera, giving you more creative freedom in a compact, foldable body.',
    cta: 'Explore Air 3',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=2000',
  },
  {
    badge: 'Pocket Sized',
    title: 'Osmo Pocket 3',
    subtitle: 'Cinematic in Your Hand',
    description:
      'A 1-inch CMOS sensor and 3-axis mechanical stabilization in your pocket. Capture stunning footage anywhere.',
    cta: 'Discover Pocket 3',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
  },
];

const AUTO_SCROLL_INTERVAL = 5000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, AUTO_SCROLL_INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-[70vh] min-h-[460px] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Background banner */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* Side navigation arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-cyan-500' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
