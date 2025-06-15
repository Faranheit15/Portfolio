import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import toolsData from "@/data/tools.json";

const Tools = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-claude-cream to-claude-warm-gray">
        <div
          className="container-custom text-center space-y-6 transition-all duration-1000 \
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary">
            Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Useful tools and resources I use in my day-to-day workflow.
          </p>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="py-20 bg-claude-warm-gray">
        <div className="container-custom space-y-16">
          {toolsData.tools.map((category) => (
            <div key={category.id} className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-primary">
                {category.category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.tools.map((tool) => (
                  <Card
                    key={tool.name}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6 space-y-4 text-center">
                      <div className="text-5xl">{tool.icon}</div>
                      <h3 className="text-xl font-bold text-primary">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {tool.description}
                      </p>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-medium underline text-primary hover:text-claude-accent"
                      >
                        Learn More
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Want to Collaborate?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Feel free to reach out if you have any questions or suggestions
            about these tools.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-background text-primary rounded-lg font-medium hover:bg-claude-warm-gray transition-colors hover-lift"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Tools;
