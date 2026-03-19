import AWS from '@/components/technologies/AWS';
import Bun from '@/components/technologies/Bun';
import ExpressJs from '@/components/technologies/ExpressJs';
import FastAPI from '@/components/technologies/FastAPI';
import Github from '@/components/technologies/Github';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Position {
  title: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: Technology[];
  isCurrent: boolean;
  isPromotion?: boolean;
}

export interface Experience {
  company: string;
  location: string;
  image: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  isBlur?: boolean;
  positions: Position[];
}

export const experiences: Experience[] = [
  {
    isBlur: false,
    company: 'UsefulBI Corporation',
    location: 'Lucknow, Uttar Pradesh, India (Hybrid)',
    image: '/company/usefulbi.jpg',
    positions: [
      {
        title: 'Sr. Software Engineer I',
        startDate: 'September 2025',
        endDate: 'Present',
        isCurrent: true,
        isPromotion: true,
        description: [
          'Promoted to lead engineer and mentor, guiding 5+ junior and mid-level developers across frontend, backend, DevOps, and GenAI projects. Recognized as the go-to person for fullstack delivery and cloud deployments.',
          'Leading development of a RAG-based chatbot for a pharma client, enabling real-time, AI-driven queries on medical documents. Responsibilities include React frontend, FastAPI backend, vector DB integration, and AWS ECS deployment.',
          'Continuing contributions to the AI workflow portal (biotech client) while improving internal engineering practices. Delivered starter templates, reusable deployment scripts, and documentation, cutting onboarding time for new engineers by ~40%.',
        ],
        technologies: [
          {
            name: 'React',
            href: 'https://react.dev/',
            icon: <ReactIcon />,
          },
          {
            name: 'TypeScript',
            href: 'https://typescriptlang.org/',
            icon: <TypeScript />,
          },
          {
            name: 'Next.js',
            href: 'https://nextjs.org/',
            icon: <NextJs />,
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
            name: 'Tailwind CSS',
            href: 'https://tailwindcss.com/',
            icon: <TailwindCss />,
          },
          {
            name: 'Postman',
            href: 'https://www.postman.com/',
            icon: <Postman />,
          },
        ],
      },
      {
        title: 'Software Engineer II',
        startDate: 'May 2025',
        endDate: 'September 2025',
        isCurrent: false,
        isPromotion: true,
        description: [
          'Took full ownership of frontend + DevOps for a biotech client\u2019s AI workflow platform (similar to n8n), enabling researchers to visually connect data sources and knowledge bases. Developed React TypeScript frontend (Tailwind, ShadCN), scaling to workflows with 50+ interconnected nodes. Authored Dockerfiles and GitHub workflows, deploying services to AWS ECS for scalability and resilience.',
          'Partnered with AI engineers to integrate Generative AI features into the platform, driving faster R&D workflows and enhancing client productivity.',
        ],
        technologies: [
          {
            name: 'React',
            href: 'https://react.dev/',
            icon: <ReactIcon />,
          },
          {
            name: 'TypeScript',
            href: 'https://typescriptlang.org/',
            icon: <TypeScript />,
          },
          {
            name: 'FastAPI',
            href: 'https://fastapi.tiangolo.com/',
            icon: <FastAPI />,
          },
          {
            name: 'Tailwind CSS',
            href: 'https://tailwindcss.com/',
            icon: <TailwindCss />,
          },
          {
            name: 'ShadCN',
            href: 'https://ui.shadcn.com/',
            icon: <Shadcn />,
          },
          {
            name: 'AWS',
            href: 'https://aws.amazon.com/',
            icon: <AWS />,
          },
          {
            name: 'GitHub Actions',
            href: 'https://github.com/features/actions',
            icon: <Github />,
          },
          {
            name: 'PostgreSQL',
            href: 'https://www.postgresql.org/',
            icon: <PostgreSQL />,
          },
        ],
      },
      {
        title: 'Software Engineer I',
        startDate: 'June 2024',
        endDate: 'April 2025',
        isCurrent: false,
        isPromotion: true,
        description: [
          'Transitioned to fullstack ownership on a persona-based report generator, wrapping AI research models in production-grade FastAPI services, integrating Postgres on AWS RDS and deploying the solution on AWS EC2. Enabled non-technical users to consume AI insights via a clean React UI, accelerating client adoption.',
          'Delivered MS Word Add-in to auto-generate regulatory documents (ICF, PLPs, PRL, IND) using Generative AI, React (TypeScript), and FastAPI for an American Pharma client. Implemented Okta SSO and secure data storage on RDS; overcame the challenge of building React for Word Add-ins, ensuring smooth UX.',
          'Built CI/CD GitHub Actions pipelines and deployed workloads on AWS ECS with ALB, ECR, and security groups, reducing deployment time from hours to minutes.',
        ],
        technologies: [
          {
            name: 'React',
            href: 'https://react.dev/',
            icon: <ReactIcon />,
          },
          {
            name: 'TypeScript',
            href: 'https://typescriptlang.org/',
            icon: <TypeScript />,
          },
          {
            name: 'FastAPI',
            href: 'https://fastapi.tiangolo.com/',
            icon: <FastAPI />,
          },
          {
            name: 'PostgreSQL',
            href: 'https://www.postgresql.org/',
            icon: <PostgreSQL />,
          },
          {
            name: 'AWS',
            href: 'https://aws.amazon.com/',
            icon: <AWS />,
          },
          {
            name: 'GitHub Actions',
            href: 'https://github.com/features/actions',
            icon: <Github />,
          },
          {
            name: 'Next.js',
            href: 'https://nextjs.org/',
            icon: <NextJs />,
          },
        ],
      },
      {
        title: 'Frontend Developer',
        startDate: 'January 2023',
        endDate: 'June 2024',
        isCurrent: false,
        isPromotion: false,
        description: [
          'Contributed to a major PC manufacturer client\u2019s large-scale data migration initiative by building and monitoring ETL pipelines using Databricks, Azure Data Factory, and AWS services, enabling smooth migration of millions of records from EDL to Azure Cloud. Strengthened SQL and Python skills while ensuring data integrity and timely delivery of critical migration workflows.',
          'Spearheaded UI development for UBI Xcelerator, a React-based data pipeline automation product, collaborating with designers to convert wireframes into interactive components. Delivered 10+ reusable React components (Ant Design, Tailwind), significantly reducing development turnaround for new features. Integrated Azure AD and Okta SSO, improving enterprise adoption by ensuring secure and seamless authentication.',
          'Supported the CSVT project (clinical trial feasibility tool) by creating data-driven React components (Material UI, Ag-Grid), contributing to faster evaluations for research teams.',
        ],
        technologies: [
          {
            name: 'React',
            href: 'https://react.dev/',
            icon: <ReactIcon />,
          },
          {
            name: 'TypeScript',
            href: 'https://typescriptlang.org/',
            icon: <TypeScript />,
          },
          {
            name: 'Tailwind CSS',
            href: 'https://tailwindcss.com/',
            icon: <TailwindCss />,
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
            name: 'Node.js',
            href: 'https://nodejs.org/',
            icon: <NodeJs />,
          },
          {
            name: 'Bun',
            href: 'https://bun.sh/',
            icon: <Bun />,
          },
        ],
      },
    ],
    website: 'https://usefulbi.com',
    // github: '#',
    x: 'https://x.com/usefulbicorp',
    linkedin: 'https://www.linkedin.com/company/usefulbi-corporation',
  },
  {
    company: 'Accenture',
    location: 'Gurugram, Haryana, India (Remote)',
    image: '/company/accenture.webp',
    positions: [
      {
        title: 'Application Development Analyst',
        startDate: 'December 2022',
        endDate: 'January 2023',
        isCurrent: false,
        isPromotion: true,
        description: [
          'Worked on Credit Card Management System for a Finance/Credit Union client. Explored Angular, Java, IBM Cloud, etc., and employed my skills in the project.',
          'Solved Code Coverage vulnerabilities on SonarQube.',
          'Solved Thunderscan vulnerabilities.',
        ],
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
      },
      {
        title: 'Application Development Associate',
        startDate: 'September 2021',
        endDate: 'December 2022',
        isCurrent: false,
        isPromotion: false,
        description: [
          'Worked on Credit Card Management System for a Finance/Credit Union client. Explored Angular, Java, IBM Cloud, etc., and employed my skills in the project.',
          'Implemented a feature for Multi-Step Form for filing a complaint after losing the credit card.',
          'Worked on a bug which was automatically reloading the entire web-app on clicking on a radio button.',
          'Solved Code Smells vulnerabilities on SonarQube.',
        ],
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
      },
    ],
    website: 'https://www.accenture.com/in-en',
    x: 'https://x.com/Accenture',
    linkedin: 'https://www.linkedin.com/company/accenture/',
  },
];
