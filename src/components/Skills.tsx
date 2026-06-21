import { motion } from "framer-motion";
import AntigravityCard from "@/components/AntigravityCard";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Languages",
    skills: ["C/C++", "Java", "Python", "JavaScript", "TypeScript", "C#", "PHP", "HTML/CSS", "SQL", "MATLAB"],
    floatDuration: "5s",
    floatDelay: "0s",
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Spring Boot", "Node.js", "Express.js", "JavaFX", "Socket.IO", "Ayrshare API", "Facebook Graph API"],
    floatDuration: "6s",
    floatDelay: "0.8s",
  },
  {
    title: "Mobile Development",
    skills: ["React Native", "Expo", "Expo Router", "Expo Location", "Expo AV"],
    floatDuration: "7s",
    floatDelay: "1.6s",
  },
  {
    title: "Database & ML/AI",
    skills: ["MongoDB", "MySQL", "ClickHouse (OLAP)", "TensorFlow", "LSTM", "ARIMA", "Groq API"],
    floatDuration: "5.5s",
    floatDelay: "2.4s",
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS S3", "MinIO", "Docker", "REST API", "SSE"],
    floatDuration: "6.5s",
    floatDelay: "0.4s",
  },
  {
    title: "Developer Tools",
    skills: ["Git & GitHub", "Bitbucket", "JIRA", "VS Code", "Postman", "LaTeX", "Google Colab", "Kaggle"],
    floatDuration: "5.8s",
    floatDelay: "1.2s",
  },
  {
    title: "Design & Game Dev",
    skills: ["Unity Engine", "Blender", "Photoshop", "iGraphics"],
    floatDuration: "7.2s",
    floatDelay: "2s",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-section-bg/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Skills & <span className="text-gradient">Technologies</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            Technologies and tools I work with
          </p>
        </div>

        {/* Skill category cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <AntigravityCard
              key={index}
              index={index}
              floatDuration={category.floatDuration}
              floatDelay={category.floatDelay}
            >
              <div className="glass-premium rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-default border-white/15 bg-white/[0.06] text-xs text-foreground/80 transition-all duration-200 hover:border-primary/50 hover:bg-primary hover:text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AntigravityCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
