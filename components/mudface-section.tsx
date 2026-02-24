"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  MotionValue,
} from "framer-motion";

/* ================================================================== */
/* LETTER REVEAL -- scroll-linked ghost letters (matches case study)  */
/* ================================================================== */

const MUDFACE_LETTERS = "MUDFACE".split("");

function LetterReveal({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div
      className="flex items-center justify-center gap-[0.1em] sm:gap-[0.2em] md:gap-[0.3em]"
      aria-label="MUDFACE"
    >
      {MUDFACE_LETTERS.map((letter, i) => {
        const start = i * 0.08;
        const end = start + 0.15;
        return (
          <LetterChar
            key={i}
            letter={letter}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </div>
  );
}

function LetterChar({
  letter,
  scrollYProgress,
  start,
  end,
}: {
  letter: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);
  const blur = useTransform(scrollYProgress, [start, end], [12, 0]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.span
      style={{ opacity, y: springY, filter: filterBlur }}
      className="text-4xl sm:text-6xl md:text-7xl lg:text-[9rem] font-extrabold text-white/[0.06] leading-none select-none tracking-tight"
    >
      {letter}
    </motion.span>
  );
}

/* ================================================================== */
/* SILENT AUTO-PLAY VIDEO (shared helper)                             */
/* ================================================================== */

function AutoVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-5% 0px -5% 0px" });

  useEffect(() => {
    if (!ref.current) return;
    if (isInView) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ================================================================== */
/* MAGNETIC CTA -- the creative "learn more" interaction              */
/*                                                                    */
/* A circular element that follows the cursor with a spring-physics   */
/* magnetic pull when hovering over the teaser. It grows, glows, and  */
/* reveals the text "Explore" as the cursor approaches. Clicking it   */
/* navigates to the case study page.                                  */
/* ================================================================== */

function MagneticExplore() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Raw mouse position relative to the container center */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Spring-smoothed position for the magnetic pull */
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  /* Scale and glow intensity based on proximity */
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      /* Offset from center, capped to a max displacement */
      const maxPull = 60;
      const rawX = e.clientX - centerX;
      const rawY = e.clientY - centerY;
      const dist = Math.sqrt(rawX * rawX + rawY * rawY);
      const clamp = Math.min(dist, maxPull) / (dist || 1);

      mouseX.set(rawX * clamp * 0.4);
      mouseY.set(rawY * clamp * 0.4);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  }, [mouseX, mouseY]);

  /* Derived transforms */
  const scale = useTransform(
    [x, y] as [typeof x, typeof y],
    ([latestX, latestY]: [number, number]) => {
      const dist = Math.sqrt(latestX * latestX + latestY * latestY);
      return 1 + dist * 0.004;
    }
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center py-8 sm:py-12"
    >
      <Link href="/work/mudface" scroll>
        <motion.div
          style={{ x, y, scale }}
          className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 cursor-pointer"
        >
          {/* Outer glow ring */}
          <motion.div
            animate={{
              opacity: isHovering ? 0.12 : 0.04,
              scale: isHovering ? 1.3 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.02]"
          />

          {/* Inner circle */}
          <motion.div
            animate={{
              backgroundColor: isHovering
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.03)",
              borderColor: isHovering
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.4 }}
            className="relative flex items-center justify-center w-full h-full rounded-full border"
          >
            {/* Arrow + text */}
            <div className="flex flex-col items-center gap-1">
              <motion.span
                animate={{ y: isHovering ? -2 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[9px] sm:text-[10px] text-white/20 tracking-[0.2em] uppercase font-medium"
              >
                Explore
              </motion.span>
              <motion.span
                animate={{ y: isHovering ? -1 : 0, opacity: isHovering ? 0.8 : 0.5 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] sm:text-xs text-white/50 tracking-[0.25em] uppercase font-semibold"
              >
                MUDFACE
              </motion.span>
              <motion.svg
                animate={{
                  y: isHovering ? 3 : 0,
                  opacity: isHovering ? 0.7 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="text-white"
              >
                <path
                  d="M10 4L10 16M10 16L15 11M10 16L5 11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Rotating dashed orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-12px] sm:inset-[-16px] rounded-full border border-dashed border-white/[0.06]"
          />
        </motion.div>
      </Link>
    </div>
  );
}

/* ================================================================== */
/* VIDEO SHOWCASE LAYOUT                                              */
/*                                                                    */
/* Two videos in an asymmetric composition:                           */
/* - Large web app video spanning most of the width (browser frame)   */
/* - Native mobile app in a phone frame on the right, centered        */
/* On mobile, they stack vertically with the phone centered below.    */
/* ================================================================== */

function VideoShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
    >
      {/* Ambient glow behind the whole composition */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[70%] bg-white/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 sm:gap-8 items-center">
        {/* Main web platform video -- large, browser-framed */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] video-glow bg-black">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-xs h-5 rounded-md bg-white/[0.04] flex items-center justify-center">
                <span className="text-[10px] text-white/20 tracking-wider font-medium">
                  mudface.ai
                </span>
              </div>
            </div>
            <div className="w-14" />
          </div>
          <AutoVideo
            src="/videos/mudface-web.mp4"
            className="aspect-video"
          />
        </div>

        {/* Native app -- phone frame, vertically centered beside the browser */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-[180px] lg:max-w-[200px] mx-auto">
            <div className="rounded-[1.5rem] overflow-hidden border-2 border-white/[0.1] bg-black p-1">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-10" />
              <div className="rounded-[1.2rem] overflow-hidden">
                <AutoVideo
                  src="/videos/mudface-native.mp4"
                  className="aspect-[9/19.5]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/* MAIN TEASER SECTION                                                */
/* ================================================================== */

export default function MudfaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: letterProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24">
      <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4 sm:mb-6"
      >
        <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
          Internship / 2025
        </span>
      </motion.div>

      {/* Title -- scroll-linked ghost letter reveal (same style as case study, smaller) */}
      <div className="mb-3 sm:mb-4">
        <LetterReveal scrollYProgress={letterProgress} />
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-center text-sm sm:text-base text-white/25 tracking-[0.3em] uppercase font-light mb-16 sm:mb-24"
      >
        Your AI Esthetician
      </motion.p>

      {/* Video showcase */}
      <VideoShowcase />

      {/* Magnetic explore CTA */}
      <div className="mt-12 sm:mt-16">
        <MagneticExplore />
      </div>
    </section>
  );
}
