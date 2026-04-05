"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import CarouselSlide from "@/components/carousel-slide";
import IntroSlide from "@/components/intro-slide";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const total = projects.length + 1; // intro + projects

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      go(touchDelta.current < 0 ? 1 : -1);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "8%" : "-8%",
      opacity: 0,
      scale: 1.02,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-8%" : "8%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section
      id="hero-carousel"
      className="relative h-[100dvh] w-full overflow-hidden bg-black select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute inset-0"
        >
          {current === 0 ? (
            <IntroSlide />
          ) : (
            <CarouselSlide project={projects[current - 1]} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 items-center justify-center rounded-full
                   border border-white/[0.08] bg-black/30 backdrop-blur-sm
                   hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300
                   cursor-pointer"
      >
        <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 items-center justify-center rounded-full
                   border border-white/[0.08] bg-black/30 backdrop-blur-sm
                   hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300
                   cursor-pointer"
      >
        <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-400 cursor-pointer ${
              i === current
                ? "w-8 h-2 bg-white/60"
                : "w-2 h-2 bg-white/20 hover:bg-white/35"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-20">
        <span className="text-xs text-white/25 tracking-[0.2em] uppercase font-medium">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
