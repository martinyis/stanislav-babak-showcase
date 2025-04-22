
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden section-padding">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-2/3 left-1/4 w-40 h-40 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
            <span className="text-gradient">Stanislav Martin Babak</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 mb-6 md:mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
            Software Engineer / Full-Stack Developer
          </h2>
          
          <p className="text-base md:text-lg text-foreground/70 mb-8 md:mb-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Crafting exceptional digital experiences with expertise in 
            <span className="text-primary font-medium"> TypeScript</span>, 
            <span className="text-secondary font-medium"> JavaScript</span>, and
            <span className="text-accent font-medium"> React</span>.
            Passionate about building elegant, efficient and user-centered solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start animate-fade-in" style={{animationDelay: "0.3s"}}>
            <Button className="bg-gradient-primary text-white hover:opacity-90 transition-opacity">
              <a href="#projects" className="flex items-center gap-2">
                View My Projects
                <ArrowRight size={16} />
              </a>
            </Button>
            
            <Button variant="outline" className="border-primary/30 hover:border-primary/50 hover:bg-primary/5">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Download Resume
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="flex flex-col items-center text-foreground/50 hover:text-foreground/80 transition-colors">
              <span className="text-sm mb-2">Scroll Down</span>
              <ArrowRight size={16} className="rotate-90" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
