import { Box, Button } from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Button } from '../../lib';`;

const usageSnippet = `<Button>Save changes</Button>`;

const exampleJsx = `<Button className="px-6">Deploy now</Button>`;

function ButtonPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] ui-text-muted">
          components {'>'} Button
        </p>
        <h1 className="text-3xl font-bold ui-text-brand">Button</h1>
        <p className="ui-text-body">
          <code>Button</code> provides a reusable action control with the library&apos;s brand
          styles, keyboard focus states, and native button behavior. Use <code>className</code> to
          extend spacing or layout utilities without replacing the base styles.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Usage</h2>
        <p className="ui-text-body">
          Import <code>Button</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ui-text-brand">Example</h2>
        <Box className="flex items-center">
          <Button className="px-6">Deploy now</Button>
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>
    </article>
  );
}

export default ButtonPage;
