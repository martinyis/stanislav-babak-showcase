
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';

interface SkillCategory {
  name: string;
  items: SkillItem[];
}

interface SkillItem {
  name: string;
  level: number; // 1-5
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      items: [
        { name: "TypeScript", level: 5 },
        { name: "JavaScript", level: 5 },
        { name: "Python", level: 4 },
        { name: "Java", level: 3 },
        { name: "C", level: 3 },
        { name: "HTML/CSS", level: 5 },
        { name: "SQL", level: 4 },
        { name: "Scala", level: 2 },
      ]
    },
    {
      name: "Frontend",
      items: [
        { name: "React.js", level: 5 },
        { name: "Next.js", level: 5 },
        { name: "React Native", level: 4 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Material UI", level: 4 },
        { name: "Redux", level: 4 },
        { name: "SASS/SCSS", level: 4 },
        { name: "GraphQL", level: 3 },
      ]
    },
    {
      name: "Backend",
      items: [
        { name: "Node.js", level: 5 },
        { name: "Express.js", level: 5 },
        { name: "Flask", level: 3 },
        { name: "Django", level: 3 },
        { name: "Spring Boot", level: 2 },
        { name: "RESTful APIs", level: 5 },
        { name: "Microservices", level: 3 },
        { name: "WebSockets", level: 3 },
      ]
    },
    {
      name: "Tools",
      items: [
        { name: "Git", level: 5 },
        { name: "Docker", level: 3 },
        { name: "AWS", level: 3 },
        { name: "GCP", level: 3 },
        { name: "Azure", level: 2 },
        { name: "CI/CD", level: 3 },
        { name: "Jira", level: 4 },
        { name: "Figma", level: 3 },
      ]
    },
    {
      name: "Databases",
      items: [
        { name: "PostgreSQL", level: 4 },
        { name: "MongoDB", level: 4 },
        { name: "MySQL", level: 3 },
        { name: "Firebase", level: 4 },
        { name: "Redis", level: 2 },
        { name: "ORM Tools", level: 4 },
      ]
    },
  ];

  const SkillLevel = ({ level }: { level: number }) => (
    <div className="w-full bg-white/10 rounded-full h-2 mt-1">
      <div 
        className="bg-gradient-primary h-full rounded-full transition-all duration-1000"
        style={{ width: `${(level / 5) * 100}%` }}
      ></div>
    </div>
  );

  const filteredCategories = selectedCategory === "all" 
    ? skillCategories 
    : skillCategories.filter(cat => cat.name.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          <span className="text-gradient">Technical Skills</span>
        </h2>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="glass-card">
              <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>All</TabsTrigger>
              {skillCategories.map(cat => (
                <TabsTrigger 
                  key={cat.name} 
                  value={cat.name.toLowerCase()}
                  onClick={() => setSelectedCategory(cat.name.toLowerCase())}
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Card key={category.name} className="glass-card group hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gradient">{category.name}</h3>
                    
                    <div className="space-y-4">
                      {category.items.map((skill) => (
                        <div key={skill.name} className="group">
                          <div className="flex justify-between items-center">
                            <span className="text-foreground/80 group-hover:text-foreground/100 transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs text-foreground/60">
                              {skill.level}/5
                            </span>
                          </div>
                          <SkillLevel level={skill.level} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
