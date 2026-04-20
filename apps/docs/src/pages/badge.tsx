import { Badge, Box } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Badge } from '@adanft/ui';`;

const usageSnippet = `<Badge>Beta</Badge>`;

const variantsSnippet = `<Badge variant="primary">New</Badge>
<Badge>Beta</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="outline">Internal</Badge>`;

function BadgePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Badge</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Badge</Code> is a compact label used to display short metadata, states, or
          categories.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Default</h3>
        <Box className="flex items-center gap-3" shadow="none" surface="none">
          <Badge>Beta</Badge>
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-brand">Variants</h3>
        <Box className="flex flex-wrap items-center gap-3" shadow="none" surface="none">
          <Badge variant="primary">New</Badge>
          <Badge>Beta</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="danger">Error</Badge>
          <Badge variant="outline">Internal</Badge>
        </Box>
        <CodeBlock code={variantsSnippet} />
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
                  <Code>variant</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"primary" | "secondary" | "success" | "danger" | "outline"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"secondary"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls the visual treatment of the badge.
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

export default BadgePage;
