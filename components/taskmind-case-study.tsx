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
import { ArrowLeft } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* ================================================================== */
/* DATA                                                                */
/* ================================================================== */

const TASKMIND_LETTERS = "TASKMIND".split("");

const contributions = [
  {
    num: "01",
    title: "Full-Stack SaaS Architecture",
    desc: "Led system design and architecture of a full-stack AI SaaS platform with Next.js, Node.js/Express, TypeScript, and MongoDB, designing 50+ RESTful API endpoints, multi-tenant data isolation, and role-based access control with JWT authentication.",
  },
  {
    num: "02",
    title: "Multi-Model AI Orchestration",
    desc: "Engineered a multi-model AI orchestration layer integrating Google Gemini, Perplexity AI, and OpenAI APIs to automate company research, competitive analysis, and market intelligence generation.",
  },
  {
    num: "03",
    title: "RAG Pipeline & Intelligence Engine",
    desc: "Implemented a retrieval-augmented generation (RAG) pipeline that enriches LLM prompts with company profiles, historical report data, and industry context, producing citation-backed research outputs across 10+ report categories.",
  },
  {
    num: "04",
    title: "Stripe Subscription Infrastructure",
    desc: "Built end-to-end Stripe subscription infrastructure with tiered pricing, promotional codes, usage-based metering, and a customer self-service portal, handling the full payment lifecycle for a multi-tenant SaaS product.",
  },
  {
    num: "05",
    title: "GCP Deployment & CI/CD",
    desc: "Deployed to Google Cloud Platform using App Engine with auto-scaling (1\u201310 instances) and established CI/CD pipelines via Cloud Build for automated TypeScript compilation, health checks, and zero-downtime production deployments.",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "API Endpoints" },
  { value: 10, suffix: "+", label: "Report Categories" },
  { value: 3, suffix: "", label: "AI Models Integrated" },
  { value: 10, suffix: "", label: "Auto-Scale Instances" },
  { value: 100, suffix: "%", label: "Uptime Target" },
];

const techTags = [
  "Next.js",
  "Node.js",
  "Express",
  "TypeScript",
  "MongoDB",
  "Google Gemini",
  "Perplexity AI",
  "OpenAI API",
  "Stripe",
  "GCP",
  "App Engine",
  "Cloud Build",
  "JWT Auth",
  "REST APIs",
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
      aria-label="TASKMIND"
    >
      {TASKMIND_LETTERS.map((letter, i) => {
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
/* BROWSER VIDEO                                                       */
/* ================================================================== */

function BrowserVideo({ src }: { src: string }) {
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
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE }}
      className="relative w-full"
    >
      <div className="absolute -inset-4 sm:-inset-8 bg-white/[0.015] rounded-3xl blur-3xl pointer-events-none" />
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
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full aspect-video object-cover"
        />
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

export default function TaskMindCaseStudy() {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 sm:mb-10"
          >
            <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
              Team Lead Software Engineer / Startup
            </span>
          </motion.div>

          <LetterReveal scrollYProgress={letterProgress} />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 sm:mt-8 text-sm sm:text-base text-white/25 tracking-[0.3em] uppercase font-light"
          >
            AI-Powered Research Platform
          </motion.p>
        </div>

        {/* -------------------------------------------------------- */}
        {/* WEB PLATFORM VIDEO                                       */}
        {/* -------------------------------------------------------- */}
        <div className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-20 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12 text-center"
          >
            <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium">
              Web Platform
            </span>
          </motion.div>
          <BrowserVideo src="/videos/TASKMIND.mp4" />
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
                &ldquo;AI-Powered Research
                <br />
                at Scale&rdquo;
              </p>
              <div className="mt-6 sm:mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-white/15" />
                <span className="text-xs sm:text-sm text-white/30 tracking-wider uppercase font-medium">
                  taskmind.ai
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <p className="text-base sm:text-lg text-white/45 leading-relaxed font-light">
                Led the architecture and full-stack development of an AI SaaS
                platform that automates company research and competitive
                analysis. Designed multi-model AI orchestration integrating
                Google Gemini, Perplexity AI, and OpenAI to generate
                citation-backed intelligence reports.
              </p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/45 leading-relaxed font-light">
                Built the complete infrastructure from JWT-authenticated REST
                APIs and multi-tenant data isolation to Stripe subscription
                billing and Google Cloud auto-scaling deployments.
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
        {/* BOTTOM NAV: Back to portfolio                            */}
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
