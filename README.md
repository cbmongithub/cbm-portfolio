<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
  <div>
    <h1 style="margin:0;">cbm-portfolio</h1>
  </div>
  <div>
    <a href="https://github.com/cbmongithub/cbm-portfolio/actions/workflows/ci.yml">
      <img src="https://github.com/cbmongithub/cbm-portfolio/actions/workflows/ci.yml/badge.svg" alt="Build & Verify" />
    </a>
  </div>
</div>

[![OG Image](public/og-image.png)](public/og-image.png)

## Stack

- Next.js 16 (App Router), React 19
- Tailwind CSS v4
- TypeScript
- Vercel Analytics + Speed Insights
- Bun

## Tooling

- Formatting: Prettier with `prettier-plugin-tailwindcss` (tailwind class sorting), runs in CI with `--write`.
- Linting: ESLint flat config with Next core-web-vitals + TypeScript presets; `eslint-plugin-simple-import-sort` enforces grouped imports; `eslint-plugin-tailwindcss` checks class ordering/syntax (v4 aware).
- Class ordering: Tailwind classes auto-sorted by Prettier; keep semantic grouping minimal, the formatter will reorder.
- Imports: Sorted into groups (react/next/external → hooks → components → lib → types → alias → relative → relative parent) via simple-import-sort.
- Styles: Global tokens and theme toggles live in `src/app/globals.css`; dark-first via `html.dark`, light via `prefers-color-scheme: light`.
- Content path: MDX lives in `src/content/blog`; `src/lib/posts.ts` reads from there (frontmatter `title`, `publishedAt`, `summary`, `image`).

## Scripts

- `bun run dev` — start dev server
- `bun run build` — production build
- `bun run build:verify` — test → typecheck → prettier → lint → build (mutating)
- `bun run test` — bun tests in `tests/`
- `bun run lint` — eslint with auto-fix
- `bun run prettier` — format all files

## Pages

- Routes: `/home`, `/about`, `/portfolio`, `/blog`, `/blog/:slug`, `/contact`
- SEO helpers: `robots.ts`, `sitemap.ts`, metadata in `layout.tsx`

## Roadmap (living)

- [x] Scaffolded core routes (home, about, portfolio, blog index/detail, contact)
- [x] SEO helpers wired (metadata, robots, sitemap)
- [x] ESLint + Prettier configured (with Tailwind sorting, import sorting)
- [x] Tailwind v4 base tokens/theme set up
- [ ] Replace placeholder page content with real sections and components
- [ ] Introduce Portfolio detail page that dives deeper into projects (architecture, patterns, etc.)
- [ ] Add shiki/code-hilite (e.g., Sugar High) and build code block components
- [ ] Build blog rendering pipeline (MDX → React) and listing
- [ ] Add per-post OG image generation
- [ ] Add navigation/footer components wired to `NAV_LINKS`/`FOOTER_LINKS`
- [ ] Add theme-aware components using CSS tokens; consider light toggle
- [ ] Add tests for posts parsing and sitemap/robots output
- [ ] Add CI badge
- [ ] Deploy to Vercel and verify analytics
- [ ] Post-launch performance and accessibility optimizations
