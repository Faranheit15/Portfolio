/**
 * Spam screening for the contact form. A flagged submission is not sent to
 * Telegram, but is still stored in Netlify Forms with the reason attached, so
 * a false positive can always be recovered from the Netlify dashboard.
 */

/** Hidden field that real visitors never see or fill. */
export const HONEYPOT_FIELD = 'fax';

/** Humans need longer than this to fill four fields; bots post instantly. */
const MIN_FILL_TIME_MS = 3000;

export const MIN_MESSAGE_WORDS = 3;

/** Domains seen sending spam through the form. */
const BLOCKED_EMAIL_DOMAINS = ['jmailservice.com'];

/** Gmail ignores dots, so bots pad addresses like `j.ic.oco.helo2.33@gmail.com`. */
const MAX_GMAIL_DOTS = 2;

// Stock phrases from SEO / lead-gen pitches. One alone can be a genuine
// enquiry ("I need SEO for my site"); two or more is a template.
const PITCH_PATTERNS = [
  /\bseo\b|search engine optimi[sz]ation/i,
  /\btop keywords?\b/i,
  /\b(appear|rank|show(ing)? up)(ing)? (first|on (the )?(first|top) (page|spot))/i,
  /\b(first|top) (page|spot|position) (of|on) google\b/i,
  /\bbacklinks?\b|\bguest post/i,
  /\bwithin 24 hours\b|\bunder 24 hours\b/i,
  /\b(more|extra|targeted|free) (traffic|visitors|leads)\b/i,
  /\bvisitors right away\b/i,
  /\bsend you more (info|information|details)\b/i,
  /\breach we can get you\b/i,
  /\breply (with )?["']?(yes|stop)\b/i,
];
const PITCH_THRESHOLD = 2;

/** Words containing at least two letters — digit strings and stray letters don't count. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => /\p{L}.*\p{L}/u.test(word)).length;
}

interface ContactSubmission {
  email: string;
  message: string;
  honeypot?: string;
  fillTimeMs?: number;
}

/** Returns the reasons a submission looks like spam; empty means deliver it. */
export function getSpamReasons({
  email,
  message,
  honeypot,
  fillTimeMs,
}: ContactSubmission): string[] {
  const reasons: string[] = [];

  if (honeypot) reasons.push('honeypot field filled');

  if (fillTimeMs === undefined) {
    reasons.push('no fill time (request did not come from the form)');
  } else if (fillTimeMs < MIN_FILL_TIME_MS) {
    reasons.push(`form filled in ${fillTimeMs}ms`);
  }

  const [localPart = '', domain = ''] = email.toLowerCase().trim().split('@');

  if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
    reasons.push(`blocked email domain ${domain}`);
  }

  if (
    (domain === 'gmail.com' || domain === 'googlemail.com') &&
    localPart.split('.').length - 1 > MAX_GMAIL_DOTS
  ) {
    reasons.push('dot-padded Gmail address');
  }

  const pitchHits = PITCH_PATTERNS.filter((pattern) =>
    pattern.test(message),
  ).length;
  if (pitchHits >= PITCH_THRESHOLD) {
    reasons.push(`marketing pitch (${pitchHits} phrases)`);
  }

  return reasons;
}
