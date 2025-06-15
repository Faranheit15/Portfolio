
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container-custom text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-9xl font-serif font-bold text-primary/20">404</h1>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hover-lift">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-lift">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
