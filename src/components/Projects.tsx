import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ExternalLink, Github, Code, Link } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  features: string[];
  imagePosition?: string;
  links?: Array<{ url: string; title: string }>;
}

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects: Project[] = [
    {
      id: 1,
      title: "MovieSensei",
      description: "AI-powered movie recommendation platform",
      fullDescription:
        "An intelligent movie recommendation platform that utilizes AI algorithms to suggest personalized film choices based on user preferences and viewing history.",
      image: "/images/moviesensei.png",
      tags: ["React", "Node.js", "AI"],
      github: "https://github.com/martinyis/MovieSensei",
      demo: "https://movie-sensei.vercel.app/",
      features: [
        "AI recommendation engine",
        "User preference tracking",
        "Social sharing features",
        "Personalized watchlists",
        "Integration with movie APIs",
      ],
    },
    {
      id: 2,
      title: "PractApp",
      description: "Language learning mobile application",
      fullDescription:
        "A comprehensive language learning application designed to help users practice speaking and learning new languages. Features include personalized learning paths, pronunciation feedback with voice recognition, progress tracking, daily streaks, and support for multiple languages.",
      image: "/images/practapp.png",
      imagePosition: "top",
      tags: ["React Native", "TypeScript", "MongoDB", "Node.js", "Express"],
      github: "private",
      demo: "https://usepractapp.com",
      features: [
        "Personalized learning paths with level-based progression",
        "Voice recognition for real-time pronunciation feedback",
        "Progress analytics with visual charts",
        "Daily streak tracking to encourage consistent practice",
        "Cross-platform experience (iOS and Android)",
        "Offline capability for core functionality",
      ],
    },
    {
      id: 3,
      title: "Freelance Portfolio",
      description: "Custom client websites and applications",
      fullDescription:
        "A showcase of custom websites and applications developed for various clients on a freelance basis, demonstrating versatility in design approaches and technical implementations.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["React", "Next.js", "UI/UX", "Custom Design"],
      demo: "#",
      features: [
        "Custom website development",
        "Branding integration",
        "E-commerce functionality",
        "Content management",
        "Analytics integration",
      ],
      links: [
        {
          url: "https://www.samuelfarrington.com/",
          title: "Samuel Farrington",
        },
        { url: "https://www.ultrafa.com/", title: "Ultra FA" },
      ],
    },
  ];

  const projectTags = [
    "all",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  return (
    <section
      id="projects"
      className="section-padding bg-gradient-to-b from-muted to-background"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          <span className="text-gradient">Featured Projects</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {projectTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tag)}
              className={
                filter === tag ? "bg-gradient-primary" : "border-white/10"
              }
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Dialog key={project.id}>
              <Card className="glass-card overflow-hidden group h-full flex flex-col hover:border-primary/30 transition-colors">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      project.imagePosition
                        ? `object-${project.imagePosition}`
                        : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="skill-badge text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex justify-between">
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/5"
                    >
                      Details
                    </Button>
                  </DialogTrigger>

                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-white/5"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-white/5"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>

              {/* Project Details Dialog */}
              <DialogContent className="glass-card border-white/10 max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gradient">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-foreground/70">
                    {project.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="relative h-48 overflow-hidden rounded-md my-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover ${
                      project.imagePosition
                        ? `object-${project.imagePosition}`
                        : ""
                    }`}
                  />
                </div>

                <p className="text-foreground/80 mb-4">
                  {project.fullDescription}
                </p>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Code size={16} className="mr-2 text-primary mt-1" />
                        <span className="text-foreground/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.links && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">
                      Project Links
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.links.map((link, index) => (
                        <li key={index} className="flex items-start">
                          <Link size={16} className="mr-2 text-primary mt-1" />
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-primary transition-colors"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  {project.github && (
                    <Button variant="outline" className="border-white/10">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={16} />
                        View Source
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button className="bg-gradient-primary">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
