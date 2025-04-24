import React from "react";
import { Card, CardContent } from "./ui/card";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          <span className="text-gradient">About Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1 flex justify-center items-center h-full">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl glass-card h-full">
              <img
                src="/images/avatar.jpg"
                alt="Stanislav Babak"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <Card className="glass-card border-white/5 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Professional Summary
                </h3>
                <p className="text-foreground/80 mb-6">
                  I am a dedicated software engineer specializing in full-stack
                  development with a strong focus on creating responsive,
                  user-centered web and mobile applications. With expertise in
                  modern JavaScript frameworks and libraries, I build scalable
                  solutions that deliver exceptional user experiences. Currently
                  pursuing a Computer Science degree at the University of New
                  Hampshire, I combine academic knowledge with practical
                  experience from my work at Echo Web and freelance projects.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Education
                </h3>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-lg font-medium">
                    University of New Hampshire
                  </h4>
                  <span className="text-foreground/60 text-sm">
                    Expected 2026
                  </span>
                </div>
                <p className="text-foreground/80 mb-2">B.S. Computer Science</p>
                <p className="text-foreground/60 mb-6">GPA: 3.53</p>

                <div className="flex flex-wrap gap-3">
                  <span className="skill-badge">Problem Solver</span>
                  <span className="skill-badge">Detail-Oriented</span>
                  <span className="skill-badge">Team Player</span>
                  <span className="skill-badge">Fast Learner</span>
                  <span className="skill-badge">Creative Thinker</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
