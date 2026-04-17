import { Box, Button } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Button } from '@adanft/ui';`;

const usageSnippet = `<Button>Save changes</Button>`;

const exampleJsx = `<Button className="px-6">Deploy now</Button>`;

const variantsSnippet = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>`;

const sizesSnippet = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

const combinedSnippet = `<Button variant="primary" size="sm">Save</Button>
<Button variant="secondary" size="lg">Learn more</Button>`;

function ButtonPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Button
        </p>
        <h1 className="text-3xl font-bold text-brand">Button</h1>
        <p className="text-foreground">
          <code>Button</code> provides a reusable action control with the library&apos;s brand
          styles, keyboard focus states, and native button behavior. Use <code>className</code> to
          extend spacing or layout utilities without replacing the base styles.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>Button</code> from the public library entrypoint.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="flex items-center">
          <Button className="px-6">Deploy now</Button>
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Variants</h2>
        <p className="text-foreground">
          Use the <code>variant</code> prop to change the visual style. Defaults to{' '}
          <code>primary</code>.
        </p>
        <Box className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </Box>
        <CodeBlock code={variantsSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Sizes</h2>
        <p className="text-foreground">
          Use the <code>size</code> prop to control the button dimensions. Defaults to{' '}
          <code>md</code>.
        </p>
        <Box className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Box>
        <CodeBlock code={sizesSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Combining variant and size</h2>
        <p className="text-foreground">
          Both props can be used together to achieve the exact look needed.
        </p>
        <Box className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">
            Save
          </Button>
          <Button variant="secondary" size="lg">
            Learn more
          </Button>
        </Box>
        <CodeBlock code={combinedSnippet} />
      </section>
    </article>
  );
}

export default ButtonPage;
