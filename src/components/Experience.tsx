import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import AntigravityCard from "@/components/AntigravityCard";

const Experience = () => {
  return (
    <section id="experience" className="section-padding">
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
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            My professional journey so far
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AntigravityCard index={0} floatDuration="5.5s">
            <div className="glass-premium rounded-2xl p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold mb-2">
                    Software Engineer (Development)
                  </h4>
                  <p className="text-lg text-primary font-medium mb-3">
                    Therap BD LTD
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      April 2025 - Present{" "}
                      <span className="text-primary/80 text-sm">
                        ({(() => {
                          const start = new Date(2025, 3, 5); // April 5, 2025
                          const now = new Date();
                          let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
                          if (now.getDate() < start.getDate()) months--;
                          const years = Math.floor(months / 12);
                          const remainingMonths = months % 12;
                          if (years >= 1) return `${years}yr ${remainingMonths}mo`;
                          return `${months} months`;
                        })()})
                      </span>
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Full-stack software engineer working on enterprise-grade web applications.
                    Building and maintaining features using Java, Spring Boot, and React with
                    AWS S3 for object storage, ClickHouse for OLAP analytics, and Docker for
                    containerized deployments. Collaborating through Bitbucket and JIRA in agile
                    development workflows.
                  </p>
                </div>
              </div>
            </div>
          </AntigravityCard>
        </div>
      </div>
    </section>
  );
};

export default Experience;
