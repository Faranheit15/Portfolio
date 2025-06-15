import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ExperienceItem from "@/components/ExperienceItem";
import { Card, CardContent } from "@/components/ui/card";
import experienceData from "@/data/experience.json";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const totalYears = () => {
    const startDate = new Date("2021-09-03");
    const endDate = new Date();
    const years =
      endDate.getFullYear() -
      startDate.getFullYear() +
      (endDate.getMonth() - startDate.getMonth()) / 12;
    return Math.round(years * 10) / 10;
  };

  const stats = [
    { label: "Years of Experience", value: `${totalYears()}+` },
    { label: "Companies", value: "2" },
    { label: "Projects Delivered", value: "20+" },
    { label: "Performance Improvement", value: "50%" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray">
        <div className="container-custom">
          <div
            className={`text-center space-y-6 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary">
              Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              My professional journey through fullstack development, from
              enterprise applications to cutting-edge AI-powered solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-claude-warm-gray">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center border-0 shadow-lg">
                <CardContent className="p-6 space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="container-custom">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                Professional Timeline
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A detailed overview of my career progression and achievements
              </p>
            </div>

            <div className="space-y-12">
              {experienceData.map((experience, index) => (
                <ExperienceItem
                  key={experience.id}
                  experience={experience}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Evolution */}
      <section className="py-20 bg-claude-warm-gray">
        <div className="container-custom">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                Skills Evolution
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                How my technical expertise has grown throughout my career
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-lg font-semibold text-primary">
                    2021 - 2022
                  </div>
                  <h3 className="text-xl font-bold text-claude-accent">
                    Foundation
                  </h3>
                  <p className="text-muted-foreground">
                    Built strong fundamentals in React, Node.js, and database
                    design
                  </p>
                  <div className="text-sm text-muted-foreground">
                    React • Node.js • MongoDB • Express.js
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-lg font-semibold text-primary">
                    2022 - 2023
                  </div>
                  <h3 className="text-xl font-bold text-claude-accent">
                    Expansion
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced to TypeScript, cloud services, and performance
                    optimization
                  </p>
                  <div className="text-sm text-muted-foreground">
                    TypeScript • AWS • Performance • Testing
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-lg font-semibold text-primary">
                    2023 - Present
                  </div>
                  <h3 className="text-xl font-bold text-claude-accent">
                    Innovation
                  </h3>
                  <p className="text-muted-foreground">
                    Embraced AI technologies and modern frameworks like Next.js
                    and FastAPI
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Next.js • FastAPI • AI/ML • Leadership
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Ready to Add Value to Your Team?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Let's discuss how my experience and skills can contribute to your
            next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-background text-primary rounded-lg font-medium hover:bg-claude-warm-gray transition-colors hover-lift"
            >
              Get In Touch
            </a>
            <a
              href="https://workwithfaran.com/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary-foreground text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground hover:text-primary transition-colors hover-lift"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
