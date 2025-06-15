
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techStack = {
    'Frontend': [
      { name: 'React', level: 95, description: 'Advanced component architecture, hooks, context' },
      { name: 'Next.js', level: 90, description: 'SSR, SSG, API routes, performance optimization' },
      { name: 'TypeScript', level: 88, description: 'Type-safe development, advanced generics' },
      { name: 'Tailwind CSS', level: 92, description: 'Custom design systems, responsive layouts' }
    ],
    'Backend': [
      { name: 'FastAPI', level: 85, description: 'RESTful APIs, async programming, authentication' },
      { name: 'Node.js', level: 80, description: 'Express.js, middleware, real-time applications' },
      { name: 'Python', level: 82, description: 'Data processing, automation, API development' }
    ],
    'Database & Cloud': [
      { name: 'MongoDB', level: 85, description: 'Document modeling, aggregation pipelines' },
      { name: 'Firebase', level: 88, description: 'Authentication, Firestore, real-time updates' },
      { name: 'AWS', level: 75, description: 'EC2, S3, Lambda, deployment automation' }
    ],
    'AI & Tools': [
      { name: 'OpenAI API', level: 80, description: 'GPT integration, prompt engineering' },
      { name: 'Git', level: 90, description: 'Version control, branching strategies' },
      { name: 'Okta', level: 78, description: 'Authentication and authorization systems' }
    ]
  };

  const personalValues = [
    {
      title: 'Innovation First',
      description: 'I believe in leveraging cutting-edge technologies to solve real-world problems and create meaningful user experiences.'
    },
    {
      title: 'Quality Code',
      description: 'Writing clean, maintainable, and well-documented code is not just a practice—it\'s a responsibility to future developers.'
    },
    {
      title: 'Continuous Learning',
      description: 'The tech landscape evolves rapidly, and I\'m committed to staying current with emerging trends and best practices.'
    },
    {
      title: 'User-Centric Design',
      description: 'Every feature I build starts with understanding the user\'s needs and creating intuitive, accessible experiences.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray">
        <div className="container-custom">
          <div className={`text-center space-y-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A passionate fullstack developer with a love for creating intelligent, 
              scalable web solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
                My Journey
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 3.5 years of experience in fullstack development, I've had the privilege 
                  of working on diverse projects that span from enterprise-level applications to 
                  innovative AI-powered platforms.
                </p>
                <p>
                  My journey began at <strong className="text-primary">Accenture</strong>, where I honed my skills 
                  in React, Node.js, and enterprise-scale development. During my time there, I worked 
                  on critical applications for finance and healthcare domains, learning the importance 
                  of scalable architecture and user-centered design.
                </p>
                <p>
                  Currently, as a Software Engineer at <strong className="text-primary">UsefulBI Corp</strong>, 
                  I lead frontend development initiatives and contribute to full-stack solutions for 
                  business intelligence platforms. I've been instrumental in modernizing legacy systems 
                  and implementing performance optimizations that have improved user experience by 40%.
                </p>
                <p>
                  What drives me most is the intersection of technology and human experience. Whether 
                  it's integrating AI capabilities to enhance user workflows or optimizing performance 
                  to deliver lightning-fast experiences, I'm passionate about creating solutions that 
                  truly matter.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-claude-accent/10 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-serif font-bold text-primary">3.5+</div>
                  <div className="text-lg text-muted-foreground">Years of Experience</div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">20+</div>
                      <div className="text-muted-foreground">Projects</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">50%</div>
                      <div className="text-muted-foreground">Performance Boost</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-claude-warm-gray">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              Technical Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive overview of my technical skills and proficiency levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(techStack).map(([category, skills]) => (
              <Card key={category} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-primary mb-6">{category}</h3>
                  <div className="space-y-6">
                    {skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              Values & Philosophy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The principles that guide my approach to development and collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {personalValues.map((value, index) => (
              <Card key={value.title} className="border-0 shadow-lg hover-glow transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Beyond the Code
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg opacity-90">
            <p>
              When I'm not crafting code, you'll find me exploring the latest developments 
              in AI and machine learning, contributing to open-source projects, or sharing 
              knowledge through technical writing and mentoring.
            </p>
            <p>
              I believe that the best developers are lifelong learners who stay curious, 
              embrace challenges, and never stop pushing the boundaries of what's possible 
              with technology.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
