"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const rotatingWords = [
  "AI products",
  "SaaS platforms",
  "mobile apps",
  "things that ship",
];

const ROTATE_INTERVAL = 3000;

/* ================================================================== */
/* AMBIENT CODE LINES -- slowly scrolling code in the background       */
/* ================================================================== */

const codeLines = [
  'const ai = await orchestrate({ models: ["gemini", "gpt-4", "perplexity"] });',
  "export async function generateReport(company: string): Promise<Report> {",
  '  const enriched = await rag.enrich(prompt, { context: "market-intel" });',
  "  return pipeline.execute({ input: enriched, citations: true });",
  "}",
  "",
  "const [analysis, setAnalysis] = useState<Analysis | null>(null);",
  "useEffect(() => { speechRecognition.start({ lang, onResult }); }, [lang]);",
  "",
  'app.post("/api/v1/reports", authMiddleware, rateLimiter, validate(schema),',
  "  async (req, res) => {",
  "    const report = await ReportService.generate(req.body);",
  '    res.status(201).json({ success: true, data: report });',
  "  }",
  ");",
  "",
  "const subscription = await stripe.subscriptions.create({",
  '  customer: user.stripeId, items: [{ price: plan.priceId }],',
  "});",
  "",
  "const nativeApp = () => (",
  "  <NavigationContainer>",
  "    <Stack.Navigator screenOptions={{ headerShown: false }}>",
  '      <Stack.Screen name="Practice" component={PracticeScreen} />',
  '      <Stack.Screen name="Results" component={AIFeedbackScreen} />',
  "    </Stack.Navigator>",
  "  </NavigationContainer>",
  ");",
  "",
  'const tts = await googleCloud.textToSpeech({ text, lang: "es-ES" });',
  "const validation = await openai.chat.completions.create({",
  '  model: "gpt-4", messages: [{ role: "system", content: cotPrompt }],',
  "});",
  "",
  "export const dbConfig = { uri: process.env.MONGO_URI, options: {",
  "  maxPoolSize: 10, retryWrites: true, w: 'majority',",
  "}};",
];

/* Duplicate lines to create seamless loop */
const doubledLines = [...codeLines, ...codeLines];

function CodeRain() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Left column -- scrolls up */}
      <div
        className="absolute left-[5%] sm:left-[8%] top-0 w-[45%] sm:w-[40%] opacity-[0.04]"
        style={{ animation: "code-scroll-up 60s linear infinite" }}
      >
        <pre className="text-[10px] sm:text-xs leading-[2] text-white font-mono whitespace-pre-wrap break-all">
          {doubledLines.join("\n")}
        </pre>
      </div>

      {/* Right column -- scrolls down, offset */}
      <div
        className="absolute right-[5%] sm:right-[8%] bottom-0 w-[40%] sm:w-[35%] opacity-[0.03] hidden sm:block"
        style={{ animation: "code-scroll-down 75s linear infinite" }}
      >
        <pre className="text-[10px] sm:text-xs leading-[2] text-white font-mono whitespace-pre-wrap break-all">
          {[...doubledLines].reverse().join("\n")}
        </pre>
      </div>

      {/* Gradient masks to fade edges */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-[1]" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-[1]" />
    </div>
  );
}

/* ================================================================== */
/* FLOATING CODE FRAGMENTS -- glass cards with code snippets           */
/* ================================================================== */

const codeFragments = [
  {
    code: "await ai.analyze(input)",
    x: "right-[10%]",
    y: "top-[18%]",
    delay: 0.5,
    drift: 22,
  },
  {
    code: "pipeline.execute()",
    x: "right-[20%]",
    y: "bottom-[28%]",
    delay: 1.2,
    drift: 28,
  },
  {
    code: "{ model: 'gpt-4' }",
    x: "right-[5%]",
    y: "top-[55%]",
    delay: 0.8,
    drift: 18,
  },
];

function FloatingFragments() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {codeFragments.map((frag, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 + frag.delay }}
          className={`absolute ${frag.x} ${frag.y}`}
        >
          <motion.div
            animate={{ y: [0, -frag.drift, 0] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
          >
            <code className="text-[10px] sm:text-xs text-white/20 font-mono">
              {frag.code}
            </code>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* MAIN HERO                                                           */
/* ================================================================== */

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const scrollToWork = useCallback(() => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      const bottom = heroEl.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: bottom, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
    >
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

      {/* Scrolling code background */}
      <CodeRain />

      {/* Floating code fragments */}
      <FloatingFragments />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.015] pointer-events-none z-[2]" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-24">
        {/* Name -- small, subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-xs sm:text-sm text-white/25 tracking-[0.3em] uppercase font-medium">
            Stanislav Babak
          </span>
        </motion.div>

        {/* Main statement */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-[1.05]">
              I build
            </h1>
          </motion.div>

          {/* Rotating word */}
          <div
            className="h-[1.4em] relative mt-1 sm:mt-2 overflow-hidden"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute left-0 font-bold text-white/50 tracking-tight whitespace-nowrap"
                style={{ fontSize: "inherit" }}
              >
                {rotatingWords[wordIndex]}
                <span className="text-white/20">.</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Info line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 sm:mt-16 flex items-center gap-4"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            className="w-8 sm:w-12 h-px bg-white/15 origin-left"
          />
          <span className="text-xs sm:text-sm text-white/25 tracking-[0.2em] uppercase font-medium">
            Full Stack Engineer &middot; CS @ UNH &apos;26
          </span>
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        onClick={scrollToWork}
        className="relative z-10 flex flex-col items-center gap-3 pb-10 mx-auto cursor-pointer group"
      >
        <span className="text-[10px] sm:text-xs text-white/20 tracking-[0.3em] uppercase font-medium group-hover:text-white/40 transition-colors duration-300">
          See my work
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white/20 group-hover:text-white/40 transition-colors duration-300"
          >
            <path
              d="M10 4L10 16M10 16L15 11M10 16L5 11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
