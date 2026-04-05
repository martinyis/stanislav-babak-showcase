"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
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

const AIRFARE_LETTERS = "AIRFARE".split("");

const contributions = [
  {
    num: "01",
    title: "Flexible Date Search Engine",
    desc: "Built a multi-date search engine that generates and queries up to 200+ date combinations per search, with smart batching and caching to reduce API costs by 90%.",
  },
  {
    num: "02",
    title: "Automated Price Tracking",
    desc: "Engineered automated price tracking with 4-hour check intervals, push notification alerts when prices drop below user-set thresholds, and historical price trend visualization.",
  },
  {
    num: "03",
    title: "Credits & Monetization System",
    desc: "Implemented a full credits economy with Apple In-App Purchase integration, 50 free starter credits, usage metering per search, and server-side receipt validation.",
  },
  {
    num: "04",
    title: "Full-Stack Architecture",
    desc: "Architected the complete stack with React Native/Expo frontend, Node.js/Express API, PostgreSQL with Prisma ORM, JWT authentication, and Zod request validation.",
  },
  {
    num: "05",
    title: "Flight Data Pipeline",
    desc: "Built a flight data pipeline integrating SerpAPI with 1,488 airline mappings, structured parsing of complex multi-leg itineraries, and intelligent result ranking.",
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Date Combos" },
  { value: 90, suffix: "%", label: "API Cost Reduced" },
  { value: 4, suffix: "hr", label: "Price Checks" },
  { value: 1488, suffix: "", label: "Airlines Mapped" },
  { value: 50, suffix: "", label: "Free Credits" },
];

const techTags = [
  "React Native",
  "Expo",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "JWT",
  "SerpAPI",
  "Apple IAP",
  "Push Notifications",
  "Zod",
  "Vitest",
];

const screenshots = [
  { src: "/images/skylens-home.png", alt: "Home Screen" },
  { src: "/images/skylens-dates.png", alt: "Date Selection" },
  { src: "/images/skylens-results.png", alt: "Search Results" },
  { src: "/images/skylens-tracking.png", alt: "Price Tracking" },
  { src: "/images/skylens-price-history.png", alt: "Price History" },
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
      aria-label="AIRFARE"
    >
      {AIRFARE_LETTERS.map((letter, i) => {
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
/* PHONE SCREENSHOT                                                    */
/* ================================================================== */

function PhoneScreenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
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
          <Image
            src={src}
            alt={alt}
            width={390}
            height={844}
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

export default function AirfareCaseStudy() {
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
              iOS App / 2025
            </span>
          </motion.div>

          <LetterReveal scrollYProgress={letterProgress} />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 sm:mt-8 text-sm sm:text-base text-white/25 tracking-[0.3em] uppercase font-light"
          >
            Find the Cheapest Flights
          </motion.p>
        </div>

        {/* -------------------------------------------------------- */}
        {/* PHONE SCREENSHOTS                                        */}
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
          <PhoneScreenshot src="/images/skylens-home.png" alt="Airfare home screen" />

          {/* Screenshot gallery */}
          <div className="mt-16 sm:mt-24 max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
            {/* Desktop: scrollable row */}
            <div className="hidden md:flex gap-8 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {screenshots.map((shot, i) => (
                <motion.div
                  key={shot.src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className="flex-shrink-0"
                  style={{ width: 220 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-white/[0.02] rounded-[2rem] blur-2xl pointer-events-none" />
                    <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/[0.1] bg-black p-1">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl z-10" />
                      <div className="rounded-[1.5rem] overflow-hidden bg-black">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={390}
                          height={844}
                          className="w-full aspect-[9/19.5] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-white/25 tracking-wider uppercase font-medium">
                    {shot.alt}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile: 2-column grid with 5th centered */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-4">
                {screenshots.slice(0, 4).map((shot, i) => (
                  <motion.div
                    key={shot.src}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  >
                    <div className="relative">
                      <div className="relative rounded-[1.5rem] overflow-hidden border-2 border-white/[0.1] bg-black p-1">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-b-lg z-10" />
                        <div className="rounded-[1.2rem] overflow-hidden bg-black">
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            width={390}
                            height={844}
                            className="w-full aspect-[9/19.5] object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-center text-[10px] text-white/25 tracking-wider uppercase font-medium">
                      {shot.alt}
                    </p>
                  </motion.div>
                ))}
              </div>
              {/* 5th screenshot centered */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="mt-4 flex justify-center"
              >
                <div style={{ width: "50%" }}>
                  <div className="relative">
                    <div className="relative rounded-[1.5rem] overflow-hidden border-2 border-white/[0.1] bg-black p-1">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-b-lg z-10" />
                      <div className="rounded-[1.2rem] overflow-hidden bg-black">
                        <Image
                          src={screenshots[4].src}
                          alt={screenshots[4].alt}
                          width={390}
                          height={844}
                          className="w-full aspect-[9/19.5] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-white/25 tracking-wider uppercase font-medium">
                    {screenshots[4].alt}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
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
                &ldquo;Smart Flight Search,
                <br />
                Simplified&rdquo;
              </p>
              <div className="mt-6 sm:mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-white/15" />
                <span className="text-xs sm:text-sm text-white/30 tracking-wider uppercase font-medium">
                  Airfare
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
                Built a complete flight search platform from the ground up
                &mdash; a React Native app that searches across flexible date
                combinations, tracks prices automatically, and helps travelers
                find the cheapest flights with smart filtering and historical
                price data.
              </p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/45 leading-relaxed font-light">
                Engineered the full backend with Node.js/Express and PostgreSQL,
                integrated SerpAPI for real-time flight data, implemented Apple
                In-App Purchases for a credits economy, and built automated
                price tracking with push notifications.
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
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="https://github.com/martinyis/flight-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3
                           border border-white/[0.12] rounded-full
                           hover:border-white/[0.3] hover:bg-white/[0.05]
                           transition-all duration-400"
              >
                <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-xs sm:text-sm text-white/40 tracking-[0.15em] uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
                  View Source
                </span>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
