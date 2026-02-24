"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowLeft, Globe, Apple } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* ================================================================== */
/* DATA                                                                */
/* ================================================================== */

const PRACTAPP_LETTERS = "PRACTAPP".split("");

const contributions = [
  {
    num: "01",
    title: "Performant Mobile UI",
    desc: "Developed a performant mobile UI with React Native, Zustand/Redux Toolkit, Reanimated animations, and NativeWind (Tailwind CSS), featuring 8 contextual practice modes, streak gamification, and progress tracking.",
  },
  {
    num: "02",
    title: "Real-Time NLP Pipeline",
    desc: "Engineered a real-time NLP validation pipeline using OpenAI with chain-of-thought prompting, reducing API calls ~60% via LRU caching.",
  },
  {
    num: "03",
    title: "Multilingual AI Orchestration",
    desc: "Orchestrated 4 cloud AI services (OpenAI, Google Cloud TTS, AssemblyAI, Expo Speech) into a unified multilingual pipeline.",
  },
  {
    num: "04",
    title: "Full-Stack Architecture",
    desc: "Architected a full-stack mobile app (React Native/Expo, Node.js/Express, MongoDB) with layered MVC services, centralized error handling, request validation, and 6-tier rate limiting (burst, auth, admin, upload).",
  },
  {
    num: "05",
    title: "Multi-Provider Authentication",
    desc: "Built multi-provider auth supporting Google OAuth 2.0, Apple Sign-In (JWT public key caching), and email OTP verification, secured with bcrypt-12, Helmet, MongoDB injection sanitization, and CORS whitelisting.",
  },
];

const stats = [
  { value: 8, suffix: "", label: "Practice Modes" },
  { value: 7, suffix: "+", label: "Languages" },
  { value: 1000, suffix: "+", label: "Sentences Per Language" },
  { value: 4, suffix: "", label: "AI Services Orchestrated" },
  { value: 60, suffix: "%", label: "API Calls Reduced" },
];

const techTags = [
  "React Native",
  "Expo",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Zustand",
  "Redux Toolkit",
  "Reanimated",
  "NativeWind",
  "OpenAI API",
  "Google Cloud TTS",
  "AssemblyAI",
  "Apple Sign-In",
  "Google OAuth",
];

/* ================================================================== */
/* ANIMATED COUNTER HOOK                                               */
/* ================================================================== */

function useAnimatedCounter(
  target: number,
  isInView: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

/* ================================================================== */
/* STAT CARD                                                           */
/* ================================================================== */

function StatCard({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useAnimatedCounter(value, isInView, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: EASE,
      }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white tabular-nums">
        {count.toLocaleString()}
        <span className="text-white/40">{suffix}</span>
      </div>
      <div className="mt-2 text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] font-medium">
        {label}
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/* CONTRIBUTION ROW                                                    */
/* ================================================================== */

function ContributionRow({
  num,
  title,
  desc,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: EASE,
      }}
      className="group grid grid-cols-[auto_1fr] gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 border-b border-white/[0.06] last:border-b-0
                 hover:border-white/[0.12] transition-colors duration-500"
    >
      <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
        <span
          className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white/[0.07] tabular-nums
                     group-hover:text-white/[0.15] transition-colors duration-500 leading-none select-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {num}
        </span>
        <span
          className="hidden sm:block w-8 md:w-12 h-px bg-white/10 mt-4
                     group-hover:w-16 md:group-hover:w-20 group-hover:bg-white/20
                     transition-all duration-500"
        />
      </div>
      <div className="min-w-0">
        <h3
          className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 tracking-tight
                     group-hover:text-white transition-colors duration-300"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-white/35 leading-relaxed max-w-2xl font-light group-hover:text-white/45 transition-colors duration-300">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/* LETTER-BY-LETTER REVEAL (scroll-linked)                             */
/* ================================================================== */

function LetterReveal({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div
      className="flex items-center justify-center gap-[0.1em] sm:gap-[0.2em] md:gap-[0.35em]"
      aria-label="PRACTAPP"
    >
      {PRACTAPP_LETTERS.map((letter, i) => {
        const start = i * 0.07;
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
      className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-extrabold text-white/[0.06] leading-none select-none tracking-tight"
    >
      {letter}
    </motion.span>
  );
}

/* ================================================================== */
/* PHONE VIDEO                                                         */
/* ================================================================== */

function PhoneVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (!ref.current) return;
    if (isInView) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE }}
      className="relative mx-auto"
      style={{ maxWidth: 320 }}
    >
      <div className="absolute -inset-6 bg-white/[0.02] rounded-[3rem] blur-3xl pointer-events-none" />
      <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/[0.1] bg-black p-1.5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10" />
        <div className="rounded-[2rem] overflow-hidden bg-black">
          <video
            ref={ref}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full aspect-[9/19.5] object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/* BACK NAVIGATION                                                     */
/* ================================================================== */

function BackNav() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50"
    >
      <Link
        href="/"
        className="group flex items-center gap-2 px-4 py-2 rounded-full
                   bg-white/[0.04] border border-white/[0.08] backdrop-blur-md
                   hover:bg-white/[0.08] hover:border-white/[0.15]
                   transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
        <span className="text-xs text-white/40 tracking-wider uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
          Back
        </span>
      </Link>
    </motion.div>
  );
}

/* ================================================================== */
/* MAIN CASE STUDY                                                     */
/* ================================================================== */

export default function PractAppCaseStudy() {
  const letterSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: letterProgress } = useScroll({
    target: letterSectionRef,
    offset: ["start end", "end center"],
  });

  return (
    <>
      <BackNav />

      <main className="relative">
        <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />

        {/* -------------------------------------------------------- */}
        {/* HERO: Letter-by-letter reveal                            */}
        {/* -------------------------------------------------------- */}
        <div
          ref={letterSectionRef}
          className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center py-24 sm:py-32"
        >
          {/* Personal project badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] sm:text-xs text-white/30 tracking-[0.2em] uppercase font-medium">
                Personal Project
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 sm:mb-10"
          >
            <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
              Mobile App / June 2024 &ndash; August 2025
            </span>
          </motion.div>

          <LetterReveal scrollYProgress={letterProgress} />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 sm:mt-8 text-sm sm:text-base text-white/25 tracking-[0.3em] uppercase font-light"
          >
            Practice Any Language
          </motion.p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="https://www.usepractapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-white/[0.04] border border-white/[0.08]
                         hover:bg-white/[0.08] hover:border-white/[0.15]
                         transition-all duration-300"
            >
              <Globe className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
              <span className="text-[10px] sm:text-xs text-white/40 tracking-wider uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
                usepractapp.com
              </span>
            </a>
            <a
              href="https://apps.apple.com/us/app/practapp/id6749087301"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-white/[0.04] border border-white/[0.08]
                         hover:bg-white/[0.08] hover:border-white/[0.15]
                         transition-all duration-300"
            >
              <Apple className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
              <span className="text-[10px] sm:text-xs text-white/40 tracking-wider uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
                App Store
              </span>
            </a>
          </motion.div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* PHONE VIDEO                                              */}
        {/* -------------------------------------------------------- */}
        <div className="pb-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14 text-center"
          >
            <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
              Mobile App
            </span>
          </motion.div>
          <PhoneVideo src="/videos/PRACTAPP.mp4" />
        </div>

        {/* -------------------------------------------------------- */}
        {/* DIVIDER                                                  */}
        {/* -------------------------------------------------------- */}
        <div className="flex justify-center pb-16 sm:pb-24">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: EASE }}
            className="w-24 sm:w-32 h-px section-divider origin-center"
          />
        </div>

        {/* -------------------------------------------------------- */}
        {/* TWO-COLUMN: Quote + Description                          */}
        {/* -------------------------------------------------------- */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pb-20 sm:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white/60 leading-snug italic">
                &ldquo;Turn Knowledge
                <br />
                into Fluency&rdquo;
              </p>
              <div className="mt-6 sm:mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-white/15" />
                <a
                  href="https://www.usepractapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-white/30 tracking-wider uppercase font-medium
                             hover:text-white/60 transition-colors duration-300"
                >
                  usepractapp.com
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <p className="text-base sm:text-lg text-white/45 leading-relaxed font-light">
                Built a complete language learning platform from the ground up
                &mdash; a React Native app with 8 practice modes, real-time AI
                speech analysis, and streak gamification that transforms passive
                vocabulary knowledge into spoken fluency.
              </p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/45 leading-relaxed font-light">
                Engineered the full backend with Node.js/Express and MongoDB,
                orchestrated 4 cloud AI services into a unified multilingual
                pipeline, and shipped to the App Store with multi-provider
                authentication and enterprise-grade security.
              </p>
            </motion.div>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* TECH STACK TAGS                                          */}
        {/* -------------------------------------------------------- */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 pb-20 sm:pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {techTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: EASE,
                }}
                className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white/50
                           border border-white/[0.08] rounded-full
                           hover:text-white/70 hover:border-white/20 transition-colors duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* STATS BAR                                                */}
        {/* -------------------------------------------------------- */}
        <div className="relative py-16 sm:py-24">
          <div className="absolute inset-x-0 top-0 h-px section-divider" />
          <div className="absolute inset-x-0 bottom-0 h-px section-divider" />

          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} index={i} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* NUMBERED CONTRIBUTIONS                                   */}
        {/* -------------------------------------------------------- */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 sm:mb-16"
          >
            <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
              What I Built
            </span>
          </motion.div>
          <div>
            {contributions.map((item, i) => (
              <ContributionRow key={item.num} index={i} {...item} />
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* BOTTOM NAV                                               */}
        {/* -------------------------------------------------------- */}
        <div className="pb-24 sm:pb-32">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-sm text-white/30 tracking-wider uppercase font-medium
                           hover:text-white/70 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
