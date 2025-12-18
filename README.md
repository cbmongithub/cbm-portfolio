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

[![Github Repo Image](public/repo-image.png)](public/repo-image.png)

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
- Content: TSX in `src/content/blog`; metadata exported per file.

## Custom Blog Engine (“Hand-Rolled MDX”)

Instead of pulling in MDX, frontmatter parsers, or `@tailwindcss/typography`, the blog is authored as plain `.tsx` modules placed in `src/content/blog`. Each post exports two things:

```tsx
import { formatIsoDate, formatModifiedDate, type PostMetadata } from "@/lib/posts";
import { generateOgImageUrl } from "@/lib/config/metadata";

export const metadata: PostMetadata = {
  slug: "an-example-slug",
  title: "Example Blog Title",
  description: "An example description",
  tags: ["nextjs", "react"],
  authors: "Christian B. Martinez",
  get publishedTime() {
    return formatIsoDate("2025-12-14");
  },
  get modifiedTime() {
    return formatModifiedDate(this.publishedTime, "2025-12-16");
  },
  get ogImageData() {
    return {
      title: this.title,
      description: this.description,
      route: `/blog/${this.slug}`,
    };
  },
  get image() {
    return generateOgImageUrl(this.ogImageData);
  },
};

export default function Article() {
  return (
    <>
      <Figure
        title="This is an example title"
        imageSrc="https://example.com"
        caption="Photo by Bob"
        priority
      />
      <Heading level={2}>...</Heading>
      <Text>...</Text>
      <CodeBlock language="ts" code={`const nextConfig = { cacheComponents: true };`} />
    </>
  );
}
```

### Why roll my own?

- **Zero MDX pipeline** – No remark/rehype transforms, no shared runtime between client and server. A post is just a React Server Component, so it’s compiled once and streamed as plain HTML.
- **Self-contained metadata** – The `metadata` object behaves like frontmatter but stays type-safe and can expose computed getters (`ogImageData`, `image`). Post pages import it and Next’s metadata helpers consume it directly.
- **Custom typography primitives** – Components such as `Heading`, `Text`, `Lead`, `Quote`, `List`, `Table`, `Surface`, `Figure`, and `CodeBlock` live under `src/components/ui/typography`. They encapsulate spacing, anchors, color tokens, and responsive behavior. Switching design systems is a matter of editing those components, not prose CSS overrides.
- **Tiny HTML footprint** – Because everything is server-rendered TSX, there’s no hydration cost unless a post deliberately imports a client component. Most posts deliver pure static markup.
- **Blueprint for portfolios** – The goal is to show engineering choices, not just content. Keeping metadata, layout, and rendering logic in one module highlights the architecture in a way frontmatter/MDX often hides.

### Date helpers & OG metadata

- `formatIsoDate(value?)` accepts `"YYYY-MM-DD"`, `Date.now()`, or a `Date` instance and always returns a canonical ISO timestamp without forcing every post to remember the trailing `"T00:00:00.000Z"`.
- `formatModifiedDate(published, updated?)` reuses the published timestamp when no updated date is provided so crawlers see accurate `lastModified` data.
- `ogImageData` is a getter as well, ensuring OG routes, titles, and descriptions stay in sync with whatever the post metadata currently returns.

### Comparing to Tailwind Prose + MDX

| Concern       | Hand-rolled TSX                                              | Tailwind Prose / MDX                                                          |
| ------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Dependencies  | React + Next only                                            | `@mdx-js/loader`, remark, rehype, tailwind typography plugin                  |
| Styling       | Explicit components ensure consistent spacing + semantics    | Global prose cascade; overriding specifics can get verbose                    |
| Metadata      | Plain object with getters, no parsing step                   | YAML/gray-matter parsing + type guards                                        |
| Authoring     | JSX (great for devs, less friendly for non-dev contributors) | Markdown/MDX is more approachable for large content teams                     |
| Extensibility | Add new primitives as React components                       | Leverage existing MDX plugins for embeds/shortcodes                           |
| Scale         | Works best for handfuls of curated posts                     | MDX/frontmatter shines when dozens of posts and multiple authors are involved |

For this portfolio (targeting ~10 articles), the trade-off favors control and minimalism. If publishing volume grows or non-dev authors get involved, the architecture can pivot to MDX or a CMS-backed pipeline without rewriting the current posts.

### Typography & Rendering Details

- **Headings** (`Heading`) add scroll-margin anchors and optional `asChild` slots for custom tags while keeping consistent `pt/pb`.
- **Text primitives**: `Text`, `Lead`, `Small`, `Quote`, `List` (switchable ordered/unordered), `InlineCode`, and `Surface`.
- **Tables**: `Table`, `Tr`, `Th`, `Td` enforce consistent padding and border tokens.
- **Code**: `CodeBlock` uses [Bright](https://github.com/codehike/bright) for dual-theme SSR highlighting; inline snippets use `InlineCode`.
- **Figures**: `Figure` wraps `next/image`, accepts `blurDataURL`, caption, priority, and enforces the 1200×630 aspect.
- **Content Loader**: `blog/[slug]/page.tsx` uses `loadPost()` (cached) to import the component + metadata, enforce spacing, and render `ScrollProgress`, tags, and badges.

## Scripts

- `bun run dev` — start dev server
- `bun run build` — production build
- `bun run build:verify` — test → typecheck → prettier → lint → build (mutating)
- `bun run test` — bun tests in `tests/`
- `bun run lint` — eslint with auto-fix
- `bun run prettier` — format all files

## Pages

- Routes: `/`, `/blog`, `/blog/:slug`
- SEO helpers: `robots.ts`, `sitemap.ts`, metadata in `layout.tsx`

## Dependencies (versions)

| Category  | Packages                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Core      | `next 16.0.7`, `react 19.2.1`, `react-dom 19.2.1`, `@radix-ui/react-icons 1.3.2`                                                                                                                                               |
| Code      | `bright ^1.0.0`                                                                                                                                                                                                                |
| Styling   | `tailwindcss 4.1.17`, `prettier-plugin-tailwindcss 0.7.2`, `@tailwindcss/postcss 4.1.17`                                                                                                                                       |
| Lint/Type | `eslint 9.39.1`, `eslint-config-next 16.0.7`, `eslint-plugin-simple-import-sort 12.1.1`, `eslint-plugin-tailwindcss 4.0.0-beta.0`, `typescript 5.9.3`, `@types/node 24.10.1`, `@types/react 19.2.7`, `@types/react-dom 19.2.3` |
| Analytics | `@vercel/analytics 1.6.1`, `@vercel/speed-insights 1.3.1`                                                                                                                                                                      |
| Runtime   | `bun 1.2.21`                                                                                                                                                                                                                   |

## Roadmap (living)

- [x] Scaffolded core routes (home/index, blog index/detail)
- [x] SEO helpers wired (metadata, robots, sitemap with lastModified)
- [x] ESLint + Prettier configured (Tailwind/import sorting)
- [x] Tailwind v4 tokens/theme set up
- [x] Blog rendering pipeline (TSX posts + dynamic import) and listing
- [x] Write tests for posts parsing, sitemap/robots output, and button variants
- [x] Theme-aware components; consider light toggle
- [x] Code highlight refinements and code block components
- [x] Unified button/badge/callout variants with shared color tokens
- [x] Per-post OG image generation (shared generator for /blog)
- [x] Replace placeholder page content with real sections/components
- [x] SEO generation extracted from post meta
- [ ] Portfolio detail page (architecture, patterns, etc.)
- [ ] Blog rich layout enhancements - tags, filtering blogs, next/previous blog, further reading, image captions underneath blog, blog author with social links, blog footer cta?)
- [x] Per-post OG image generation
- [ ] Navigation/footer wired to `NAV_LINKS`/`FOOTER_LINKS`
- [ ] Deploy to Vercel and verify analytics
- [ ] Post-launch performance and accessibility optimizations
