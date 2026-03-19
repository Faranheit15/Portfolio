import { type Experience, type Position } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

function PositionTechnologies({ position }: { position: Position }) {
  return (
    <div>
      <h4 className="text-md mb-2 font-semibold">Technologies</h4>
      <div className="flex flex-wrap gap-2">
        {position.technologies.map((technology, techIndex: number) => (
          <Skill key={techIndex} name={technology.name} href={technology.href}>
            {technology.icon}
          </Skill>
        ))}
      </div>
    </div>
  );
}

function PositionDescription({ position }: { position: Position }) {
  return (
    <div className="text-secondary flex flex-col">
      {position.description.map((description: string, descIndex: number) => (
        <p
          key={descIndex}
          dangerouslySetInnerHTML={{
            __html: `• ${parseDescription(description)}`,
          }}
        />
      ))}
    </div>
  );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const hasMultiplePositions = experience.positions.length > 1;
  const latestPosition = experience.positions[0];
  const oldestPosition = experience.positions[experience.positions.length - 1];
  const isCurrentCompany = latestPosition?.isCurrent ?? false;

  const overallStartDate = oldestPosition?.startDate ?? '';
  const overallEndDate = isCurrentCompany
    ? 'Present'
    : (latestPosition?.endDate ?? '');

  return (
    <div className="flex flex-col gap-4">
      {/* Company Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {experience.image ? (
            <Image
              src={experience.image}
              alt={experience.company}
              width={100}
              height={100}
              className="size-12 rounded-md"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex size-12 shrink-0 items-center justify-center rounded-md text-lg font-bold">
              {experience.company.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  'text-lg font-bold',
                  experience.isBlur ? 'blur-[5px]' : 'blur-none',
                )}
              >
                {experience.company}
              </h3>
              {experience.website && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.website}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <Website />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Visit Website</TooltipContent>
                </Tooltip>
              )}
              {experience.x && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.x}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <X />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Follow on X</TooltipContent>
                </Tooltip>
              )}
              {experience.linkedin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.linkedin}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <LinkedIn />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Connect on LinkedIn</TooltipContent>
                </Tooltip>
              )}
              {experience.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.github}
                      target="_blank"
                      className="size-4 text-neutral-500"
                    >
                      <Github />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View GitHub</TooltipContent>
                </Tooltip>
              )}
              {isCurrentCompany && (
                <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                  <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                  Working
                </div>
              )}
            </div>
            {/* Show position title inline only for single-position companies */}
            {!hasMultiplePositions && latestPosition && (
              <p>{latestPosition.title}</p>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="text-secondary flex flex-col md:text-right">
          <p>
            {overallStartDate} - {overallEndDate}
          </p>
          <p>{experience.location}</p>
        </div>
      </div>

      {/* Single position: render tech + description directly (preserves existing layout) */}
      {!hasMultiplePositions && latestPosition && (
        <>
          <div>
            <h4 className="text-md mt-4 mb-2 font-semibold">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {latestPosition.technologies.map(
                (technology, techIndex: number) => (
                  <Skill
                    key={techIndex}
                    name={technology.name}
                    href={technology.href}
                  >
                    {technology.icon}
                  </Skill>
                ),
              )}
            </div>
          </div>
          <div className="text-secondary flex flex-col">
            {latestPosition.description.map(
              (description: string, descIndex: number) => (
                <p
                  key={descIndex}
                  dangerouslySetInnerHTML={{
                    __html: `• ${parseDescription(description)}`,
                  }}
                />
              ),
            )}
          </div>
        </>
      )}

      {/* Multiple positions: render as a vertical timeline */}
      {hasMultiplePositions && (
        <div className="border-border ml-6 flex flex-col border-l-2">
          {experience.positions.map((position, index) => (
            <div
              key={index}
              className={cn(
                'relative flex flex-col gap-3 pl-6',
                index < experience.positions.length - 1 && 'pb-6',
              )}
            >
              {/* Timeline dot */}
              <div className="border-border bg-background absolute -left-[9px] top-0.5 size-4 rounded-full border-2" />

              {/* Position header */}
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{position.title}</p>
                  {position.isCurrent && (
                    <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                      <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                      Working
                    </div>
                  )}
                  {position.isPromotion && (
                    <span className="text-primary bg-primary/10 rounded-md px-2 py-1 text-xs">
                      ↑ Promoted
                    </span>
                  )}
                </div>
                <p className="text-secondary shrink-0 text-sm">
                  {position.startDate} -{' '}
                  {position.isCurrent ? 'Present' : position.endDate}
                </p>
              </div>

              <PositionTechnologies position={position} />
              <PositionDescription position={position} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
