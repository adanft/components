import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';
import { docsSidebarNavigation } from '../data/sidebar-navigation';

type HomeComponentCard = {
  description: string;
  href: string;
  icon: LucideIcon;
  name: string;
};

type HomeCatalogSection = {
  items: HomeComponentCard[];
  title: string;
};

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  Accordion: 'Accordion shows expandable sections and is used to organize related content.',
  Alert: 'Alert shows status messages and is used to communicate feedback or warnings.',
  Avatar: 'Avatar shows a user image or fallback and is used for identity surfaces.',
  Badge: 'Badge shows a compact label and is used for status, metadata, or counts.',
  Box: 'Box is a surface container and is used to compose cards, panels, and content blocks.',
  Breadcrumbs: 'Breadcrumbs show a location trail and are used for hierarchical navigation.',
  Button: 'Button triggers an action and is used for forms, dialogs, and interactive flows.',
  Checkbox: 'Checkbox captures a boolean choice and is used in forms or option lists.',
  'Dropdown Menu': 'Dropdown Menu shows grouped actions and is used for trigger-based menus.',
  Field: 'Field groups form copy and controls and is used for labels, help text, and errors.',
  Input: 'Input captures single-line text and is used for native text entry in forms.',
  Label: 'Label names a form control and is used to connect text with an input.',
  Modal: 'Modal shows a focused dialog and is used for workflows that block the page.',
  Pagination: 'Pagination moves through pages and is used for paged collections.',
  Popover: 'Popover shows anchored content and is used for interactive contextual panels.',
  Profile: 'Profile shows account identity and is used for user menus and account actions.',
  'Radio Group': 'Radio Group captures one choice and is used for grouped radio options.',
  Select: 'Select lets users choose one option and is used for compact option lists.',
  Sidebar: 'Sidebar shows app navigation and is used for side menus and nested links.',
  Skeleton: 'Skeleton reserves loading space and is used while async content is pending.',
  Spinner: 'Spinner shows indeterminate progress and is used for loading states.',
  Switch: 'Switch toggles a setting and is used for immediate on/off preferences.',
  Table: 'Table shows structured data and is used for rows, columns, and API references.',
  Tabs: 'Tabs switch between panels and are used for related content on the same page.',
  Textarea: 'Textarea captures multi-line text and is used for longer form content.',
  'Theme Switch':
    'Theme Switch toggles color mode and is used to change between light and dark themes.',
  Tooltip: 'Tooltip shows a short hint and is used for non-interactive contextual help.',
};

const INSTALL_SNIPPET = `pnpm add @adanft/ui`;

const STYLE_SETUP_SNIPPET = `@import "tailwindcss";
@import "@adanft/ui/styles.css";

/* Adjust the relative path from this stylesheet to node_modules. */
@source "../node_modules/@adanft/ui/dist";`;

const CSR_THEME_BOOTSTRAP_SNIPPET = `import { initializeTheme } from '@adanft/ui';

// CSR only: reads localStorage and toggles html.dark in the browser.
initializeTheme();`;

const SSR_THEME_BOOTSTRAP_SNIPPET = `import { cookies } from 'next/headers';
import { ThemeSwitch } from '@adanft/ui';

// Next/SSR: resolve the initial theme on the server.
export default async function RootLayout({ children }) {
  const isDark = (await cookies()).get('theme')?.value === 'dark';

  return (
    <html className={isDark ? 'dark' : ''}>
      <body>
        <ThemeSwitch initialDark={isDark} />
        {children}
      </body>
    </html>
  );
}`;

const USAGE_SNIPPET = `import { Button } from '@adanft/ui';

// Use documented public subpaths when you want a narrower entrypoint.
// import Button from '@adanft/ui/button';
// import Sidebar, { SidebarBody, SidebarLink } from '@adanft/ui/sidebar';

function Example() {
  return <Button>Save changes</Button>;
}`;

const CATALOG_SECTIONS = docsSidebarNavigation.reduce<HomeCatalogSection[]>((sections, node) => {
  if (node.type === 'heading') {
    sections.push({ title: node.text, items: [] });
    return sections;
  }

  if (node.type === 'link') {
    const section = sections.at(-1);

    if (section) {
      section.items.push({
        description: COMPONENT_DESCRIPTIONS[node.text] ?? 'Documented library component.',
        href: node.href,
        icon: node.icon,
        name: node.text,
      });
    }
  }

  return sections;
}, []);

function Home() {
  return (
    <article className="space-y-10">
      <header className="relative overflow-hidden rounded-md border border-border bg-surface p-6 shadow-card">
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-highlight/20 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <h1 className="text-3xl font-bold text-heading md:text-5xl">Components</h1>
          <p className="text-base leading-7 text-foreground md:text-lg">
            Production-oriented React components built with semantic tokens, accessible primitives,
            and composable APIs. Start with installation, wire the theme once, then browse the
            documented primitives and components.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#installation"
              className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
              Get started
            </a>
            <a
              href="#catalog"
              className="inline-flex items-center rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand">
              Browse catalog
            </a>
          </div>
        </div>
      </header>

      <section id="installation" className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Installation</h2>
        <p className="max-w-3xl text-foreground">
          Install the package, load the stylesheet once, and register the package output in your
          Tailwind entry. Then choose the correct theme bootstrap: CSR reads browser storage; SSR
          resolves the first paint on the server. Mix those up and you earn a hydration bug.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-md border border-border bg-surface p-4 shadow-card">
            <h3 className="text-lg font-semibold text-heading">Install package</h3>
            <CodeBlock code={INSTALL_SNIPPET} />
          </div>

          <div className="space-y-3 rounded-md border border-border bg-surface p-4 shadow-card">
            <h3 className="text-lg font-semibold text-heading">Register styles in Tailwind</h3>
            <CodeBlock code={STYLE_SETUP_SNIPPET} />
          </div>

          <div className="space-y-3 rounded-md border border-border bg-surface p-4 shadow-card lg:col-span-2">
            <h3 className="text-lg font-semibold text-heading">Bootstrap theme</h3>
            <p className="text-sm leading-6 text-foreground">
              <Code>initializeTheme()</Code> is a CSR helper: it reads <Code>localStorage</Code> and
              applies <Code>html.dark</Code> in the browser. In SSR, read the{' '}
              <Code>theme=dark</Code>
              cookie server-side and pass that boolean to <Code>ThemeSwitch initialDark</Code> so
              the server markup and client hydration agree.
            </p>
            <CodeBlock code={CSR_THEME_BOOTSTRAP_SNIPPET} />
            <CodeBlock code={SSR_THEME_BOOTSTRAP_SNIPPET} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Basic usage</h2>
        <p className="max-w-3xl text-foreground">
          Import from <Code>@adanft/ui</Code> when convenience matters. Use documented public
          subpaths like <Code>@adanft/ui/button</Code> or <Code>@adanft/ui/sidebar</Code> when you
          want narrower entrypoints; those subpaths expose the same public component surface needed
          by their docs examples.
        </p>
        <CodeBlock code={USAGE_SNIPPET} />
      </section>

      <section id="catalog" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-heading">Catalog</h2>
          <p className="text-foreground">
            The catalog is generated from the same navigation used by the sidebar, so the home page
            stays aligned with the real docs surface.
          </p>
        </div>

        {CATALOG_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {section.title}
            </h3>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((component) => {
                const Icon = component.icon;

                return (
                  <li key={component.name}>
                    <Link
                      to={component.href}
                      className="block h-full rounded-md border border-border bg-surface p-4 shadow-card transition-transform duration-150 hover:-translate-y-0.5">
                      <div className="flex items-start gap-3">
                        <span className="rounded-md border border-border bg-background p-2 text-brand">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-heading">{component.name}</h4>
                          <p className="text-sm leading-6 text-foreground">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );
}

export default Home;
