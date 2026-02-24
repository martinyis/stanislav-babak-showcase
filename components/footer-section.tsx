"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/martinyis",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stanislav-babak/",
  },
  {
    label: "Email",
    href: "mailto:martinyis11@gmail.com",
  },
];

export default function FooterSection() {
  return (
    <footer className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] h-[50%] bg-white/[0.015] rounded-full blur-[120px]" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {/* Top divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center mb-20 sm:mb-24"
        />

        {/* Main content: two-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24">
          {/* Left: Statement */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em] uppercase font-medium mb-6 sm:mb-8"
            >
              Available for opportunities
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Got something to build?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-white/40 font-light max-w-lg leading-relaxed"
            >
              I&apos;m looking for full-time roles, startup collaborations, and
              interesting projects. Let&apos;s talk.
            </motion.p>

            {/* CTA email button */}
            <motion.a
              href="mailto:martinyis11@gmail.com"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="group relative inline-flex items-center gap-3 mt-8 sm:mt-10 px-8 py-4
                         border border-white/[0.1] rounded-full overflow-hidden
                         hover:border-white/[0.25] transition-all duration-500"
            >
              {/* Slide fill */}
              <div
                className="absolute inset-0 bg-white/[0.05]
                            -translate-x-full group-hover:translate-x-0
                            transition-transform duration-500 ease-out"
              />
              <span className="relative z-10 text-sm text-white/50 tracking-[0.15em] uppercase font-medium group-hover:text-white/80 transition-colors duration-300">
                Get in touch
              </span>
              <svg
                className="relative z-10 w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </motion.a>
          </div>

          {/* Right: Links stacked vertically */}
          <div className="flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="flex flex-row lg:flex-col gap-6 sm:gap-8"
            >
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: EASE,
                  }}
                  className="text-sm text-white/30 tracking-wider uppercase font-medium
                             hover:text-white/70 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 sm:mt-24 pt-6 border-t border-white/[0.06] flex items-center justify-between"
        >
          <span className="text-[10px] sm:text-xs text-white/15 tracking-[0.2em] uppercase font-medium">
            Stanislav Babak &mdash; {new Date().getFullYear()}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.15em] uppercase font-medium">
              Open to work
            </span>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
