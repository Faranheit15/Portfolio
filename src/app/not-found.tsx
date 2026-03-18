import Container from '@/components/common/Container';
import { Link } from 'next-view-transitions';

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-6 py-2 text-sm font-medium transition-colors"
      >
        Go Home
      </Link>
    </Container>
  );
}
