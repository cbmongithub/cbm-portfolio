/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import { CodeBlock } from "@/components/ui/code-block";
import {
  Callout,
  Heading,
  InlineCode,
  Lead,
  List,
  Quote,
  Table,
  Td,
  Text,
  Th,
  Tr,
} from "@/components/ui/typography";

import { BASE_URL } from "@/lib/config/metadata";
import type { PostMetadata } from "@/lib/posts";

const SLUG = "react-19-rce";

export const metadata: PostMetadata = {
  slug: SLUG,
  title: "Critical React 19 RCE: Patch Server Components Now",
  publishedTime: "2025-12-14",
  modifiedTime: "2025-12-15",
  authors: "Christian B. Martinez",
  tags: ["react", "security", "updates"],
  description:
    "A remote code execution flaw in React Server Components (19.0–19.2.0). Learn who is affected, why it's dangerous, and how to patch immediately.",
  image: `${BASE_URL}/blog/${SLUG}/opengraph-image`,
};

export default function Article() {
  return (
    <>
      <Callout
        title="Critical Security Alert: React Server Components Vulnerability"
        variant="danger"
      >
        <strong>Stop what you're doing and read this.</strong> There's a critical remote
        code execution vulnerability in React Server Components. If you're using React
        Server Components in production, you need to patch immediately.
      </Callout>
      <Lead>
        On December 3rd, 2025, the React team disclosed CVE-2025-55182, a critical
        security vulnerability with a CVSS score of 10.0 – the highest possible severity
        rating. This isn't a theoretical issue or an edge case. It's an actively
        exploitable remote code execution vulnerability that could compromise your entire
        server.
      </Lead>

      <Heading level={2}>What's at Risk?</Heading>

      <Text>
        Let me be direct: an unauthenticated attacker can execute arbitrary code on your
        server. No authentication required. No special permissions needed. Just a crafted
        HTTP request to any React Server Function endpoint.
      </Text>

      <Text>Here's what makes this particularly dangerous:</Text>

      <List>
        <li>
          <strong>It's unauthenticated</strong> – Attackers don't need to log in or have
          any credentials
        </li>
        <li>
          <strong>It's remote</strong> – They can exploit it from anywhere on the internet
        </li>
        <li>
          <strong>It's in the framework layer</strong> – Your application code doesn't
          need to have bugs; the vulnerability is in React itself
        </li>
        <li>
          <strong>It affects more than you think</strong> – Even if you don't explicitly
          use Server Functions, you might still be vulnerable
        </li>
      </List>

      <Heading level={2}>Am I Affected?</Heading>

      <Text>
        You're vulnerable if you meet <strong>any</strong> of these conditions:
      </Text>

      <List>
        <li>You're using Next.js 13.3 or later with the App Router</li>
        <li>You're using React Router with unstable RSC APIs</li>
        <li>You're using Waku, Redwood, or Expo with Server Components</li>
        <li>
          You're using any of these packages in versions 19.0 through 19.2.0:
          <List as="ul">
            <li>
              <InlineCode>react-server-dom-webpack</InlineCode>
            </li>
            <li>
              <InlineCode>react-server-dom-parcel</InlineCode>
            </li>
            <li>
              <InlineCode>react-server-dom-turbopack</InlineCode>
            </li>
          </List>
        </li>
      </List>

      <Quote>
        <strong>Important:</strong> Even if you haven't explicitly created any Server
        Actions or Server Functions, your app might still be vulnerable if it supports
        React Server Components at all. The vulnerability exists in how React decodes
        payloads, not in your application code.
      </Quote>

      <Text>
        You're <strong>not</strong> affected if:
      </Text>

      <List>
        <li>Your React app runs entirely on the client (no server rendering)</li>
        <li>You're using Next.js Pages Router without any Server Components</li>
        <li>You're using React Native without any of the server-dom packages</li>
      </List>

      <Heading level={2}>How the Vulnerability Works</Heading>

      <Text>
        React Server Components allow clients to call functions on the server. When you
        invoke a Server Action, React translates that into an HTTP request with a
        specially formatted payload. On the server, React deserializes this payload and
        executes the corresponding function.
      </Text>

      <Text>
        The vulnerability lies in the deserialization process. An attacker can craft a
        malicious HTTP request that, when deserialized by React, executes arbitrary code
        on your server. Think of it like SQL injection, but for React's serialization
        format.
      </Text>

      <Text>
        The React team has intentionally withheld full technical details of the exploit
        until most apps have been patched. This is standard practice for critical
        vulnerabilities – publishing exploit details too early gives attackers a blueprint
        before defenders can patch.
      </Text>

      <Heading level={2}>Update Instructions: Do This Now</Heading>

      <Text>
        The fix is available. You need to upgrade immediately. Don't wait for your next
        sprint or deployment cycle. This is a drop-everything-and-patch situation.
      </Text>

      <Heading level={3}>Next.js Users</Heading>

      <Text>
        Next.js users have the most straightforward path. The Vercel team worked closely
        with React to release patched versions across all supported release lines. Find
        your version and upgrade:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`# For Next.js 13.3.x through 14.x
npm install next@14.2.35

# For Next.js 15.0.x
npm install next@15.0.7

# For Next.js 15.1.x
npm install next@15.1.11

# For Next.js 15.2.x
npm install next@15.2.8

# For Next.js 15.3.x
npm install next@15.3.8

# For Next.js 15.4.x
npm install next@15.4.10

# For Next.js 15.5.x
npm install next@15.5.9

# For Next.js 16.0.x
npm install next@16.0.10

# For 15.x canary releases
npm install next@15.6.0-canary.60

# For 16.x canary releases
npm install next@16.1.0-canary.19`}
      />

      <Quote>
        <strong>Special note for Next.js 13 users:</strong> If you're on any version of
        Next.js 13.3 or later (13.3.x, 13.4.x, 13.5.x), upgrade to{" "}
        <InlineCode>next@14.2.35</InlineCode>. Yes, this is a major version bump, but it's
        necessary for the security patch.
      </Quote>

      <Text>
        If you're on a canary release like <InlineCode>next@14.3.0-canary.77</InlineCode>{" "}
        or later, downgrade to the latest stable 14.x release:
      </Text>

      <CodeBlock language="bash" title="terminal" code={`npm install next@14`} />

      <Heading level={3}>React Router Users</Heading>

      <Text>
        If you're using React Router's unstable RSC APIs, update these packages:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`npm install react@latest
npm install react-dom@latest
npm install react-server-dom-parcel@latest
npm install react-server-dom-webpack@latest
npm install @vitejs/plugin-rsc@latest`}
      />

      <Heading level={3}>Waku Users</Heading>

      <Text>Update to the latest versions:</Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`npm install react@latest react-dom@latest react-server-dom-webpack@latest waku@latest`}
      />

      <Heading level={3}>Redwood SDK Users</Heading>

      <Text>
        Make sure you're on <InlineCode>rwsdk@1.0.0-alpha.0</InlineCode> or later:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`# For the latest beta
npm install rwsdk@latest

# Update React packages
npm install react@latest react-dom@latest react-server-dom-webpack@latest`}
      />

      <Heading level={3}>Expo Users</Heading>

      <Text>
        Expo has published specific mitigation instructions. Check their{" "}
        <Link
          href="https://expo.dev/changelog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link-hover hover:underline"
        >
          changelog
        </Link>{" "}
        for the latest guidance.
      </Text>

      <Heading level={3}>Direct React Package Users</Heading>

      <Text>
        If you're using React Server Components without a framework, update these packages
        directly:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`# For webpack users
npm install react@latest react-dom@latest react-server-dom-webpack@latest

# For Parcel users
npm install react@latest react-dom@latest react-server-dom-parcel@latest

# For Turbopack users
npm install react@latest react-dom@latest react-server-dom-turbopack@latest`}
      />

      <Heading level={3}>React Native Users</Heading>

      <Text>
        Most React Native users aren't affected since React Native doesn't use the
        server-dom packages. However, if you're in a monorepo that includes web apps with
        Server Components, you need to update only the affected packages:
      </Text>

      <CodeBlock
        language="bash"
        title="terminal"
        code={`# Only update these if they're installed
npm install react-server-dom-webpack@latest
npm install react-server-dom-parcel@latest
npm install react-server-dom-turbopack@latest`}
      />

      <Text>
        <strong>Do not</strong> update <InlineCode>react</InlineCode> and{" "}
        <InlineCode>react-dom</InlineCode> in your React Native project, as this will
        cause version mismatch errors. You only need to update the server-dom packages to
        mitigate the vulnerability.
      </Text>

      <Heading level={2}>Additional Vulnerabilities Discovered</Heading>

      <Text>
        During the investigation and patching process, the React team discovered two
        additional vulnerabilities that have also been patched in the same updates:
      </Text>

      <Table>
        <thead>
          <Tr>
            <Th>CVE</Th>
            <Th>Severity</Th>
            <Th>Issue</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <InlineCode>CVE-2025-55184</InlineCode>
            </Td>
            <Td>
              <strong>High (7.5)</strong>
            </Td>
            <Td>Denial of Service vulnerability</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CVE-2025-55183</InlineCode>
            </Td>
            <Td>
              <strong>Medium (5.3)</strong>
            </Td>
            <Td>Source code exposure vulnerability</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CVE-2025-67779</InlineCode>
            </Td>
            <Td>
              <strong>Critical</strong>
            </Td>
            <Td>Additional case of the original RCE vulnerability</Td>
          </Tr>
        </tbody>
      </Table>

      <Text>
        All of these vulnerabilities are patched in the same updates. You don't need to
        take any additional action beyond updating to the versions listed above.
      </Text>

      <Heading level={2}>What About Hosting Provider Mitigations?</Heading>

      <Text>
        Several hosting providers (including Vercel, Netlify, and others) worked with the
        React team to deploy temporary mitigations at the infrastructure level. This is
        great, and it shows the community coming together to protect users.
      </Text>

      <Text>
        <strong>However</strong>, you should not rely on these mitigations as your primary
        defense. They're temporary measures, and they might not catch every exploit
        variant. Update your code. Deploy the patched versions. Don't assume your hosting
        provider has you covered.
      </Text>

      <Heading level={2}>Verification After Patching</Heading>

      <Text>After you've deployed the updates, verify your patch:</Text>

      <List as="ol">
        <li>
          <strong>Check your package.json</strong> – Make sure the updated versions are in
          your dependencies
        </li>
        <li>
          <strong>Check your lock file</strong> – Ensure{" "}
          <InlineCode>package-lock.json</InlineCode> or <InlineCode>yarn.lock</InlineCode>{" "}
          reflects the new versions
        </li>
        <li>
          <strong>Rebuild and redeploy</strong> – Don't just update locally; deploy to
          production
        </li>
        <li>
          <strong>Clear your build caches</strong> – Some CI/CD systems cache
          node_modules; make sure you're getting fresh installs
        </li>
      </List>

      <Text>If you're using Next.js, you can check your version with:</Text>

      <CodeBlock language="bash" title="terminal" code={`npx next --version`} />

      <Heading level={2}>Timeline: How This Unfolded</Heading>

      <Text>
        Security vulnerabilities are often kept under wraps until patches are available.
        Here's how the React team handled this one:
      </Text>

      <List>
        <li>
          <strong>November 29th</strong> – Lachlan Davidson discovered and reported the
          vulnerability through Meta's Bug Bounty program
        </li>
        <li>
          <strong>November 30th</strong> – Meta's security team confirmed the issue and
          began working with React team on a fix
        </li>
        <li>
          <strong>December 1st</strong> – Fix created and shared with hosting providers
          and major frameworks for validation
        </li>
        <li>
          <strong>December 3rd</strong> – Patches published to npm and public disclosure
          as CVE-2025-55182
        </li>
      </List>

      <Text>
        This is a remarkably fast response time for a vulnerability of this severity. From
        discovery to public patch in just four days is impressive, and it shows how
        seriously the React team takes security.
      </Text>

      <Heading level={2}>What This Means for React Server Components</Heading>

      <Text>
        This vulnerability doesn't mean React Server Components are fundamentally flawed
        or that you should stop using them. Security vulnerabilities happen in all
        software, including mature, battle-tested frameworks.
      </Text>

      <Text>What it does mean:</Text>

      <List>
        <li>
          <strong>Stay up to date</strong> – Don't let your React and framework versions
          fall too far behind
        </li>
        <li>
          <strong>Watch for security advisories</strong> – Subscribe to your framework's
          security announcements
        </li>
        <li>
          <strong>Have a rapid response plan</strong> – When critical patches drop, you
          need to be able to deploy quickly
        </li>
        <li>
          <strong>Layer your security</strong> – Use authentication, rate limiting, and
          other defenses even when your framework is secure
        </li>
      </List>

      <Heading level={2}>Questions You Might Have</Heading>

      <Heading level={3}>
        "Can I just disable Server Components instead of upgrading?"
      </Heading>

      <Text>
        In theory, yes. In practice, if you're using a framework like Next.js with the App
        Router, Server Components are deeply integrated. Disabling them would require
        significant code changes. It's faster and safer to just update.
      </Text>

      <Heading level={3}>"How do I know if my app has been exploited?"</Heading>

      <Text>
        This is the scary part: exploitation might not leave obvious traces. Check your
        server logs for unusual HTTP requests to Server Function endpoints, unexpected
        process spawning, or unusual network activity. If you're seriously concerned,
        consider engaging a security professional for a thorough audit.
      </Text>

      <Heading level={3}>"Should I disclose this vulnerability to my users?"</Heading>

      <Text>
        If you're running a service that was vulnerable and you've patched it,
        transparency is usually the right call. You don't need to provide exploit details,
        but letting users know you've addressed a security issue builds trust.
      </Text>

      <Heading level={3}>"Will this happen again?"</Heading>

      <Text>
        Probably. Server Components are relatively new technology, and as they get more
        usage and scrutiny, more vulnerabilities may be discovered. This is normal for
        evolving software. The key is having processes in place to respond quickly when
        issues arise.
      </Text>

      <Heading level={2}>Credit Where It's Due</Heading>

      <Text>
        Huge thanks to Lachlan Davidson for discovering this vulnerability and reporting
        it responsibly through Meta's Bug Bounty program. Responsible disclosure gives
        developers time to patch before exploits go public, and that likely prevented
        real-world attacks.
      </Text>

      <Text>
        Also, props to the React team, framework maintainers, and hosting providers for
        coordinating a rapid response. Getting patches out across the entire ecosystem in
        four days is no small feat.
      </Text>

      <Heading level={2}>Take Action Now</Heading>

      <Text>
        I know I've said this multiple times throughout this article, but it bears
        repeating: if you're using React Server Components in production, stop reading and
        go patch your apps.
      </Text>

      <Text>Here's your action checklist:</Text>

      <List as="ol">
        <li>Identify which apps in your organization use Server Components</li>
        <li>Update to the patched versions (see instructions above)</li>
        <li>Test your apps to ensure the updates don't break anything</li>
        <li>Deploy to production immediately</li>
        <li>Verify the patched versions are running in production</li>
        <li>Document this incident and your response for future reference</li>
      </List>

      <Text>
        This isn't a "fix it when you get around to it" issue. This is a critical,
        actively exploitable vulnerability with a CVSS score of 10.0. Treat it with the
        urgency it deserves.
      </Text>

      <Heading level={2}>Additional Resources</Heading>

      <List>
        <li>
          <Link
            href="https://react.dev/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover hover:underline"
          >
            Official React Blog
          </Link>{" "}
          – For the original disclosure and updates
        </li>
        <li>
          <Link
            href="https://nextjs.org/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover hover:underline"
          >
            Next.js Blog
          </Link>{" "}
          – For Next.js-specific guidance
        </li>
        <li>
          <Link
            href="https://github.com/advisories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover hover:underline"
          >
            GitHub Security Advisories
          </Link>{" "}
          – Track CVEs and security updates
        </li>
      </List>

      <Text>
        Stay safe out there, and make sure your teams know how to respond when critical
        vulnerabilities like this are disclosed. The faster you can patch, the safer your
        users are.
      </Text>
    </>
  );
}
