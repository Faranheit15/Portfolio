import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Netlify will pick this up
      await fetch("/", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Message Sent!",
        description:
          "Thank you for reaching out. I'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ffaranm15@gmail.com",
      href: "mailto:ffaranm15@gmail.com",
      description: "Send me an email for inquiries",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "faran-mohammad",
      href: "https://www.linkedin.com/in/faran-mohammad/",
      description: "Connect with me professionally",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Faranheit15",
      href: "https://github.com/Faranheit15",
      description: "Check out my open source work",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote / Hyderabad, India",
      href: null,
      description: "Available for remote collaboration",
    },
  ];

  const quickActions = [
    {
      title: "Project Collaboration",
      description:
        "Let's discuss your project requirements and how I can help bring your ideas to life.",
      action: "Start a Project",
    },
    {
      title: "Technical Consultation",
      description:
        "Need advice on technology choices, architecture, or best practices? I'm here to help.",
      action: "Get Consultation",
    },
    {
      title: "Speaking & Mentoring",
      description:
        "Interested in having me speak at your event or mentor your development team?",
      action: "Book a Session",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray">
        <div className="container-custom">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate on your next project? I'd love to hear about
              your ideas and discuss how we can bring them to life together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-serif text-primary">
                    Send me a message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form
                    name="contact" // <-- must match hidden field below
                    method="POST"
                    data-netlify="true" // <-- enable Netlify Forms
                    netlify-honeypot="bot-field" // <-- optional spam trap
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="bot-field" />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-primary"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-primary"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-primary"
                      >
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-primary"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, questions, or how I can help you..."
                        rows={6}
                        required
                        className="border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg hover-lift"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-serif text-primary">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    const content = (
                      <div className="flex items-start gap-4 group">
                        <div className="p-2 rounded-lg bg-claude-warm-gray group-hover:bg-accent transition-colors">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-primary">
                            {info.label}
                          </div>
                          <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            {info.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {info.description}
                          </div>
                        </div>
                      </div>
                    );

                    return info.href ? (
                      <a
                        key={info.label}
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover-lift transition-transform duration-200"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={info.label}>{content}</div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border-0 shadow-lg bg-claude-warm-gray">
                <CardContent className="p-6 text-center space-y-3">
                  <Clock className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold text-primary">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to emails within 24 hours during
                    business days.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-claude-warm-gray">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              How Can I Help?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Whether you're starting a new project or need technical guidance,
              I'm here to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card
                key={action.title}
                className="border-0 shadow-lg hover-glow transition-all duration-300 text-center"
              >
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                  <Button
                    variant="outline"
                    className="hover-lift"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        subject: action.title,
                      }));
                      document
                        .getElementById("subject")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Every great project starts with a conversation. I'm excited to hear
            about your ideas and explore how we can bring them to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ffaranm15@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-background text-primary rounded-lg font-medium hover:bg-claude-warm-gray transition-colors hover-lift"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Me Directly
            </a>
            <a
              href="https://workwithfaran.com/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary-foreground text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground hover:text-primary transition-colors hover-lift"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
