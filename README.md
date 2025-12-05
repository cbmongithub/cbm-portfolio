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
- Linting: ESLint flat config (Next core-web-vitals + TS), `eslint-plugin-simple-import-sort` for grouped imports, `eslint-plugin-tailwindcss` for class order/syntax (v4 aware).
- Imports: Ordered react/next/external → hooks → components → lib → types → alias → relative via simple-import-sort.
- Styles: Color tokens live in `styles/globals.css` (light/dark via CSS vars); no prose plugin.
- Content: MDX in `src/content/blog`; parsed by `src/lib/posts.ts` (frontmatter: `title`, `publishedAt`, `summary`, `image`).

## Typography & MDX

Instead of using something like `@tailwindcss/typography` I opted to keep output lean and fully controlled. All text/UI primitives are React components in `src/components/typography.tsx`, rendered through `src/components/mdx-components.tsx`. This keeps bundle size small, using just `next-mdx-remote/rsc` and `sugar-high` for the entire MDX solution.

- **Headings**: `Heading` adds hash anchors via `next/link`, sized with our tokens.
- **Text**: `Text`, `Lead`, `Small`, `Quote`, `List` (`as="ol"` for ordered), `CodeInline`, `Surface` (card), `Prose` (spacing wrapper).
- **Tables**: `Table`, `Tr`, `Th`, `Td` for consistent borders/padding.
- **Code**: `CodeBlock` (SugarHigh highlight, supports fence `title="..."`), `CodeInline`.
- **Images**: `img` maps to `next/image` with rounding/default sizing; remote images allowed for testing.
- **MDX map**: `mdx-components.tsx` maps HTML tags and shortcodes to these primitives; only a tiny remark pass for code-fence meta.
- **Why**: Granular control, consistent spacing, and token-driven colors without sprinkling `dark:` utilities or prose defaults. Theme tokens are in `styles/globals.css`; typography handles layout.

Content lives in `src/content/blog/*.mdx`; `blog/[slug]/page.tsx` renders posts with `MDXComponents`.

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
- [x] ESLint + Prettier configured (Tailwind/import sorting)
- [x] Tailwind v4 tokens/theme set up
- [x] Blog rendering pipeline (MDX → React) and listing
- [ ] Parse titles from frontmatter data
- [ ] Replace placeholder page content with real sections/components
- [ ] Portfolio detail page (architecture, patterns, etc.)
- [ ] Add code highlight refinements and code block components
- [ ] Per-post OG image generation
- [ ] Navigation/footer wired to `NAV_LINKS`/`FOOTER_LINKS`
- [ ] Theme-aware components; consider light toggle
- [ ] Tests for posts parsing and sitemap/robots output
- [ ] Deploy to Vercel and verify analytics
- [ ] Post-launch performance and accessibility optimizations
