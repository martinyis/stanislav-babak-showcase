
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gradient">
              Stanislav Babak
            </h2>
            <p className="text-sm text-foreground/60 mt-1">
              Software Engineer / Full-Stack Developer
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com/martinyis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/stanislav-babak/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:martinyis11@gmail.com" 
              className="p-2 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} Stanislav Babak. All rights reserved.</p>
          <p className="mt-1">
            Designed and built with <span className="text-red-500">♥</span> using React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
