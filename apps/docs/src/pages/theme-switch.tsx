import { Box, ThemeSwitch } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { ThemeSwitch } from '@adanft/ui';`;

const setupSnippet = `import { initializeTheme } from '@adanft/ui';

initializeTheme();`;

const usageSnippet = `<ThemeSwitch />`;

const sizesSnippet = `<ThemeSwitch size="sm" />
<ThemeSwitch size="md" />
<ThemeSwitch size="lg" />`;

function ThemeSwitchPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">ThemeSwitch</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>ThemeSwitch</Code> toggles between light and dark themes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Setup</h2>
        <CodeBlock code={setupSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Default</h3>
        <Box shadow="none" surface="none">
          <ThemeSwitch />
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-brand">Sizes</h3>
        <Box className="flex flex-wrap items-center gap-6" shadow="none" surface="none">
          <ThemeSwitch size="sm" />
          <ThemeSwitch size="md" />
          <ThemeSwitch size="lg" />
        </Box>
        <CodeBlock code={sizesSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Prop</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Type</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Default</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>size</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"sm" | "md" | "lg"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"md"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls the size of the track, thumb, and icons.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Extends the component styles and can override default values when needed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default ThemeSwitchPage;
