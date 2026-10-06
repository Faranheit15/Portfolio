import { getEmbeddableUrl } from '@/lib/live-preview';
import { type Project } from '@/types/project';
import React from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export async function ProjectList({ projects, className }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  const embedUrls = await Promise.all(
    projects.map((project) => getEmbeddableUrl(project.live)),
  );

  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 ${className}`}
    >
      {projects.map((project: Project, index) => (
        <ProjectCard
          key={project.title}
          project={project}
          embedUrl={embedUrls[index]}
        />
      ))}
    </div>
  );
}
