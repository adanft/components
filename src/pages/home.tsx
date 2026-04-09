type HomeComponentCard = {
  description: string;
  href: string;
  name: string;
};

type HomeCommand = {
  command: string;
  label: string;
};

const COMPONENT_CARDS: HomeComponentCard[] = [
  {
    name: 'Button',
    href: '/components/button',
    description: 'Action button with brand styling and safe defaults.',
  },
  {
    name: 'Box',
    href: '/components/box',
    description: 'Surface container for grouping content blocks and layouts.',
  },
  {
    name: 'InputField',
    href: '/components/input-field',
    description: 'Label + input control with focus and tokenized visual states.',
  },
  {
    name: 'Profile',
    href: '/components/profile',
    description: 'User profile dropdown with avatar variants and actions.',
  },
  {
    name: 'Sidebar',
    href: '/components/sidebar',
    description: 'Composable navigation shell for dense side menus.',
  },
  {
    name: 'Table',
    href: '/components/table',
    description: 'Semantic table primitives for reusable data layouts.',
  },
];

const QUALITY_COMMANDS: HomeCommand[] = [
  { label: 'Lint', command: 'pnpm lint' },
  { label: 'Typecheck', command: 'pnpm typecheck' },
  { label: 'Tests', command: 'pnpm test' },
  { label: 'Full gate', command: 'pnpm validate' },
];

const QUICKSTART_COMMANDS = 'pnpm install\npnpm dev';
const QUICKSTART_THEME_BOOTSTRAP =
  "import './lib/styles.css';\nimport { initializeTheme } from './lib';\n\ninitializeTheme();";

function Home() {
  return (
    <article className="space-y-8">
      <header className="relative overflow-hidden border border-border bg-surface shadow-card rounded-md p-4">
        <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            components {'>'} Home
          </p>
          <h1 className="text-3xl font-bold text-brand md:text-4xl">React Components</h1>
          <p className="max-w-3xl text-foreground">
            A library-first component system with semantic tokens, theme helpers, and a live docs
            app. Use this page as your starting point to install, explore primitives, and verify
            quality gates before publishing.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#quickstart"
              className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
              Start quickstart
            </a>
            <a
              href="#catalog"
              className="inline-flex items-center rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand">
              Browse components
            </a>
          </div>
        </div>
      </header>

      <section id="quickstart" className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Quickstart</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="bg-surface shadow-card border border-border rounded-md p-4 space-y-3">
            <h3 className="text-lg font-semibold text-brand">Run docs locally</h3>
            <p className="text-foreground">Install dependencies and start the Vite docs app.</p>
            <pre className="bg-background border-border overflow-x-auto rounded-md border p-3 text-sm text-foreground">
              <code>{QUICKSTART_COMMANDS}</code>
            </pre>
          </div>

          <div className="bg-surface shadow-card border border-border rounded-md p-4 space-y-3">
            <h3 className="text-lg font-semibold text-brand">Theme bootstrap</h3>
            <p className="text-foreground">
              In consumer apps, load library styles once and initialize theme at startup.
            </p>
            <pre className="bg-background border-border overflow-x-auto rounded-md border p-3 text-sm text-foreground">
              <code>{QUICKSTART_THEME_BOOTSTRAP}</code>
            </pre>
          </div>
        </div>
      </section>

      <section id="catalog" className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Component catalog</h2>
        <p className="text-foreground">Each page includes usage notes and a working example.</p>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {COMPONENT_CARDS.map((component) => (
            <li key={component.name}>
              <a
                href={component.href}
                className="bg-surface shadow-card p-4 border-border block h-full rounded-md border transition-transform duration-150 hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-brand">{component.name}</h3>
                  <span className="rounded-full bg-brand px-2 py-1 text-xs font-semibold text-white">
                    stable
                  </span>
                </div>
                <p className="mt-3 text-foreground">{component.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="bg-surface shadow-card border border-border rounded-md p-4 space-y-4">
          <h2 className="text-2xl font-semibold text-brand">Quality gates</h2>
          <p className="text-foreground">Run these commands before merging changes.</p>
          <ul className="space-y-2">
            {QUALITY_COMMANDS.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <code className="rounded-md bg-background px-2 py-1 text-xs text-brand">
                  {item.command}
                </code>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface shadow-card border border-border rounded-md p-4 space-y-4">
          <h2 className="text-2xl font-semibold text-brand">Project notes</h2>
          <ul className="space-y-3 text-foreground">
            <li>Public API import boundary: use only src/lib exports.</li>
            <li>Theme contract: semantic --color-* tokens via Tailwind @theme inline.</li>
            <li>Legacy alias compatibility is deprecated since v1.0.0 and removed in v2.0.0.</li>
            <li>Docs deployment is automated on main via GitHub Actions + Pages.</li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default Home;
