"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function IntroSlide() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background: clean black with subtle radial glow */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, white 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content — horizontal on desktop, stacked on mobile */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-0 px-8 sm:px-12 md:px-0 w-full max-w-5xl">
        {/* Left: Large name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="flex-1 flex flex-col items-center md:items-end md:pr-10 lg:pr-14"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05] text-center md:text-right">
            STANISLAV
            <br />
            <span className="text-white/35">BABAK</span>
          </h1>
        </motion.div>

        {/* Vertical divider (hidden on mobile, horizontal line instead) */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="hidden md:block w-px h-40 lg:h-48 bg-white/15 origin-top"
        />
        {/* Horizontal divider on mobile */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="md:hidden w-16 h-px bg-white/15 origin-left"
        />

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="flex-1 flex flex-col items-center md:items-start md:pl-10 lg:pl-14 gap-4 sm:gap-5"
        >
          <span className="text-xs sm:text-sm text-white/40 tracking-[0.25em] uppercase font-medium">
            Software Engineer
          </span>

          <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.2em] uppercase">
            San Jose, CA &mdash; 2026
          </span>

          {/* Links */}
          <div className="flex items-center gap-5 mt-1">
            <a
              href="https://github.com/stanbabak"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium">
                GitHub
              </span>
            </a>

            <a
              href="https://linkedin.com/in/stanislav-babak"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium">
                LinkedIn
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
