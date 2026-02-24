import { Box } from '../../lib';
import { CodeBlock } from '../code-block';

const exampleJsx = `<Box className="space-y-2">
  <h3 className="text-lg font-semibold ui-text-brand">Release notes</h3>
  <p className="ui-text-body">
    Version 2.4 ships improved card spacing and keyboard focus styles.
  </p>
</Box>`;

const importSnippet = `import { Box } from '../../lib';`;

const usageSnippet = `<Box>
  <p className="ui-text-body">Content inside the container</p>
</Box>`;

function BoxPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] ui-text-muted">
          components {'>'} Box
        </p>
        <h1 className="text-3xl font-bold ui-text-brand">Box</h1>
        <p className="ui-text-body">
          <code>Box</code> is a lightweight wrapper around a <code>{'<div />'}</code> with fixed
          border, shadow, <code>16px</code> padding, and <code>6px</code> border radius. Use it to
          group related content in a consistent container.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Usage</h2>
        <p className="ui-text-body">
          Import <code>Box</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Example</h2>
        <Box>
          <Box className="space-y-2">
            <h3 className="text-lg font-semibold ui-text-brand">Release notes</h3>
            <p className="ui-text-body">
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
