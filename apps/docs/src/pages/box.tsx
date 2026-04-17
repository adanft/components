import { Box } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const exampleJsx = `<Box className="space-y-2">
  <h3 className="text-lg font-semibold text-brand">Release notes</h3>
  <p className="text-foreground">
    Version 2.4 ships improved card spacing and keyboard focus styles.
  </p>
</Box>`;

const importSnippet = `import { Box } from '@adanft/ui';`;

const usageSnippet = `<Box>
  <p className="text-foreground">Content inside the container</p>
</Box>`;

function BoxPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Box
        </p>
        <h1 className="text-3xl font-bold text-brand">Box</h1>
        <p className="text-foreground">
          <code>Box</code> is a lightweight wrapper around a <code>{'<div />'}</code> with fixed
          border, shadow, <code>16px</code> padding, and <code>6px</code> border radius. Use it to
          group related content in a consistent container.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>Box</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box>
          <Box className="space-y-2">
            <h3 className="text-lg font-semibold text-brand">Release notes</h3>
            <p className="text-foreground">
              Version 2.4 ships improved card spacing and keyboard focus styles.
            </p>
          </Box>
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>
    </article>
  );
}

export default BoxPage;
