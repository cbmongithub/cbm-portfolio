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

- Formatting: Prettier + `prettier-plugin-tailwindcss` (class sorting), runs in CI with `--write`.
- Linting: ESLint flat config (Next core-web-vitals + TS); `eslint-plugin-simple-import-sort` groups imports; `eslint-plugin-tailwindcss` enforces class order/syntax (v4 aware).
- Imports: Ordered react/next/external → hooks → components → lib → types → alias → relative via simple-import-sort.
- Styles: Color tokens live in `styles/globals.css` (light/dark via CSS vars); no prose plugin.
- Content: MDX in `src/content/blog`; parsed by `src/lib/posts.ts` (frontmatter: `title`, `publishedAt`, `summary`, `image`).

## Typography & MDX

I skipped `@tailwindcss/typography` to keep output lean and predictable. Instead, text/UI primitives live in `src/components/typography.tsx` and are wired into MDX through `src/components/mdx-components.tsx`. The only MDX-specific deps are `next-mdx-remote/rsc` plus `sugar-high` for highlighting, which keeps the pipeline tiny.

- **Headings** add hash anchors via `next/link` and respect our spacing tokens.
- **Text primitives**: `Text`, `Lead`, `Small`, `Quote`, `List` (`as="ol"` for ordered), `CodeInline`, `Surface` (card), `Prose` (wrapper spacing).
- **Tables**: `Table`, `Tr`, `Th`, `Td` keep borders/padding consistent.
- **Code**: `CodeBlock` (SugarHigh highlight), `CodeInline`.
- **Images**: `img` maps to `next/image` with rounding/default sizing (remote allowed).
- **Why**: One place for spacing and color decisions, no prose defaults, no scattered `dark:` utilities. Theme tokens stay in `styles/globals.css`; typography handles layout.

Content lives in `src/content/blog/*.mdx`; `blog/[slug]/page.tsx` renders posts through `MDXComponents`.

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

## Dependencies (versions)

| Category   | Packages |
| ---------- | -------- |
| Core       | `next 16.0.7`, `react 19.2.1`, `react-dom 19.2.1`, `@radix-ui/react-icons 1.3.2` |
| MDX        | `next-mdx-remote 5.0.0`, `sugar-high 0.9.5` |
| Styling    | `tailwindcss 4.1.17`, `prettier-plugin-tailwindcss 0.7.2`, `@tailwindcss/postcss 4.1.17` |
| Lint/Type  | `eslint 9.39.1`, `eslint-config-next 16.0.7`, `eslint-plugin-simple-import-sort 12.1.1`, `eslint-plugin-tailwindcss 4.0.0-beta.0`, `typescript 5.9.3`, `@types/node 24.10.1`, `@types/react 19.2.7`, `@types/react-dom 19.2.3` |
| Analytics  | `@vercel/analytics 1.6.1`, `@vercel/speed-insights 1.3.1` |
| Runtime    | `bun 1.2.21` |

## Roadmap (living)

- [x] Scaffolded core routes (home, about, portfolio, blog index/detail, contact)
- [x] SEO helpers wired (metadata, robots, sitemap)
- [x] ESLint + Prettier configured (Tailwind/import sorting)
- [x] Tailwind v4 tokens/theme set up
- [x] Blog rendering pipeline (MDX → React) and listing
- [x] Write tests
- [ ] Parse titles from frontmatter data
- [ ] Replace placeholder page content with real sections/components
- [ ] SEO generation extracted from MDX pages
- [ ] Portfolio detail page (architecture, patterns, etc.)
- [ ] Code highlight refinements and code block components
- [ ] Per-post OG image generation
- [ ] Navigation/footer wired to `NAV_LINKS`/`FOOTER_LINKS`
- [ ] Theme-aware components; consider light toggle
- [ ] Tests for posts parsing and sitemap/robots output
- [ ] Deploy to Vercel and verify analytics
- [ ] Post-launch performance and accessibility optimizations
