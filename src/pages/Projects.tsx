
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import projectsData from '@/data/projects.json';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allTechnologies = Array.from(
    new Set(projectsData.flatMap(project => project.technologies))
  );

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );

  const filters = ['all', 'React', 'Next.js', 'AI', 'Firebase'];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray">
        <div className="container-custom">
          <div className={`text-center space-y-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my technical projects, ranging from AI-powered applications 
              to full-stack web solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-claude-warm-gray border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize hover-lift transition-all duration-200"
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-500 delay-${index * 100}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No projects found for the selected filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-20 bg-claude-warm-gray">
        <div className="container-custom">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                Technologies Used
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A comprehensive list of technologies and frameworks used across all projects
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {allTechnologies.map((tech, index) => (
                <Badge 
                  key={tech}
                  variant="secondary"
                  className={`text-sm px-4 py-2 hover-lift transition-all duration-300 cursor-pointer hover:bg-accent`}
                  onClick={() => setFilter(tech)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Interested in Collaborating?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            I'm always excited to work on new projects and bring innovative ideas to life.
          </p>
          <Button 
            asChild
            size="lg"
            variant="secondary"
            className="hover-lift"
          >
            <a href="/contact">Let's Work Together</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
