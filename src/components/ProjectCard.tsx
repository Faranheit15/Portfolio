
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  status: string;
  year: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="group border-0 shadow-lg hover-glow transition-all duration-300 overflow-hidden">
      {/* Project Image */}
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-claude-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <Badge 
            variant={project.status === 'completed' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {project.status}
          </Badge>
        </div>
        {/* Placeholder for project image */}
        <div className="h-full flex items-center justify-center">
          <span className="text-2xl font-serif font-bold text-primary/50">
            {project.title}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary group-hover:text-claude-accent transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="text-xs hover:bg-accent transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 hover-lift"
        >
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4 mr-2" />
            Code
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
        >
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Live Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
