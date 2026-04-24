import { Box, Input, Label } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Label } from '@adanft/ui';`;

const usageSnippet = `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="name@example.com" />`;

const defaultExampleJsx = `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="name@example.com" />`;

const childrenExampleJsx = `<Label className="flex flex-col gap-2">
  Username
  <Input type="text" placeholder="adanft" />
</Label>`;

function LabelPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Label</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Label</Code> renders a native label element with base typography for form controls.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Default</h3>
        <Box className="flex flex-col gap-2" shadow="none" surface="none">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Children</h3>
        <Box className="flex flex-col gap-2" shadow="none" surface="none">
          <Label className="flex flex-col gap-2">
            Username
            <Input type="text" placeholder="adanft" />
          </Label>
        </Box>
        <CodeBlock code={childrenExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            <Code>Label</Code> accepts native <Code>{'<label>'}</Code> attributes and adds base text
            styles for form labels. Use <Code>children</Code> for the label content.
          </p>
        </div>
      </section>
    </article>
  );
}

export default LabelPage;
