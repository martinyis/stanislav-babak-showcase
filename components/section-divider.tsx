"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative py-16 sm:py-24 flex items-center justify-center">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-16 h-px bg-white/10 origin-center"
      />
    </div>
  );
}
