import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "WakeMeUp 📍",
      description: "A smart location-based alarm app that alerts you when you're near your destination — perfect for bus, train, and daily commuters. Set a location on the map, choose an alarm tone, and relax. Runs in the background, even when screen is locked.",
      tags: ["React Native", "Expo", "TypeScript", "Expo Router", "Expo Location", "Expo AV"],
      github: "https://github.com/SuvroGfz/wake-me-up",
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7397610367373336576/",
    },
    {
      title: "PetPalok 🏆",
      description: "2nd Runners Up at Therap Javafest 2024. A comprehensive Pet Community Web-App with pet profiles, marketplace with AI price prediction, community groups, real-time chat, and vet appointment scheduling.",
      tags: ["Java Spring Boot", "React", "MongoDB", "Python", "TensorFlow", "Socket.IO"],
      github: "https://github.com/SuvroGfz",
    },
    {
      title: "MediaSynergy",
      description: "Social media management platform for content creation, scheduling, and analytics across multiple platforms. Features business community networking and performance tracking via Facebook Graph API.",
      tags: ["React", "Node.js", "MongoDB", "Ayrshare API"],
      github: "https://github.com/SuvroGfz",
    },
    {
      title: "Energy Usage Prediction",
      description: "Smart grid optimization using machine learning for short and long-term energy forecasting. Implemented LSTM with NNPSO for enhanced performance, tested against GRU, N-BEATS, and ARIMA models.",
      tags: ["Python", "LSTM", "Machine Learning", "Time Series"],
      github: "https://github.com/SuvroGfz",
    },
    {
      title: "Foodies",
      description: "Complete online food ordering and delivery platform connecting users, restaurants, and riders. Features seamless order management, restaurant menus, and real-time delivery tracking.",
      tags: ["PHP", "MySQL", "HTML", "CSS"],
      github: "https://github.com/SuvroGfz",
    },
    {
      title: "Freeway Rush",
      description: "Dynamic running game built with Unity Engine. Navigate bustling roads, avoid obstacles, and test your reflexes in this engaging mobile game experience.",
      tags: ["Unity", "C#", "Blender", "Game Development"],
      github: "https://github.com/SuvroGfz",
    },
    {
      title: "Football Database Management",
      description: "Java-based football player and club management system with networking features. Supports player trading, club operations, and comprehensive search functionality using OOP principles.",
      tags: ["Java", "JavaFX", "Threading", "Networking"],
      github: "https://github.com/SuvroGfz",
    },
  ];

  return (
    <section id="projects" className="section-padding bg-section-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A showcase of my development journey and achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="bg-card/50 border-border hover:border-primary transition-all hover:scale-105 hover:glow-effect group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-gradient transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="secondary"
                      className="bg-secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  {project.linkedin && (
                    <Button 
                      variant="outline" 
                      className="flex-1 border-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href={project.linkedin} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
