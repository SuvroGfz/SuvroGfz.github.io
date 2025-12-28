import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["C/C++", "Java", "Python", "JavaScript", "C#", "PHP", "HTML/CSS"],
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React", "React Native", "Expo", "Spring Boot", "Node.js", "JavaFX"],
    },
    {
      title: "Database & ML",
      skills: ["MongoDB", "MySQL", "SQL", "TensorFlow", "MATLAB"],
    },
    {
      title: "Tools & Others",
      skills: ["Git & GitHub", "Unity", "Blender", "VS Code", "Postman", "LaTeX"],
    },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="bg-card/50 border-border hover:border-primary transition-all hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className="bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
