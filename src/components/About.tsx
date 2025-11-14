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
              As an Associate Software Engineer, I'm dedicated to building high-quality applications 
              that make a difference. My journey in software development has equipped me with a solid 
              foundation in modern web technologies and best practices.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I thrive in collaborative environments and enjoy the challenge of turning complex 
              requirements into elegant, user-friendly solutions. Always eager to learn and grow, 
              I stay updated with the latest industry trends and technologies.
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
