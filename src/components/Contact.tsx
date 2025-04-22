
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Github, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          <span className="text-gradient">Get In Touch</span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-white/10">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  I'm always interested in new opportunities, collaborations, and projects. 
                  Feel free to reach out if you'd like to discuss working together or just to say hello!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email</h3>
                      <a 
                        href="mailto:martinyis11@gmail.com" 
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        martinyis11@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Phone</h3>
                      <a 
                        href="tel:+16033122047" 
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        (603) 312-2047
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">LinkedIn</h3>
                      <a 
                        href="https://www.linkedin.com/in/stanislav-babak/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        linkedin.com/in/stanislav-babak
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Github size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">GitHub</h3>
                      <a 
                        href="https://github.com/martinyis" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        github.com/martinyis
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="glass-card p-6 rounded-xl text-center">
                    <h3 className="text-xl font-semibold mb-4">Let's Work Together</h3>
                    <p className="text-foreground/70 mb-6">
                      Ready to start a project or looking for a developer to join your team? I'd love to hear from you!
                    </p>
                    <Button className="w-full bg-gradient-primary">
                      <a href="mailto:martinyis11@gmail.com" className="flex items-center justify-center gap-2">
                        Contact Me
                        <ArrowRight size={16} />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
