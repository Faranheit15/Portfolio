import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "Node.js",
    "MongoDB",
    "Firebase",
    "AWS",
    "OpenAI",
    "Generative AI",
  ];

  const featuredProjects = [
    {
      title: "Invoicey",
      description:
        "Full-featured invoice management system with real-time collaboration",
      tech: ["Next.js", "MongoDB", "Firebase"],
      link: "/projects",
    },
    {
      title: "Netflix-GPT",
      description:
        "AI-powered movie recommendation platform with natural language search",
      tech: ["React", "OpenAI API", "Firebase"],
      link: "/projects",
    },
  ];

  // Helper: years between Sept 3, 2021 and today, rounded to 1 decimal
  const getTotalExperience = (): number => {
    const startMs = new Date("2021-09-03").getTime(); // number
    const nowMs = Date.now(); // number
    const diffMs = nowMs - startMs; // number of milliseconds
    const years = diffMs / (1000 * 60 * 60 * 24 * 365);
    return Math.round(years * 10) / 10;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.1),transparent)] opacity-30" />

        <div className="container-custom relative z-10">
          <div className="text-center space-y-8">
            {/* Profile Image */}
            <div
              className={`mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-claude-accent p-1 transition-all duration-1000 ${
                isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-3xl font-serif font-bold text-primary">
                  FM
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div
              className={`space-y-4 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-primary leading-tight">
                Faran Mohammad
              </h1>
              <p className="text-xl sm:text-2xl text-claude-accent font-medium">
                Fullstack Frontend Developer
              </p>
            </div>

            {/* Tagline */}
            <div
              className={`max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Turning concepts into{" "}
                <span className="gradient-text font-semibold">
                  intelligent, scalable
                </span>{" "}
                user experiences with {getTotalExperience()}+ years of expertise
                in React, Next.js, and AI integration.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg hover-lift"
              >
                <Link to="/projects">
                  View Projects
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg hover-lift"
              >
                <Link to="/contact">Contact Me</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div
              className={`flex justify-center space-x-6 transition-all duration-1000 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {[
                { icon: Github, href: "https://github.com/Faranheit15" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/faran-mohammad/",
                },
                { icon: Mail, href: "mailto:ffaranm15@gmail.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-300 hover-lift"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-claude-warm-gray">
        <div className="container-custom">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                Technical Expertise
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Crafting modern web applications with cutting-edge technologies
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={`text-sm px-4 py-2 hover-lift transition-all duration-300 delay-${
                    index * 100
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container-custom">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A selection of my recent work showcasing technical skills and
                creative problem-solving
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <Card
                  key={project.title}
                  className="hover-glow transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="p-8 space-y-4">
                    <h3 className="text-xl font-semibold text-primary">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover-lift"
              >
                <Link to="/projects">
                  View All Projects
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Let's collaborate and turn your ideas into powerful, scalable web
            solutions.
          </p>
          <Button asChild size="lg" variant="secondary" className="hover-lift">
            <Link to="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
