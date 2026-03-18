import Bun from '@/components/technologies/Bun';
import FastAPI from '@/components/technologies/FastAPI';
import Groq from '@/components/technologies/Groq';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Railway from '@/components/technologies/Railway';
import ReactIcon from '@/components/technologies/ReactIcon';
import ReactNative from '@/components/technologies/ReactNative';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import Supabase from '@/components/technologies/Supabase';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';





export const projects: Project[] = [
  {
    title: 'Meditwin',
    description:
      'A project for clinical trial coordinators to upload protocol PDFs, translate eligibility text into structured clinical rules, pre-screen candidate patients*, and run *forward-looking digital twin simulations with interpretable reasoning traces.',
    image: '/project/meditwin.png',
    // video: 'https://ik.imagekit.io/hokb3mrdr/notesbuddy.mp4?tr=orig',
    link: 'https://meditwin.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      {
        name: 'FastAPI',
        icon: <FastAPI key="fastapi" />,
      },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Railway', icon: <Railway key="railway" /> },
      { name: 'Groq', icon: <Groq key="groq" /> },
    ],
    github: 'https://github.com/Faranheit15/Meditwin',
    live: 'https://meditwin.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/meditwin',
    isWorking: true,
  },
  {
    title: 'Invoicey',
    description:
      'An invoicing app built with Next.js App Router, Firebase Auth, and MongoDB. It helps users create, edit, manage, preview, and export professional invoices quickly.',
    image: '/project/meditwin.png',
    // video: 'https://ik.imagekit.io/hokb3mrdr/appwrite.mp4',
    link: 'https://invoicey-dev.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
    ],
    github: 'https://github.com/Faranheit15/invoicey',
    live: 'https://invoicey-dev.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/invoicey',
    isWorking: true,
  },
  {
    title: 'Prophetic Lineage Tree',
    description:
      'An interactive lineage explorer for prophets and key historical-religious figures mentioned across the Quran, Bible, and Torah.',
    image: '/project/meditwin.png',
    // video: 'https://ik.imagekit.io/hokb3mrdr/syncify.mp4',
    link: 'https://prophetic-lineage-tree.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
    ],
    github: 'https://github.com/Faranheit15/Prophetic-Lineage-Tree',
    live: 'https://prophetic-lineage-tree.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/prophetic-lineage-tree',
    isWorking: true,
  },
  {
    title: 'Nakad',
    description:
      "Nakad is a full-stack monorepo for a real-time shared debt ledger application. Two users can open a shared balance account, record lend/repay transactions, and see each other's entries update instantly via WebSocket. The app ships on iOS and Android via Expo, backed by a FastAPI + PostgreSQL REST + WebSocket API.",
    image: '/project/meditwin.png',
    // video: 'https://ik.imagekit.io/hokb3mrdr/pasandida.mp4',
    link: '#',
    technologies: [
      { name: 'React Native', icon: <ReactNative key="reactnative" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      {
        name: 'FastAPI',
        icon: <FastAPI key="fastapi" />,
      },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
    ],
    github: 'https://github.com/Faranheit15/nakad',
    live: '#',
    details: true,
    projectDetailsPageSlug: '/projects/nakad',
    isWorking: true,
  },
];