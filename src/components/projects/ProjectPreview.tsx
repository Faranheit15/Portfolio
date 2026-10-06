import { TitleGradient } from '../common/TitleGradient';

interface ProjectPreviewProps {
  title: string;
  /** From `getEmbeddableUrl`; null renders the gradient instead. */
  embedUrl: string | null;
}

/**
 * Fills its (aspect-video) parent with a scaled-down, non-interactive render
 * of the live app. The iframe is 4x the card's size and scaled to 25%, so the
 * app lays out at desktop width rather than its mobile breakpoint.
 */
export function ProjectPreview({ title, embedUrl }: ProjectPreviewProps) {
  if (!embedUrl) {
    return <TitleGradient title={title} />;
  }

  return (
    <div className="bg-muted absolute inset-0 overflow-hidden">
      <iframe
        src={embedUrl}
        title={`${title} live preview`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden
        sandbox="allow-scripts allow-same-origin"
        className="pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-25 border-0"
      />
    </div>
  );
}
