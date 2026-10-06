# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Faran Mohammad — Next.js 15 App Router + React 19 + TypeScript (strict) + Tailwind v4, deployed to Netlify (live at workwithfaran.com). Runtime is **Bun**; Netlify builds with Node 22.

## Commands

```bash
bun install
bun dev                 # next dev --turbopack
bun run build           # also the Netlify build command
bun start
bun run lint            # next lint (eslint flat config: next/core-web-vitals + next/typescript)
bun run format:all      # BOTH prettier configs, in order — use this, not `format`
bun run knip            # unused files/exports/deps
bun run test-telegram   # script, not a test suite: verifies TELEGRAM_* env + sends a probe message
```

There is **no test framework** in this repo. "Verifying a change" means `bun run build` plus checking the page in `bun dev`.

Type-check with `bunx tsc --noEmit` (tsconfig is `noEmit` already).

### Two Prettier configs (intentional)

`.prettierrc` sorts imports (`@trivago/prettier-plugin-sort-imports`); `.prettierrc.json` sorts Tailwind classes (`prettier-plugin-tailwindcss`). Prettier can't load both plugin sets at once, so lint-staged and `format:all` run the two passes sequentially. Never collapse them into one config.

## Environment

Copy `.env.example` → `.env.local`. Notable keys: `GEMINI_API_KEY` + `GROQ_API_KEY` (chat, either alone works), `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` (contact form — required, not optional), `MEDIUM_USERNAME` / `HASHNODE_BLOG_URL` (blog sources, both have defaults), `NEXT_PUBLIC_URL` (site URL for metadata), `NEXT_PUBLIC_UMAMI_SRC`/`NEXT_PUBLIC_UMAMI_ID`.

## Architecture

### Content lives in `src/config/*.tsx`, not in components

Every section of the site reads from a typed config module: `Hero`, `About`, `Experience`, `Projects`, `Journey`, `Gears`, `Setup`, `Resume`, `Navbar`, `Footer`, `CTA`, `Contact`, `Achievements`, `Github`, `Quote`, `Cat`, `ChatPrompt`, `Meta`. These are `.tsx` because entries embed React icon nodes (e.g. `technologies: [{ name: 'Next.js', icon: <NextJs /> }]` from `src/components/technologies/`). **Content edits belong here**; components stay presentational. `src/components/landing/*` are the homepage sections, composed in order by `src/app/page.tsx`.

### Metadata

`src/config/Meta.tsx` holds `siteConfig` plus a `pageMetadata` record keyed by route path, and exports `generateMetadata(path)`. Every page calls it — adding a route means adding its entry there.

### Content sources per section

- **Blog → Medium + Hashnode, not local MDX.** `src/lib/articles.ts` is the only entry point: `getAllArticles()` (React-`cache`d) merges `lib/medium.ts` (rss2json; Medium is archival) and `lib/hashnode.ts` (direct RSS via `fast-xml-parser`, because Hashnode's GraphQL API is paid-only since May 2026 and rss2json caps at 10 items). Both normalize into `BlogArticle` (`src/types/blog.ts`), so tags are kebab-cased and dates are ISO before anything renders. Cross-posts are deduped by title word overlap, with Hashnode as the canonical copy, and slug collisions get a `-medium` suffix. Hashnode descriptions come from each post page's `<meta name="description">`, since the RSS only has a mid-word brief. Covers use only the RSS `enclosure`, because `og:image` is a generated title card. Medium covers are intentionally `''` (rss2json returns no thumbnail; the cover is the first figure in the body), so cards fall back to the title gradient. `/blog/[slug]` renders sanitized HTML through `ArticleContent`. `src/lib/blog.ts` + `BlogContent.tsx` are the older local-MDX path and are unused (`src/data/blog/` doesn't exist).
- **Projects → MDX with GitHub-README fallback.** `getProjectCaseStudy()` in `src/lib/project.ts` tries `src/data/projects/<slug>.mdx`, else fetches the repo's `HEAD/README.md` (revalidate 3600) and synthesizes frontmatter from the `Projects` config. `contentSource` tells the renderer which it got. Prev/next navigation comes from array order in `src/config/Projects.tsx`, matched on `projectDetailsPageSlug`.
- **Journey →** single `src/data/journey/journey.mdx` via `src/lib/journey.ts`.

MDX is rendered with `next-mdx-remote` + `@shikijs/rehype`, with per-section component maps (`BlogComponents.tsx`, `ProjectComponents.tsx`).

### API routes (`src/app/api/`)

Both routes share the same shape: Zod schema → in-memory IP rate limit (`Map`, 5 req/min, resets per window) → work → `X-RateLimit-*` headers, with `GET` returning 405. The rate-limit store is per-instance and resets on cold start; that's accepted for this site.

- `chat/route.ts` — streams SSE. Tries Gemini models in order (`gemini-2.5-pro` → `flash` → `flash-lite`) via raw `fetch` + `eventsource-parser`, then falls back to Groq (`llama-3.3-70b-versatile`) via the SDK. User text (including history) passes through `sanitizeInput()` prompt-injection scrubbing; the persona is `src/config/ChatPrompt.ts`.
- `contact/route.ts` — runs `getSpamReasons()` (`src/lib/contact-spam.ts`: honeypot `fax`, `fillTimeMs` < 3s or missing, blocked domains, dot-padded Gmail, ≥2 sales-pitch phrases). Flagged submissions skip Telegram but still get a normal 200 so bots can't adapt. Clean ones go to Telegram, and a Telegram failure fails the request. **Netlify Forms archiving happens in the browser, not here** (`submitToNetlifyForms` in `ContactForm.tsx` POSTs to the static `public/__forms.html`). Netlify only accepts posts to static files, and a background POST from this serverless route gets frozen before it completes. `__forms.html` exists solely so Netlify registers the `contact` form (with `netlify-honeypot="fax"`) at deploy time; keep its fields in sync with the form.

### Styling

Tailwind v4, configured entirely in `src/app/globals.css` (no `tailwind.config`): `@theme inline` maps shadcn CSS variables, `@custom-variant dark (&:is(.dark *))` drives dark mode via `next-themes`, OKLch palette, local Hanken Grotesk `@font-face` (`.font-hanken-grotesk`, applied on `<body>`). Blog typography scales off `--blog-font-size`, which `FontSizeControls` mutates at runtime. shadcn/ui is vendored in `src/components/ui/` (new-york, neutral, `rsc: true`, lucide) — generate new primitives with the shadcn CLI rather than hand-writing them.

### Root layout wrappers

`src/app/layout.tsx` nests `ViewTransitions` (next-view-transitions) → `ThemeProvider` → `ReactLenis root`, then the global chrome (Navbar, OnekoCat, Quote, Footer, ChatBubble, UmamiAnalytics). Use `Link` from `next-view-transitions`, not `next/link`, so page transitions animate. `src/lib/lenis.ts` is a `'use client'` re-export of `lenis/react` so server components can import it.

## Bun/Netlify gotchas

These are load-bearing; several past commits exist only to fix them.

- `src/instrumentation.ts` patches `globalThis.localStorage` with a no-op. Bun sets `window = globalThis` server-side, which makes `next-themes` skip its SSR guard and hit Bun's broken `localStorage`. Removing this breaks SSR.
- `src/pages/` (`404.tsx` returning `null`, pass-through `_app.tsx`, `_document.tsx`) coexists with the App Router purely to satisfy prerendering. `404.tsx` must stay hook-free — a `useRouter` there crashes the build. Real 404 UI is `src/app/not-found.tsx`. Don't add routes under `src/pages/`.
- `next.config.ts` sets `images.unoptimized: true` for Netlify; any new external image host still needs a `remotePatterns` entry.
- Husky is installed (`prepare`) with lint-staged wired in `package.json`, but no hook scripts are committed under `.husky/` — formatting is not actually enforced on commit.
