
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

const ExperienceItem = ({ experience, index }: ExperienceItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getDuration = () => {
    const start = new Date(experience.startDate);
    const end = experience.endDate ? new Date(experience.endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months`;
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-16 bottom-0 w-px bg-border hidden md:block" />
      
      {/* Timeline Dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />
      
      <Card className="ml-0 md:ml-16 border-0 shadow-lg transition-all duration-300">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">{experience.role}</h3>
              <p className="text-lg font-medium text-claude-accent">{experience.company}</p>
            </div>
            {experience.current && (
              <Badge variant="default" className="self-start sm:self-center">
                Current
              </Badge>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {formatDate(experience.startDate)} - {' '}
                {experience.current ? 'Present' : formatDate(experience.endDate!)} {' '}
                ({getDuration()})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>

          {/* Responsibilities */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Key Responsibilities</h4>
            <ul className="space-y-2">
              {experience.responsibilities.map((responsibility, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1.5 text-xs">●</span>
                  <span className="leading-relaxed">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {experience.achievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Key Achievements</h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-claude-accent mt-1.5 text-xs">★</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceItem;
