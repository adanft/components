import { Box, ThemeSwitch } from '@adanft/ui';
import { CodeBlock } from '../code-block';

// ─────────────────────────────────────────────────────────────────────────────
// Snippets
// ─────────────────────────────────────────────────────────────────────────────

const importSnippet = `import { ThemeSwitch } from '@your-org/components';`;

const setupSnippet = `import { initializeTheme } from '@your-org/components';

initializeTheme();`;

const usageSnippet = `<ThemeSwitch />`;

const sizesSnippet = `<ThemeSwitch size="sm" />
<ThemeSwitch size="md" />
<ThemeSwitch size="lg" />`;

const customClassSnippet = `<ThemeSwitch className="opacity-80" />`;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function ThemeSwitchPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} ThemeSwitch
        </p>
        <h1 className="text-3xl font-bold text-brand">ThemeSwitch</h1>
        <p className="text-foreground">
          <code>ThemeSwitch</code> is a toggle control that switches between light and dark themes.
          It persists the selection to <code>localStorage</code> and applies the <code>dark</code>{' '}
          class to the document root. Use <code>initializeTheme()</code> once in your app entrypoint
          so the stored theme is applied before the first render. Uses <code>lucide-react</code>{' '}
          icons (Sun and Moon) with smooth animations.
        </p>
      </header>

      {/* ── Setup ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Setup</h2>
        <p className="text-foreground">
          Call <code>initializeTheme()</code> once in your application entrypoint before rendering
          the app. That applies the persisted theme class on initial load.
        </p>
        <CodeBlock code={setupSnippet} />
      </section>

      {/* ── Import ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Import</h2>
        <CodeBlock code={importSnippet} />
      </section>

      {/* ── Basic usage ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          After the one-time setup, drop it in and it works. No props are required for basic theme
          toggling.
        </p>
        <Box className="flex items-center">
          <ThemeSwitch />
        </Box>
        <CodeBlock code={usageSnippet} />
      </section>

      {/* ── Sizes ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Sizes</h2>
        <p className="text-foreground">
          Use the <code>size</code> prop to control the switch dimensions. Defaults to{' '}
          <code>"md"</code>. Available sizes: <code>"sm"</code>, <code>"md"</code>, and{' '}
          <code>"lg"</code>.
        </p>
        <Box className="flex flex-wrap items-center gap-6">
          <ThemeSwitch size="sm" />
          <ThemeSwitch size="md" />
          <ThemeSwitch size="lg" />
        </Box>
        <CodeBlock code={sizesSnippet} />
      </section>

      {/* ── Custom className ──────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Custom className</h2>
        <p className="text-foreground">
          Pass <code>className</code> to extend or override the wrapper styles without replacing the
          base layout.
        </p>
        <Box className="flex items-center">
          <ThemeSwitch className="opacity-80" />
        </Box>
        <CodeBlock code={customClassSnippet} />
      </section>
    </article>
  );
}

export default ThemeSwitchPage;
