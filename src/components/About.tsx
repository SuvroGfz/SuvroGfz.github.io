import { Code2, Lightbulb, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import AntigravityCard from "@/components/AntigravityCard";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable and efficient code following best practices",
    floatDuration: "5s",
    floatDelay: "0s",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Analytical thinking to tackle complex technical challenges",
    floatDuration: "6s",
    floatDelay: "0.8s",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Quickly adapting to new technologies and frameworks",
    floatDuration: "7s",
    floatDelay: "1.6s",
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding">
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
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate developer focused on creating impactful solutions
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Bio */}
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

          {/* Right — Highlight cards */}
          <div className="grid gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <AntigravityCard
                  key={index}
                  index={index}
                  floatDuration={item.floatDuration}
                  floatDelay={item.floatDelay}
                >
                  <div className="glass-premium rounded-2xl p-6 flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </AntigravityCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
