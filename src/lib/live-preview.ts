import { siteConfig } from '@/config/Meta';

/**
 * True when the CSP `frame-ancestors` directive lets this site embed the page.
 * Only the enforced header counts; `-report-only` never blocks framing.
 */
function frameAncestorsAllow(csp: string, ourOrigin: URL): boolean {
  const directive = csp
    .split(';')
    .map((part) => part.trim().split(/\s+/))
    .find(([name]) => name?.toLowerCase() === 'frame-ancestors');
  if (!directive) return true;

  return directive.slice(1).some((source) => {
    const s = source.toLowerCase();
    if (s === '*' || s === `${ourOrigin.protocol}`) return true;
    if (s.startsWith("'")) return false; // 'none', 'self'
    const host = s.replace(/^[a-z]+:\/\//, '').split(/[/:]/)[0];
    return host.startsWith('*.')
      ? ourOrigin.hostname.endsWith(host.slice(1))
      : host === ourOrigin.hostname;
  });
}

/**
 * Returns the URL if the live app is reachable and allows being iframed by
 * this site, else null so the caller can fall back to a static cover.
 * Checked server-side because a blocked iframe still fires `onLoad` in the
 * browser and just renders the browser's "refused to connect" page.
 */
export async function getEmbeddableUrl(url: string): Promise<string | null> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null; // '#' and other placeholders
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;

  try {
    const response = await fetch(parsed, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;

    const xfo = response.headers.get('x-frame-options');
    if (xfo && /deny|sameorigin|allow-from/i.test(xfo)) return null;

    const csp = response.headers.get('content-security-policy');
    if (csp && !frameAncestorsAllow(csp, new URL(siteConfig.url))) {
      return null;
    }

    return parsed.href;
  } catch (error) {
    console.error(`Live preview check failed for ${url}:`, error);
    return null;
  }
}
