import { Code2, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: <Code2 className="w-8 h-8 text-primary" />,
      title: "Clean Code",
      description: "Writing maintainable and efficient code following best practices",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Problem Solver",
      description: "Analytical thinking to tackle complex technical challenges",
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Fast Learner",
      description: "Quickly adapting to new technologies and frameworks",
    },
  ];

  return (
    <section id="about" className="section-padding bg-section-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate developer focused on creating impactful solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Recent Computer Science graduate from Bangladesh University of Engineering & Technology (BUET) 
              with a CGPA of 3.54. I specialize in full-stack web development and machine learning, 
              with proven expertise in building scalable applications using modern technologies.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Proud 2nd Runners Up at Therap Javafest 2024 with my project "PetPalok". 
              I thrive in building innovative solutions that combine cutting-edge technology 
              with practical user experiences. Passionate about clean code and continuous learning.
            </p>
          </div>

          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <Card 
                key={index} 
                className="bg-card/50 border-border hover:border-primary transition-all hover:scale-105 hover:glow-effect"
              >
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
