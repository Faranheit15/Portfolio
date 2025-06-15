
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Faranheit15',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/faran-mohammad/',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:ffaranm15@gmail.com',
      icon: Mail,
    },
  ];

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-claude-warm-gray border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-primary">
              Faran Mohammad
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fullstack Frontend Developer crafting intelligent, scalable user experiences 
              with modern web technologies and AI integration.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-accent transition-colors group"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:ffaranm15@gmail.com"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ffaranm15@gmail.com
              </a>
              <a
                href="https://workwithfaran.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                workwithfaran.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Faran Mohammad. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with React, Tailwind CSS, and lots of ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
