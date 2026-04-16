import { Badge, Box } from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Badge } from '../../lib';`;

const usageSnippet = `<Badge>Beta</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="outline">Internal</Badge>`;

const exampleSnippet = `<div className="flex flex-wrap gap-3">
  <Badge>Beta</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="danger">Error</Badge>
  <Badge variant="outline">Internal</Badge>
  <Badge size="sm">Draft</Badge>
</div>`;

function BadgePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Badge
        </p>
        <h1 className="text-3xl font-bold text-brand">Badge</h1>
        <p className="text-foreground">
          <code>Badge</code> is a compact inline label for short metadata, status, or categories.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Use <code>variant</code>, <code>size</code>, and <code>className</code> to style small,
          non-interactive metadata labels.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Full example</h2>
        <Box className="p-8">
          <div className="mx-auto flex max-w-xl flex-wrap gap-3 rounded-xl border border-border bg-surface p-6 shadow-card">
            <Badge>Beta</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="danger">Error</Badge>
            <Badge variant="outline">Internal</Badge>
            <Badge size="sm">Draft</Badge>
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What this v1 includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>Inline, non-interactive metadata label.</li>
          <li>
            Variants: <code>neutral</code>, <code>success</code>, <code>danger</code>,{' '}
            <code>outline</code>.
          </li>
          <li>
            Sizes: <code>sm</code> and <code>md</code>.
          </li>
          <li>
            Composability through <code>className</code> without click/remove logic.
          </li>
        </ul>
      </section>
    </article>
  );
}

export default BadgePage;
