
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Briefcase } from 'lucide-react';

interface Job {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

const Experience = () => {
  const jobs: Job[] = [
    {
      title: "Software Engineer",
      company: "Echo Web, LLC",
      period: "Jun 2023 - Sep 2023",
      description: [
        "Developed responsive web applications using React.js and Next.js with TypeScript",
        "Implemented RESTful APIs with Node.js and Express",
        "Collaborated with UX/UI designers to implement intuitive user interfaces",
        "Optimized application performance and ensured cross-browser compatibility"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "RESTful API"]
    },
    {
      title: "Web Developer",
      company: "University of New Hampshire",
      period: "Jun 2023 - Aug 2023",
      description: [
        "Maintained and updated university department websites",
        "Implemented responsive design principles to improve mobile experience",
        "Collaborated with stakeholders to implement content updates and new features",
        "Ensured website compliance with accessibility standards"
      ],
      skills: ["HTML/CSS", "JavaScript", "Responsive Design", "CMS", "Web Accessibility"]
    },
    {
      title: "Front End Developer",
      company: "Freelance",
      period: "Current",
      description: [
        "Design and develop custom websites for various clients",
        "Create responsive, mobile-friendly interfaces using modern frameworks",
        "Implement seamless user experiences with focus on performance and accessibility",
        "Collaborate directly with clients to understand requirements and deliver solutions"
      ],
      skills: ["React.js", "Next.js", "Tailwind CSS", "UI/UX Design", "Client Management"]
    }
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          <span className="text-gradient">Professional Experience</span>
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline stem */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2 z-0"></div>
          
          {jobs.map((job, index) => (
            <div 
              key={job.company}
              className={`relative z-10 mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              } md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-0 top-8 w-5 h-5 rounded-full bg-gradient-primary transform md:translate-x-[-50%] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background animate-pulse"></div>
              </div>
              
              <Card className="glass-card hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Briefcase size={18} className="mr-2 text-primary" />
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                    </div>
                    <span className="text-sm text-foreground/60">{job.period}</span>
                  </div>
                  
                  <h4 className="text-lg font-medium text-foreground/90 mb-4">{job.company}</h4>
                  
                  <ul className="space-y-2 mb-4">
                    {job.description.map((item, i) => (
                      <li key={i} className="text-foreground/70 text-sm">• {item}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map((skill) => (
                      <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
