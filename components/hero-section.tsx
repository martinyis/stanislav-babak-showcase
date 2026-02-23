"use client";

import { motion } from "framer-motion";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
];

const domains = [
  "AI/LLM Integration",
  "RAG Pipelines",
  "React Native",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const domainContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.4,
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Liquid background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            animation: "blob-drift 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.025]"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            animation: "blob-drift-reverse 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 60%)",
            animation: "blob-drift-slow 30s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white"
        >
          Stanislav
          <span className="block text-white/40">Babak</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 text-lg sm:text-xl text-white/50 font-light tracking-wide uppercase"
        >
          Full Stack Software Engineer
        </motion.p>

        {/* Tech stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {techStack.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="px-4 py-1.5 text-sm font-medium text-white/70 border border-white/10 rounded-full
                         backdrop-blur-sm hover:text-white hover:border-white/25 transition-colors duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Domain expertise */}
        <motion.div
          variants={domainContainerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          {domains.map((domain) => (
            <motion.span
              key={domain}
              variants={itemVariants}
              className="px-4 py-1.5 text-sm text-white/40 font-light"
            >
              {domain}
            </motion.span>
          ))}
        </motion.div>

        {/* Education badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-6"
        >
          <span className="text-xs text-white/25 tracking-widest uppercase font-medium">
            CS @ UNH &apos;26
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 mx-auto w-16 h-px bg-white/15 origin-center"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 text-base sm:text-lg text-white/35 font-light italic max-w-md mx-auto leading-relaxed"
        >
          I build things that make people wonder
          <br />
          if it&apos;s magic or just code.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/15 rounded-full flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
