"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function FullbleedBackground({
  project,
  videoRef,
}: {
  project: Project;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  return (
    <>
      {project.media.type === "video" ? (
        <video
          ref={videoRef}
          src={project.media.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${project.media.src})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
    </>
  );
}

function PhoneBackground({ project }: { project: Project }) {
  return (
    <>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
      </div>

      {/* Phone mockup — right side on desktop, centered on mobile */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[12%] lg:pr-[16%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative"
          style={{ maxWidth: 260 }}
        >
          <div className="absolute -inset-8 bg-white/[0.02] rounded-[3rem] blur-3xl pointer-events-none" />
          <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/[0.12] bg-black p-1.5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
            <div className="rounded-[2rem] overflow-hidden bg-black">
              <Image
                src={project.media.src}
                alt={project.title}
                width={390}
                height={844}
                className="w-full aspect-[9/19.5] object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
    </>
  );
}

export default function CarouselSlide({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Background — fullbleed or phone mockup */}
      {project.mediaDisplay === "phone" ? (
        <PhoneBackground project={project} />
      ) : (
        <FullbleedBackground project={project} videoRef={videoRef} />
      )}

      {/* Content at bottom-left */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16 lg:p-20 xl:p-24 pb-28 sm:pb-32">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[10px] sm:text-xs text-white/30 tracking-[0.35em] uppercase font-medium mb-3 sm:mb-4"
        >
          {project.label}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
        >
          {project.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-white/50 font-light max-w-xl"
        >
          {project.tagline}
        </motion.p>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap gap-2 mt-4 sm:mt-5"
        >
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] sm:text-xs text-white/40 tracking-wider uppercase font-medium
                         border border-white/[0.08] rounded-full bg-white/[0.03]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex items-center gap-3 px-6 py-3
                       border border-white/[0.12] rounded-full
                       hover:border-white/[0.3] hover:bg-white/[0.05]
                       transition-all duration-400"
          >
            <span className="text-xs sm:text-sm text-white/50 tracking-[0.15em] uppercase font-medium group-hover:text-white/80 transition-colors duration-300">
              Explore
            </span>
            <svg
              className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300"
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
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-3
                         border border-white/[0.08] rounded-full
                         hover:border-white/[0.2] hover:bg-white/[0.04]
                         transition-all duration-400"
            >
              <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-xs sm:text-sm text-white/40 tracking-[0.15em] uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
                Source
              </span>
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-3
                         border border-white/[0.08] rounded-full
                         hover:border-white/[0.2] hover:bg-white/[0.04]
                         transition-all duration-400"
            >
              <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span className="text-xs sm:text-sm text-white/40 tracking-[0.15em] uppercase font-medium group-hover:text-white/70 transition-colors duration-300">
                Live
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
