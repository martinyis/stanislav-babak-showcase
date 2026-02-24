"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Brain, Layers, Zap, Shield, ArrowRight } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const TASKMIND_LETTERS = "TASKMIND".split("");

/* ================================================================== */
/* STAGGER LETTER REVEAL (viewport-triggered, NOT scroll-linked)      */
/* ================================================================== */

function StaggerTitle() {
  return (
    <div
      className="flex items-center justify-center gap-[0.05em] sm:gap-[0.12em] md:gap-[0.2em]"
      aria-label="TASKMIND"
    >
      {TASKMIND_LETTERS.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.3 + i * 0.06,
            ease: EASE,
          }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[9rem] font-extrabold text-white/90 leading-none select-none tracking-tight"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

/* ================================================================== */
/* SILENT AUTO-PLAY VIDEO                                              */
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
/* FLOATING STAT CARD                                                  */
/* ================================================================== */

const floatingCards = [
  {
    icon: Brain,
    value: "10+",
    label: "Report Types",
    position: "top-left" as const,
    delay: 0,
    bobDuration: 4.5,
  },
  {
    icon: Layers,
    value: "50+",
    label: "API Endpoints",
    position: "top-right" as const,
    delay: 0.15,
    bobDuration: 5.2,
  },
  {
    icon: Zap,
    value: "3",
    label: "AI Models",
    position: "bottom-left" as const,
    delay: 0.3,
    bobDuration: 3.8,
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime",
    position: "bottom-right" as const,
    delay: 0.45,
    bobDuration: 4.1,
  },
];

const positionClasses = {
  "top-left": "-top-4 -left-4 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-12",
  "top-right": "-top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-12",
  "bottom-left": "-bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-12",
  "bottom-right": "-bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-12",
} as const;

function FloatingCard({
  icon: Icon,
  value,
  label,
  position,
  delay,
  bobDuration,
}: (typeof floatingCards)[number]) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={`absolute z-10 ${positionClasses[position]}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: bobDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3
                   bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl
                   shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
      >
        <Icon className="w-4 h-4 text-white/30 flex-shrink-0" />
        <div>
          <div className="text-sm sm:text-base font-semibold text-white/80 leading-none tabular-nums">
            {value}
          </div>
          <div className="text-[10px] sm:text-xs text-white/30 font-medium mt-0.5">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/* VIDEO WITH FLOATING CARDS                                           */
/* ================================================================== */

function VideoWithCards() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[70%] bg-white/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Floating cards -- hidden on small screens to avoid overlap */}
        <div className="hidden md:block">
          {floatingCards.map((card) => (
            <FloatingCard key={card.label} {...card} />
          ))}
        </div>

        {/* Browser-framed video */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] video-glow bg-black">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-xs h-5 rounded-md bg-white/[0.04] flex items-center justify-center">
                <span className="text-[10px] text-white/20 tracking-wider font-medium">
                  taskmind.ai
                </span>
              </div>
            </div>
            <div className="w-14" />
          </div>
          <AutoVideo src="/videos/TASKMIND.mp4" className="aspect-video" />
        </div>

        {/* Mobile: show cards below video as a row */}
        <div className="flex md:hidden flex-wrap justify-center gap-3 mt-6">
          {floatingCards.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: card.delay, ease: EASE }}
              className="flex items-center gap-2 px-3 py-2
                         bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-lg"
            >
              <card.icon className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
              <div className="text-xs font-semibold text-white/70 tabular-nums">
                {card.value}
              </div>
              <div className="text-[10px] text-white/30">{card.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* SLIDE CTA -- horizontal pill with slide-fill hover                  */
/* ================================================================== */

function SlideCTA() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/work/taskmind" scroll>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="group relative inline-flex items-center gap-3 px-8 py-4
                     border border-white/[0.1] rounded-full overflow-hidden
                     hover:border-white/[0.25] transition-all duration-500 cursor-pointer"
        >
          {/* Sliding background fill on hover */}
          <div
            className="absolute inset-0 bg-white/[0.05]
                        -translate-x-full group-hover:translate-x-0
                        transition-transform duration-500 ease-out"
          />

          <span
            className="relative z-10 text-sm text-white/50 tracking-[0.2em] uppercase font-medium
                        group-hover:text-white/80 transition-colors duration-300"
          >
            See Full Project
          </span>

          <ArrowRight
            className="relative z-10 w-4 h-4 text-white/30
                        group-hover:text-white/70 group-hover:translate-x-1
                        transition-all duration-300"
          />
        </motion.div>
      </Link>
    </div>
  );
}

/* ================================================================== */
/* DESKTOP: HORIZONTAL SCROLL LAYOUT                                   */
/* ================================================================== */

function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Map vertical scroll to horizontal position using vw units so the
     transform is always relative to the viewport, not the element width.
     Panel 1 at 0vw, Panel 2 at -100vw, Panel 3 at -200vw. */
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  /* Convert horizontal trackpad / mouse scroll into vertical page scroll
     so the user can swipe left/right (or scroll horizontally) to navigate
     panels, and scroll back the same way. */
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      /* Only intercept when there's meaningful horizontal delta
         (trackpad two-finger horizontal swipe or shift+scroll) */
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();
      window.scrollBy({ top: e.deltaX, behavior: "instant" });
    },
    []
  );

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />

        <motion.div
          style={{ x }}
          className="flex h-full w-[300vw]"
        >
          {/* Panel 1: Title */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-4 sm:mb-6 flex items-center gap-3"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="w-8 h-px bg-white/15 origin-left"
              />
              <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
                Team Lead Software Engineer / Startup
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="w-8 h-px bg-white/15 origin-right"
              />
            </motion.div>

            <StaggerTitle />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              className="mt-4 sm:mt-6 text-sm sm:text-base text-white/25 tracking-[0.3em] uppercase font-light"
            >
              AI-Powered Research Platform
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <span className="text-[10px] text-white/15 tracking-[0.3em] uppercase">
                Scroll
              </span>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-3 h-3 text-white/15" />
              </motion.div>
            </motion.div>
          </div>

          {/* Panel 2: Video + Floating Cards */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-24">
            <VideoWithCards />
          </div>

          {/* Panel 3: CTA */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center px-6 gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg sm:text-xl md:text-2xl text-white/30 font-light text-center max-w-lg leading-relaxed"
            >
              Full-stack AI SaaS platform automating market intelligence with
              multi-model orchestration and RAG pipelines.
            </motion.p>
            <SlideCTA />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-2 text-[10px] text-white/[0.06] tracking-[0.4em] uppercase font-bold"
            >
              TASKMIND
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* MOBILE: VERTICAL STACKED LAYOUT                                     */
/* ================================================================== */

function VerticalLayout() {
  return (
    <section className="relative py-16 sm:py-24">
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
          Team Lead Software Engineer / Startup
        </span>
      </motion.div>

      {/* Title */}
      <div className="mb-3 sm:mb-4">
        <StaggerTitle />
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-center text-sm sm:text-base text-white/25 tracking-[0.3em] uppercase font-light mb-16 sm:mb-24"
      >
        AI-Powered Research Platform
      </motion.p>

      {/* Video showcase */}
      <div className="px-4 sm:px-6">
        <VideoWithCards />
      </div>

      {/* CTA */}
      <div className="mt-12 sm:mt-16">
        <SlideCTA />
      </div>
    </section>
  );
}

/* ================================================================== */
/* MAIN EXPORT -- responsive switch                                    */
/* ================================================================== */

export default function TaskMindSection() {
  return (
    <>
      {/* Desktop: horizontal scroll */}
      <div className="hidden lg:block">
        <HorizontalScroll />
      </div>
      {/* Mobile/tablet: vertical stacked */}
      <div className="lg:hidden">
        <VerticalLayout />
      </div>
    </>
  );
}
