"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowRight, Globe, Apple } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

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
/* PHONE FRAME                                                         */
/* ================================================================== */

function PhoneFrame() {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-8 bg-white/[0.02] rounded-[3rem] blur-3xl pointer-events-none" />

      {/* Phone body */}
      <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/[0.1] bg-black p-1.5">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden bg-black">
          <AutoVideo
            src="/videos/PRACTAPP.mp4"
            className="aspect-[9/19.5]"
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* FEATURE CARDS -- scroll past the sticky phone                       */
/* ================================================================== */

const features = [
  {
    title: "8 Practice Modes",
    desc: "Contextual modes for translation, pronunciation, listening, and free speaking — each targeting different language skills.",
  },
  {
    title: "Real-Time AI Feedback",
    desc: "NLP validation pipeline using OpenAI with chain-of-thought prompting delivers instant pronunciation and grammar analysis.",
  },
  {
    title: "4 Cloud AI Services",
    desc: "OpenAI, Google Cloud TTS, AssemblyAI, and Expo Speech orchestrated into a unified multilingual pipeline.",
  },
  {
    title: "Streak Gamification",
    desc: "Daily streaks, progress tracking, and achievements keep learners motivated and consistent.",
  },
  {
    title: "7+ Languages",
    desc: "English, Spanish, French, German, Portuguese, Russian, Ukrainian — with 1,000+ sentences per language.",
  },
];

function FeatureCard({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: EASE,
      }}
      className="group relative pl-6 border-l border-white/[0.08] hover:border-white/[0.2] transition-colors duration-500"
    >
      <div
        className="absolute left-0 top-0 w-px h-0 bg-white/40
                   group-hover:h-full transition-all duration-700 ease-out"
      />
      <h3 className="text-lg sm:text-xl font-semibold text-white/80 tracking-tight group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 text-sm sm:text-base text-white/35 leading-relaxed font-light group-hover:text-white/50 transition-colors duration-300">
        {desc}
      </p>
    </motion.div>
  );
}

/* ================================================================== */
/* EXTERNAL LINKS (website + App Store)                                */
/* ================================================================== */

function ExternalLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      className="flex flex-wrap items-center gap-4"
    >
      <a
        href="https://www.usepractapp.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-4 py-2 rounded-full
                   bg-white/[0.04] border border-white/[0.08]
                   hover:bg-white/[0.08] hover:border-white/[0.15]
                   transition-all duration-300"
      >
        <Globe className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
        <span className="text-xs text-white/40 tracking-wider uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
          usepractapp.com
        </span>
      </a>
      <a
        href="https://apps.apple.com/us/app/practapp/id6749087301"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-4 py-2 rounded-full
                   bg-white/[0.04] border border-white/[0.08]
                   hover:bg-white/[0.08] hover:border-white/[0.15]
                   transition-all duration-300"
      >
        <Apple className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
        <span className="text-xs text-white/40 tracking-wider uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
          App Store
        </span>
      </a>
    </motion.div>
  );
}

/* ================================================================== */
/* DESKTOP: STICKY PHONE + SCROLLING FEATURES                          */
/* ================================================================== */

function DesktopLayout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Subtle 3D tilt that eases to flat as user scrolls through */
  const rotateY = useTransform(scrollYProgress, [0.1, 0.4], [8, 0]);
  const phoneScale = useTransform(scrollYProgress, [0.1, 0.35], [0.9, 1]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          {/* Personal project badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] sm:text-xs text-white/30 tracking-[0.2em] uppercase font-medium">
                Personal Project
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-white/15 tracking-[0.2em] uppercase font-medium">
              June 2024 &ndash; August 2025
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white/90 tracking-tight leading-none"
          >
            PRACTAPP
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-4 text-lg sm:text-xl text-white/30 font-light tracking-wide"
          >
            Practice Any Language — AI-powered fluency training
          </motion.p>

          {/* Links */}
          <div className="mt-6">
            <ExternalLinks />
          </div>
        </div>

        {/* Two-column: sticky phone + scrolling features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: sticky phone */}
          <div className="lg:sticky lg:top-24 flex justify-center">
            <motion.div
              style={{
                rotateY,
                scale: phoneScale,
                transformPerspective: 1200,
              }}
              className="w-[240px] sm:w-[260px] lg:w-[280px]"
            >
              <PhoneFrame />
            </motion.div>
          </div>

          {/* Right: scrolling feature cards + CTA */}
          <div className="space-y-10 sm:space-y-12 lg:pt-8">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-base sm:text-lg text-white/40 leading-relaxed font-light"
            >
              A full-stack mobile app that transforms language knowledge into
              spoken fluency. Built from scratch with React Native, a
              Node.js/Express backend, and a real-time AI pipeline that listens,
              analyzes, and coaches.
            </motion.p>

            {/* Feature cards */}
            <div className="space-y-8">
              {features.map((f, i) => (
                <FeatureCard key={f.title} index={i} {...f} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Link href="/work/practapp" scroll>
                <div
                  className="group inline-flex items-center gap-3 px-8 py-4
                             border border-white/[0.1] rounded-full overflow-hidden relative
                             hover:border-white/[0.25] transition-all duration-500 cursor-pointer"
                >
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
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* MOBILE: STACKED LAYOUT                                              */
/* ================================================================== */

function MobileLayout() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />

      <div className="px-5 sm:px-6">
        {/* Personal project badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">
              Personal Project
            </span>
          </div>
          <span className="text-[10px] text-white/15 tracking-[0.2em] uppercase font-medium">
            2024 &ndash; 2025
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-5xl sm:text-6xl font-extrabold text-white/90 tracking-tight leading-none"
        >
          PRACTAPP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-3 text-base text-white/30 font-light tracking-wide"
        >
          Practice Any Language
        </motion.p>

        <div className="mt-5">
          <ExternalLinks />
        </div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <div className="w-[220px] sm:w-[250px]">
            <PhoneFrame />
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-14 space-y-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} index={i} {...f} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <Link href="/work/practapp" scroll>
            <div
              className="group inline-flex items-center gap-3 px-8 py-4
                         border border-white/[0.1] rounded-full overflow-hidden relative
                         hover:border-white/[0.25] transition-all duration-500 cursor-pointer"
            >
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
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* MAIN EXPORT                                                         */
/* ================================================================== */

export default function PractAppSection() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopLayout />
      </div>
      <div className="lg:hidden">
        <MobileLayout />
      </div>
    </>
  );
}
