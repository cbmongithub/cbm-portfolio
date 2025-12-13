/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import { CodeBlock } from "@/components/ui/code-block";
import {
  Heading,
  InlineCode,
  List,
  Quote,
  Table,
  Td,
  Text,
  Th,
  Tr,
} from "@/components/ui/typography";

import type { PostMetadata } from "@/lib/posts";

export const metadata: PostMetadata = {
  slug: "nextjs-16",
  title: "What's New in Next.js 16: A Deep Dive",
  publishedAt: "2025-12-15",
  description:
    "The Next.js team just dropped version 16, and honestly, it's packed with some game-changing improvements.",
  image: "/og-image.png",
};

export default function NextJS16Article() {
  return (
    <>
      <Text>
        This isn't just another incremental update. We're talking major improvements to
        Turbopack performance, a complete rethinking of how caching works, and some
        architectural changes that will impact how you build Next.js apps. Let me walk you
        through the highlights.
      </Text>

      <Heading level={2}>The Big New Features</Heading>

      <Text>First up, here's what landed since the beta release:</Text>

      <List>
        <li>
          <strong>Cache Components</strong> – A completely new approach to caching that
          leverages Partial Pre-Rendering and gives you explicit control over what gets
          cached
        </li>
        <li>
          <strong>Next.js Devtools MCP</strong> – AI-powered debugging tools that
          understand your Next.js app's context
        </li>
        <li>
          <strong>The Great Middleware Rename</strong> –{" "}
          <InlineCode>middleware.ts</InlineCode> becomes <InlineCode>proxy.ts</InlineCode>{" "}
          for better clarity
        </li>
        <li>
          <strong>Developer Experience Wins</strong> – Way better logging so you can
          actually see where your build time goes
        </li>
      </List>

      <Text>
        And if you've been following the beta releases, you already know about these
        features that are now stable:
      </Text>

      <List>
        <li>
          <strong>Turbopack is now the default</strong> – Say goodbye to webpack (unless
          you need it) and hello to 5-10x faster Fast Refresh
        </li>
        <li>
          <strong>File system caching for Turbopack</strong> – Your dev server restarts
          just got way faster
        </li>
        <li>
          <strong>React Compiler support</strong> – Automatic memoization without lifting
          a finger
        </li>
        <li>
          <strong>Build Adapters API</strong> – For deployment platforms to hook into the
          build process
        </li>
        <li>
          <strong>Smarter routing</strong> – Layout deduplication and incremental
          prefetching make navigation feel instant
        </li>
        <li>
          <strong>New caching APIs</strong> – <InlineCode>updateTag()</InlineCode> and an
          updated <InlineCode>revalidateTag()</InlineCode>
        </li>
        <li>
          <strong>React 19.2 goodies</strong> – View Transitions,{" "}
          <InlineCode>useEffectEvent()</InlineCode>, and more
        </li>
      </List>

      <Heading level={3}>Ready to Upgrade?</Heading>

      <Text>
        The Next.js team built an automated upgrade tool that handles most of the heavy
        lifting. Here's how to get started:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`# Use the automated upgrade CLI
npx @next/codemod@canary upgrade latest

# ...or upgrade manually
npm install next@latest react@latest react-dom@latest

# ...or start a new project
npx create-next-app@latest`}
      />

      <Text>
        The codemod is pretty smart, but for edge cases, you'll want to check out the full
        upgrade guide in the docs.
      </Text>

      <Heading level={2}>Let's Talk About Cache Components</Heading>

      <Text>
        This is probably the most significant change in Next.js 16. Cache Components
        fundamentally change how you think about caching in Next.js.
      </Text>

      <Text>
        Here's the thing: previous versions of the App Router had implicit caching that,
        let's be honest, confused a lot of developers. You weren't always sure what was
        cached and what wasn't. Cache Components flip the script by making caching
        entirely opt-in through a new <InlineCode>"use cache"</InlineCode> directive.
      </Text>

      <Text>
        Now, everything is dynamic by default. Pages, layouts, and API routes all execute
        at request time unless you explicitly cache them. This is a huge win for developer
        expectations – what you write is what runs, no surprises.
      </Text>

      <Text>
        But here's where it gets really interesting: Cache Components complete the vision
        of Partial Pre-Rendering (PPR) that the team introduced back in 2023. Before PPR,
        you had to choose whether a route was static or dynamic – there was no middle
        ground. PPR let you mix static and dynamic content on the same page using Suspense
        boundaries, but now Cache Components give you fine-grained control over exactly
        what gets cached and for how long.
      </Text>

      <Text>To enable it, just add this to your config:</Text>

      <CodeBlock
        language="ts"
        title="next.config.ts"
        code={`const nextConfig = {
  cacheComponents: true,
};

export default nextConfig;`}
      />

      <Text>
        The team is planning to share more details at Next.js Conf, and I'm expecting deep
        dives in the docs soon. This is definitely a feature worth paying attention to.
      </Text>

      <Quote>
        <strong>Important note:</strong> The old <InlineCode>experimental.ppr</InlineCode>{" "}
        flag is gone. Cache Components is the new way forward, so if you were using PPR in
        beta, you'll need to migrate.
      </Quote>

      <Heading level={2}>AI-Powered Debugging with MCP</Heading>

      <Text>
        Next.js 16 introduces something I didn't expect to see in a framework release:
        built-in AI debugging support through the Model Context Protocol (MCP).
      </Text>

      <Text>What does this actually mean for you? Well, AI assistants can now:</Text>

      <List>
        <li>
          <strong>Understand your Next.js app</strong> – They know about routing, caching,
          and rendering behaviors specific to Next.js
        </li>
        <li>
          <strong>Access unified logs</strong> – No more switching between browser and
          server console tabs
        </li>
        <li>
          <strong>Read your errors automatically</strong> – Stack traces get sent to your
          AI assistant without you copying and pasting
        </li>
        <li>
          <strong>Know what page you're on</strong> – Context-aware debugging based on
          your current route
        </li>
      </List>

      <Text>
        This isn't just about making debugging easier – it's about letting AI tools
        understand the full context of your Next.js application so they can give you
        better, more specific help. Pretty cool stuff.
      </Text>

      <Heading level={2}>Goodbye middleware.ts, Hello proxy.ts</Heading>

      <Text>
        Okay, this one might seem like just a rename, but there's a good reason behind it.
        The file formerly known as <InlineCode>middleware.ts</InlineCode> is now{" "}
        <InlineCode>proxy.ts</InlineCode>.
      </Text>

      <Text>
        The name change makes it clearer what this file actually does: it sits at the
        network boundary of your app and intercepts requests. Plus, it now runs
        exclusively on the Node.js runtime, which means more predictable behavior.
      </Text>

      <Text>Here's how the migration looks:</Text>

      <CodeBlock
        language="ts"
        title="proxy.ts"
        code={`export default function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url));
}`}
      />

      <Text>
        Just rename your file from <InlineCode>middleware.ts</InlineCode> to{" "}
        <InlineCode>proxy.ts</InlineCode>, change the exported function name to{" "}
        <InlineCode>proxy</InlineCode>, and you're done. The logic stays exactly the same.
      </Text>

      <Quote>
        <strong>Heads up:</strong> You can still use{" "}
        <InlineCode>middleware.ts</InlineCode> for Edge runtime cases, but it's officially
        deprecated. Start planning your migration now.
      </Quote>

      <Heading level={2}>Build Logs That Actually Help</Heading>

      <Text>
        If you've ever stared at a slow Next.js build wondering where all the time went,
        you'll appreciate this. The dev server and build logs now show you exactly where
        time is being spent.
      </Text>

      <Text>Development requests now break down into:</Text>

      <List>
        <li>
          <strong>Compile time</strong> – How long routing and compilation take
        </li>
        <li>
          <strong>Render time</strong> – How long your code and React rendering take
        </li>
      </List>

      <Text>And builds now show timing for each step in the process:</Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`   ▲ Next.js 16 (Turbopack)

 ✓ Compiled successfully in 615ms
 ✓ Finished TypeScript in 1114ms
 ✓ Collecting page data in 208ms
 ✓ Generating static pages in 239ms
 ✓ Finalizing page optimization in 5ms`}
      />

      <Text>
        This might seem like a small thing, but trust me – when you're optimizing build
        times, knowing where the bottlenecks are is invaluable.
      </Text>

      <hr className="border-border my-8 border-t" />

      <Heading level={2}>Turbopack: Now Stable and Default</Heading>

      <Text>
        Let's talk about the elephant in the room: Turbopack is now the default bundler
        for all Next.js projects. This has been in beta for a while, and the numbers are
        impressive.
      </Text>

      <Text>
        More than 50% of Next.js 15.3+ dev sessions are already using it, and for good
        reason:
      </Text>

      <List>
        <li>Production builds are 2-5× faster</li>
        <li>Fast Refresh is up to 10× faster</li>
      </List>

      <Text>
        For most developers, this is a free performance win. You don't need to configure
        anything – it just works. But if you have custom webpack configuration that you're
        not ready to migrate, you can opt back into webpack:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`next dev --webpack
next build --webpack`}
      />

      <Heading level={3}>File System Caching Makes Dev Restarts Instant</Heading>

      <Text>
        One of my favorite beta features is now available: file system caching for
        Turbopack. If you work on a large codebase, you know the pain of waiting for the
        dev server to boot up after a restart.
      </Text>

      <Text>
        With file system caching, Turbopack saves compiled artifacts to disk. When you
        restart your dev server, it picks up right where it left off. The difference is
        especially noticeable on large projects.
      </Text>

      <Text>To enable it:</Text>

      <CodeBlock
        language="ts"
        title="next.config.ts"
        code={`const nextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;`}
      />

      <Text>
        Vercel's internal teams have been using this for a while now, and the productivity
        gains are real. Give it a try and let the team know how it works for you.
      </Text>

      <Heading level={2}>React Compiler Goes Stable</Heading>

      <Text>
        The React Compiler has been a hot topic in the React community, and Next.js 16 now
        has stable support for it.
      </Text>

      <Text>
        If you're not familiar, the React Compiler automatically memoizes your components.
        No more manual <InlineCode>useMemo</InlineCode>,{" "}
        <InlineCode>useCallback</InlineCode>, or <InlineCode>React.memo</InlineCode> calls
        – the compiler handles optimization for you.
      </Text>

      <Text>
        That said, it's not enabled by default yet. The team is still gathering
        performance data across different types of apps, and since it relies on Babel,
        you'll see longer compile times during development and builds.
      </Text>

      <Text>To enable it:</Text>

      <CodeBlock
        language="ts"
        title="next.config.ts"
        code={`const nextConfig = {
  reactCompiler: true,
};

export default nextConfig;`}
      />

      <Text>You'll also need to install the compiler plugin:</Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`npm install babel-plugin-react-compiler@latest`}
      />

      <Text>
        My take: If you're working on a performance-critical app with lots of re-renders,
        this is worth experimenting with. Just be aware of the trade-offs in build time.
      </Text>

      <Heading level={2}>Routing Gets Smarter</Heading>

      <Text>
        Next.js 16 completely overhauls how routing and navigation work under the hood.
        You won't need to change your code, but you'll definitely notice the performance
        improvements.
      </Text>

      <Heading level={3}>Layout Deduplication</Heading>

      <Text>
        Here's a common scenario: you have a product listing page with 50 links, all
        sharing the same layout. In previous versions, Next.js would prefetch that shared
        layout 50 times – once for each link.
      </Text>

      <Text>
        Now? It downloads the layout exactly once and reuses it for all the links. This
        dramatically reduces network transfer sizes, especially on pages with lots of
        internal links.
      </Text>

      <Heading level={3}>Incremental Prefetching</Heading>

      <Text>
        The prefetch cache is also smarter now. Instead of downloading entire pages,
        Next.js only prefetches the parts that aren't already cached. Plus, it:
      </Text>

      <List>
        <li>Cancels prefetch requests when links leave the viewport</li>
        <li>Re-prioritizes prefetches when you hover over links</li>
        <li>Automatically re-fetches when cached data becomes stale</li>
        <li>Works seamlessly with Cache Components</li>
      </List>

      <Text>
        There's a trade-off here: you might see more individual network requests in your
        DevTools, but the total amount of data transferred is much lower. For most apps,
        this is absolutely the right call.
      </Text>

      <Heading level={2}>New Caching APIs You Need to Know</Heading>

      <Text>
        Next.js 16 introduces some important changes to how you invalidate and refresh
        cached data. Let me break down the three APIs you'll be working with.
      </Text>

      <Heading level={3}>
        <InlineCode>revalidateTag()</InlineCode> – Now with SWR
      </Heading>

      <Text>
        The <InlineCode>revalidateTag()</InlineCode> function has a new required second
        parameter that enables stale-while-revalidate behavior:
      </Text>

      <CodeBlock
        language="ts"
        title="example.ts"
        code={`import { revalidateTag } from 'next/cache';

// ✅ Recommended: use the 'max' profile for most cases
revalidateTag('blog-posts', 'max');

// Or use other built-in profiles
revalidateTag('news-feed', 'hours');
revalidateTag('analytics', 'days');

// Or specify a custom expiration time
revalidateTag('products', { expire: 3600 });

// ⚠️ Deprecated - this will stop working
revalidateTag('blog-posts');`}
      />

      <Text>
        With SWR enabled, users get cached content immediately while Next.js revalidates
        in the background. This is perfect for content that changes occasionally but
        doesn't need to be instantly fresh.
      </Text>

      <Text>
        The team recommends using <InlineCode>'max'</InlineCode> for most use cases, which
        gives you the longest cache lifetime with background revalidation.
      </Text>

      <Heading level={3}>
        <InlineCode>updateTag()</InlineCode> – For Immediate Updates
      </Heading>

      <Text>
        Sometimes you need users to see their changes right away. That's where{" "}
        <InlineCode>updateTag()</InlineCode> comes in. It's Server Actions-only and
        provides "read-your-writes" semantics:
      </Text>

      <CodeBlock
        language="ts"
        title="actions.ts"
        code={`'use server';

import { updateTag } from 'next/cache';

export async function updateUserProfile(userId: string, profile: Profile) {
  await db.users.update(userId, profile);

  // Cache is immediately invalidated and refreshed
  updateTag(\`user-\${userId}\`);
}`}
      />

      <Text>
        Use this for forms, user settings, and any interactive feature where users expect
        to see their changes instantly. Think profile updates, shopping cart
        modifications, or comment submissions.
      </Text>

      <Heading level={3}>
        <InlineCode>refresh()</InlineCode> – For Uncached Data
      </Heading>

      <Text>
        The new <InlineCode>refresh()</InlineCode> API is for refreshing uncached data
        only. It doesn't touch any cached content:
      </Text>

      <CodeBlock
        language="ts"
        title="actions.ts"
        code={`'use server';

import { refresh } from 'next/cache';

export async function markNotificationAsRead(notificationId: string) {
  await db.notifications.markAsRead(notificationId);

  // Refreshes dynamic data like notification counts
  // Cached page shells stay fast
  refresh();
}`}
      />

      <Text>
        This is really useful for updating things like notification badges, live metrics,
        or status indicators without invalidating your entire page cache.
      </Text>

      <Heading level={2}>React 19.2 Features Built-In</Heading>

      <Text>
        Next.js 16's App Router uses the latest React Canary release, which includes the
        newly stable React 19.2 features. Here are the highlights:
      </Text>

      <List>
        <li>
          <strong>View Transitions</strong> – Native browser transitions for smoother page
          and component updates
        </li>
        <li>
          <strong>
            <InlineCode>useEffectEvent</InlineCode>
          </strong>{" "}
          – Finally, a clean way to extract non-reactive logic from Effects
        </li>
        <li>
          <strong>
            <InlineCode>&lt;Activity /&gt;</InlineCode>
          </strong>{" "}
          – Hide UI with <InlineCode>display: none</InlineCode> while preserving state
        </li>
      </List>

      <Text>
        These aren't Next.js-specific features, but having them available in the framework
        means you can start using them in production apps today.
      </Text>

      <Heading level={2}>Breaking Changes and Migration Guide</Heading>

      <Text>
        Alright, let's talk about what might break when you upgrade. Next.js 16 has some
        significant breaking changes, so don't skip this section.
      </Text>

      <Heading level={3}>Minimum Version Requirements</Heading>

      <Text>First, check your environment:</Text>

      <Table>
        <thead>
          <Tr>
            <Th>Requirement</Th>
            <Th>Minimum Version</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <strong>Node.js</strong>
            </Td>
            <Td>20.9.0 (Node 18 is no longer supported)</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>TypeScript</strong>
            </Td>
            <Td>5.1.0</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Browsers</strong>
            </Td>
            <Td>Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+</Td>
          </Tr>
        </tbody>
      </Table>

      <Heading level={3}>What Got Removed</Heading>

      <Text>These features are completely gone:</Text>

      <Table>
        <thead>
          <Tr>
            <Th>Removed Feature</Th>
            <Th>What to Use Instead</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <strong>AMP support</strong>
            </Td>
            <Td>
              All AMP-related APIs are removed. If you need AMP, you'll need to stay on
              Next.js 15.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <strong>
                <InlineCode>next lint</InlineCode>
              </strong>
            </Td>
            <Td>Use ESLint or Biome directly. There's a codemod to help migrate.</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Runtime config</strong>
            </Td>
            <Td>
              <InlineCode>serverRuntimeConfig</InlineCode> and{" "}
              <InlineCode>publicRuntimeConfig</InlineCode> are gone. Use{" "}
              <InlineCode>.env</InlineCode> files instead.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Synchronous params</strong>
            </Td>
            <Td>
              All <InlineCode>params</InlineCode> and{" "}
              <InlineCode>searchParams</InlineCode> are now async. You must{" "}
              <InlineCode>await</InlineCode> them.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Synchronous server functions</strong>
            </Td>
            <Td>
              <InlineCode>cookies()</InlineCode>, <InlineCode>headers()</InlineCode>, and{" "}
              <InlineCode>draftMode()</InlineCode> must all be awaited now.
            </Td>
          </Tr>
        </tbody>
      </Table>

      <Heading level={3}>Default Behavior Changes</Heading>

      <Text>These things work differently now, even if you didn't change any code:</Text>

      <Table>
        <thead>
          <Tr>
            <Th>What Changed</Th>
            <Th>The Details</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <strong>Default bundler</strong>
            </Td>
            <Td>
              Turbopack is now the default. Add <InlineCode>--webpack</InlineCode> to your
              commands if you need to opt out.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Image optimization cache</strong>
            </Td>
            <Td>
              <InlineCode>minimumCacheTTL</InlineCode> went from 60 seconds to 4 hours.
              This reduces costs but means images stay cached longer.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Image sizes</strong>
            </Td>
            <Td>
              The <InlineCode>16</InlineCode> size was removed from defaults (only 4.2% of
              projects used it).
            </Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Image quality</strong>
            </Td>
            <Td>
              Now defaults to 75 instead of allowing 1-100. Quality values are coerced to
              the closest value in <InlineCode>images.qualities</InlineCode>.
            </Td>
          </Tr>
        </tbody>
      </Table>

      <Heading level={3}>What's Deprecated</Heading>

      <Text>These still work but will be removed in a future version:</Text>

      <Table>
        <thead>
          <Tr>
            <Th>Deprecated</Th>
            <Th>Migration Path</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <InlineCode>middleware.ts</InlineCode>
            </Td>
            <Td>
              Rename to <InlineCode>proxy.ts</InlineCode>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>next/legacy/image</InlineCode>
            </Td>
            <Td>
              Use <InlineCode>next/image</InlineCode>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>images.domains</InlineCode>
            </Td>
            <Td>
              Use <InlineCode>images.remotePatterns</InlineCode>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>revalidateTag(tag)</InlineCode>
            </Td>
            <Td>
              Use <InlineCode>revalidateTag(tag, profile)</InlineCode>
            </Td>
          </Tr>
        </tbody>
      </Table>

      <Heading level={2}>My Take: Should You Upgrade?</Heading>

      <Text>
        If you're starting a new project, absolutely use Next.js 16. The performance
        improvements alone make it a no-brainer, and Turbopack being stable means you're
        building on solid ground.
      </Text>

      <Text>
        For existing projects, here's my advice: read through the breaking changes
        carefully. The async params and server functions change is the biggest one – it'll
        require code changes throughout your app. The automated codemod will help, but
        you'll likely need to do some manual cleanup.
      </Text>

      <Text>
        The caching changes are powerful, but they do require you to think differently
        about how data flows through your app. Take some time to understand{" "}
        <InlineCode>revalidateTag()</InlineCode>, <InlineCode>updateTag()</InlineCode>,
        and <InlineCode>refresh()</InlineCode> – choosing the right one for each use case
        will make a big difference in user experience.
      </Text>

      <Heading level={2}>Join the Conversation</Heading>

      <Text>
        The Next.js team is actively looking for feedback on this release. If you run into
        issues or have thoughts on the new features, here's where to share:
      </Text>

      <List>
        <li>
          <Link
            href="https://github.com/vercel/next.js/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:underline"
          >
            GitHub Discussions
          </Link>{" "}
          – For general questions and feature discussions
        </li>
        <li>
          <Link
            href="https://github.com/vercel/next.js/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:underline"
          >
            GitHub Issues
          </Link>{" "}
          – For bug reports
        </li>
        <li>
          <Link
            href="https://nextjs.org/discord"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:underline"
          >
            Discord Community
          </Link>{" "}
          – For real-time chat with other developers
        </li>
      </List>

      <Heading level={2}>Wrapping Up</Heading>

      <Text>
        Next.js 16 represents a major evolution in how the framework handles performance,
        caching, and developer experience. The move to make Turbopack the default, the
        introduction of Cache Components, and the new caching APIs all point toward a more
        explicit, predictable framework.
      </Text>

      <Text>
        Yes, there are breaking changes. Yes, you'll need to update your code. But the
        performance gains and clearer mental model are worth it.
      </Text>

      <Text>
        Huge shoutout to the Next.js team (Andrew, Hendrik, Janka, Jiachi, Jimmy, Jiwon,
        JJ, Josh, Jude, Sam, Sebastian, Sebbie, Wyatt, and Zack), the Turbopack team
        (Benjamin, Josh, Luke, Niklas, Tim, Tobias, and Will), and the docs team (Delba,
        Rich, Ismael, and Joseph) for putting this together. And of course, thanks to the
        3,000+ contributors who've made Next.js what it is today.
      </Text>

      <Text>Now go upgrade your apps and let me know what you think!</Text>
    </>
  );
}
