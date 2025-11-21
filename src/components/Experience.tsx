import { Briefcase, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Experience = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional journey and contributions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50 border-border hover:border-primary transition-all hover:scale-105 hover:glow-effect">
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">
                    Associate Software Engineer (Development)
                  </h3>
                  <p className="text-lg text-primary font-medium mb-3">
                    Therap BD LTD
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>April 2025 - Present</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Working as an entry-level developer, contributing to software development 
                    projects and gaining hands-on experience with modern web technologies and 
                    development practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;
