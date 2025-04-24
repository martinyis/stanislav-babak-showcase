import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  icon: string;
  items: string[];
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      icon: "💻",
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "C",
        "HTML/CSS",
        "SQL",
        "Scala",
      ],
    },
    {
      name: "Frontend",
      icon: "🎨",
      items: [
        "React.js",
        "Next.js",
        "React Native",
        "Tailwind CSS",
        "Material UI",
        "Redux",
        "SASS/SCSS",
        "GraphQL",
      ],
    },
    {
      name: "Backend",
      icon: "⚙️",
      items: [
        "Node.js",
        "Express.js",
        "Flask",
        "Django",
        "Spring Boot",
        "RESTful APIs",
        "Microservices",
        "WebSockets",
      ],
    },
    {
      name: "Tools",
      icon: "🛠️",
      items: ["Git", "Docker", "AWS", "GCP", "Azure", "CI/CD", "Jira", "Figma"],
    },
    {
      name: "Databases",
      icon: "🗄️",
      items: [
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Firebase",
        "Redis",
        "ORM Tools",
      ],
    },
  ];

  const filteredCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter(
          (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
        );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.03,
        duration: 0.3,
      },
    }),
  };

  return (
    <section
      id="skills"
      className="section-padding bg-gradient-to-b from-background to-muted relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          <span className="text-gradient">Technical Skills</span>
        </h2>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="glass-card p-1 shadow-[0_0_15px_rgba(100,100,255,0.1)]">
              <TabsTrigger
                value="all"
                onClick={() => setSelectedCategory("all")}
                className="font-medium px-6"
              >
                All
              </TabsTrigger>
              {skillCategories.map((cat) => (
                <TabsTrigger
                  key={cat.name}
                  value={cat.name.toLowerCase()}
                  onClick={() => setSelectedCategory(cat.name.toLowerCase())}
                  className="font-medium px-6"
                >
                  {cat.icon} {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={categoryIndex}
                >
                  <Card className="glass-card group hover:border-primary/40 hover:shadow-[0_10px_25px_-5px_rgba(100,100,255,0.3)] transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center mb-6">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <h3 className="text-xl font-semibold text-gradient">
                          {category.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {category.items.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            variants={badgeVariants}
                            initial="hidden"
                            animate="visible"
                            custom={skillIndex}
                            className="skill-badge hover:bg-gradient-to-r hover:from-primary/30 hover:to-secondary/30 cursor-default transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_10px_rgba(100,100,255,0.3)]"
                            whileHover={{
                              y: -3,
                              transition: { duration: 0.2 },
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
