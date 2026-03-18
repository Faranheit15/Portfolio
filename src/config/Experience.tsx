import AWS from '@/components/technologies/AWS';
import Bun from '@/components/technologies/Bun';
import ExpressJs from '@/components/technologies/ExpressJs';
import FastAPI from '@/components/technologies/FastAPI';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    isBlur: false,
    company: 'UsefulBI Corporation',
    position: 'Sr. Software Engineer I',
    location: 'Lucknow, India (Hybrid)',
    image: '/company/usefulbi.jpg',
    description: [
      'Promoted to lead engineer and mentor, guiding 5+ junior and mid-level developers across frontend, backend, DevOps, and GenAI projects. Recognized as the go-to person for fullstack delivery and cloud deployments.',
      'Leading development of a RAG-based chatbot for a pharma client, enabling real-time, AI-driven queries on medical documents. Responsibilities include React frontend, FastAPI backend, vector DB integration, and AWS ECS deployment.',
      'Took full ownership of frontend + DevOps for a biotech client’s AI workflow platform (similar to n8n), enabling researchers to visually connect data sources and knowledge bases. Developed React TypeScript frontend (Tailwind, ShadCN), scaling to workflows with 50+ interconnected nodes. Authored Dockerfiles and GitHub workflows, deploying services to AWS ECS for scalability and resilience.',
      'Delivered MS Word Add-in to auto-generate regulatory documents (ICF, PLPs, PRL, IND) using Generative AI, React (TypeScript), and FastAPI for an American Pharma client.Implemented Okta SSO and secure data storage on RDS; overcame the challenge of building React for Word Add-ins, ensuring smooth UX.Built CI/CD GitHub Actions pipelines and deployed workloads on AWS ECS with ALB, ECR, security groups, reducing deployment time from hours to minutes.',
    ],
    startDate: 'January 2023',
    endDate: 'Present',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'FastAPI',
        href: 'https://fastapi.tiangolo.com/',
        icon: <FastAPI />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },
      {
        name: 'Bun',
        href: 'https://bun.sh/',
        icon: <Bun />,
      },
    ],
    website: 'https://usefulbi.com',
    // github: '#',
    x: 'https://x.com/usefulbicorp',
    linkedin: 'https://www.linkedin.com/company/usefulbi-corporation',
  },
  {
    isCurrent: false,
    company: 'Accenture',
    position: 'Application Development Analyst',
    location: 'Bangalore, India (Remote)',
    image: '/company/accenture.webp',
    description: [
      'Worked on Credit Card Management System for a Finance/Credit Union client. Explored Angular, Java, IBM Cloud, etc., and employed my skills in the project. Solved Code Coverage vulnerabilities on SonarQube. Solved Thunderscan vulnerabilities.',
    ],
    startDate: 'September 2021',
    endDate: 'January 2023',
    technologies: [
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Express',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },
      {
        name: 'MongoDB',
        href: 'https://www.mongodb.com/',
        icon: <MongoDB />,
      },
    ],
    website: 'https://www.accenture.com/in-en',
    x: 'https://x.com/Accenture',
    linkedin: 'https://www.linkedin.com/company/accenture/',
  },
];