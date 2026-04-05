"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-400">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-black">
            {project.media.type === "video" ? (
              <video
                src={project.media.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${project.media.src})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Info */}
          <div className="p-5 sm:p-6">
            <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-medium">
              {project.label}
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-white/35 font-light leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[10px] text-white/30 tracking-wider uppercase font-medium
                             border border-white/[0.06] rounded-full bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
