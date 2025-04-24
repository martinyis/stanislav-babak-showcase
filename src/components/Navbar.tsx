import React, { useState, useEffect } from "react";
import { Menu, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update navbar background on scroll
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Show/hide scroll to top button
      if (scrollPosition > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Determine active section based on scroll position
      const sections = NAV_LINKS.map((link) => ({
        id: link.href.substring(1),
        element: document.getElementById(link.href.substring(1)),
      })).filter((section) => section.element);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.element) continue;

        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "py-3 glass-card bg-background/80" : "py-5 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold text-gradient"
          >
            S<span className="hidden sm:inline">tanislav</span> B
            <span className="hidden sm:inline">abak</span>
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm transition-all hover:text-primary relative px-1",
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </a>
            ))}
            <a
              href="/MBRESUME5-AP.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Resume
            </a>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-card animate-fade-in pt-2 pb-4">
            <nav className="flex flex-col space-y-4 px-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-md transition-colors",
                    activeSection === link.href.substring(1)
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-white/5"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/MBRESUME5-AP.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-center bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Resume
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed z-50 bottom-6 right-6 p-3 rounded-full glass-card transition-all duration-300",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Navbar;
