import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import AntigravityCard from "@/components/AntigravityCard";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "gazisn870@gmail.com",
      href: "mailto:gazisn870@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "01636308036",
      href: "tel:01636308036",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      href: null,
    },
    {
      icon: <Github className="w-5 h-5" />,
      title: "GitHub",
      value: "SuvroGfz",
      href: "https://github.com/SuvroGfz",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      title: "LinkedIn",
      value: "Gazi Fardin Zafor Suvro",
      href: "https://linkedin.com/in/gazi-fardin-zafor-suvro-a755bb2a7",
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let's work together!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <AntigravityCard
              key={index}
              floatDuration={`${5 + index * 0.5}s`}
              floatDelay={`${index * 0.4}s`}
              index={index}
            >
              <Card className="glass-premium border-border hover:border-primary/40 transition-all hover:glow-effect h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AntigravityCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
