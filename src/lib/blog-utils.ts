const DESCRIPTION_MAX_LENGTH = 200;

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

/** Decode the HTML entities feeds leave in titles and meta tags (e.g. `&amp;`). */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const code =
        entity[1].toLowerCase() === 'x'
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/** Strip all HTML tags and collapse whitespace — used for plain-text excerpts. */
export function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Trim plain text to a card-friendly length on a word boundary, adding an
 * ellipsis only when something was actually cut.
 */
export function toExcerpt(
  text: string,
  maxLength = DESCRIPTION_MAX_LENGTH,
): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;

  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.replace(/[\s.,;:!?—–-]+$/, '')}…`;
}

/** Normalize a tag so the same topic matches across platforms: `Custom Rom` / `#custom-rom` → `custom-rom`. */
export function normalizeTag(tag: string): string {
  return decodeEntities(tag)
    .toLowerCase()
    .replace(/^#+/, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function uniqueTags(tags: string[]): string[] {
  return Array.from(new Set(tags.map(normalizeTag).filter(Boolean)));
}

/** Last path segment of an article URL, ignoring query string and trailing slash. */
export function slugFromUrl(url: string): string {
  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || url;
  } catch {
    const segments = url.split('?')[0].split('/').filter(Boolean);
    return segments[segments.length - 1] || url;
  }
}
