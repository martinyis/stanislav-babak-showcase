import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";

export const metadata = {
  title: "Projects — Stanislav Babak",
  description: "A collection of projects by Stanislav Babak.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
          Projects
        </h1>
        <p className="text-sm sm:text-base text-white/35 font-light max-w-lg mb-12 sm:mb-16">
          A selection of things I&apos;ve built — from AI platforms to mobile apps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
