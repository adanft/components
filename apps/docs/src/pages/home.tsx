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
  Accordion: 'Disclosure primitive for grouping expandable sections with keyboard-friendly state.',
  Alert: 'Status message component for communicating feedback, warnings, and destructive states.',
  Avatar: 'User image fallback pattern for profiles, authors, and account surfaces.',
  Badge: 'Compact label for status, metadata, counts, and small categorical hints.',
  Box: 'Semantic surface container for composing cards, panels, and content blocks.',
  Button: 'Accessible action trigger with consistent sizing, variants, and interaction states.',
  Checkbox: 'Boolean form control for toggles that belong inside forms or option lists.',
  DropdownMenu: 'Menu pattern for grouped actions attached to a trigger.',
  Field: 'Form composition primitives for labels, descriptions, errors, and grouped controls.',
  Input: 'Text input primitive with token-based styling and native form semantics.',
  Label: 'Native label primitive for explicitly connecting text with form controls.',
  Modal:
    'Dialog primitive for blocking workflows that need focus management and an accessible name.',
  Pagination: 'Navigation component for moving across paged collections.',
  Popover: 'Floating primitive for interactive contextual content anchored to a trigger.',
  Profile: 'Account menu pattern combining avatar identity and user actions.',
  RadioGroup: 'Single-choice form control pattern with grouped radio options.',
  Select: 'Selection control for choosing one option from a compact list.',
  Sidebar: 'Application navigation shell for dense side menus and nested navigation.',
  Skeleton: 'Loading placeholder for preserving layout while async content resolves.',
  Switch: 'Binary setting control for immediate on/off preferences.',
  Table: 'Semantic table primitives for structured data and API reference content.',
  Tabs: 'Section switcher for related panels that share the same page context.',
  ThemeSwitch: 'Theme control wired to the library theme helpers.',
  Tooltip: 'Non-interactive floating hint for short contextual help on hover or focus.',
};

const INSTALL_SNIPPET = `pnpm add @adanft/ui`;

const THEME_BOOTSTRAP_SNIPPET = `import '@adanft/ui/styles.css';
import { initializeTheme } from '@adanft/ui';

initializeTheme();`;

const USAGE_SNIPPET = `import { Button } from '@adanft/ui';

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
          Install the package, load the stylesheet once, and initialize the theme before rendering
          components. That is the foundation; skip it and your app is a house without plumbing.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-md border border-border bg-surface p-4 shadow-card">
            <h3 className="text-lg font-semibold text-heading">Install package</h3>
            <CodeBlock code={INSTALL_SNIPPET} />
          </div>

          <div className="space-y-3 rounded-md border border-border bg-surface p-4 shadow-card">
            <h3 className="text-lg font-semibold text-heading">Bootstrap styles and theme</h3>
            <CodeBlock code={THEME_BOOTSTRAP_SNIPPET} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Basic usage</h2>
        <p className="max-w-3xl text-foreground">
          Import components from <Code>@adanft/ui</Code>. The docs pages show composition patterns,
          accessibility notes, and API references for each component.
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
