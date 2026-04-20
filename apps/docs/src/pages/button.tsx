import { Box, Button } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Button } from '@adanft/ui';`;

const usageSnippet = `<Button>Save changes</Button>`;

const exampleJsx = `<Button>Deploy now</Button>`;

const variantsSnippet = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>`;

const sizesSnippet = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

function ButtonPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Button</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Button</Code> is an action component used to trigger user interactions with a
          consistent visual style.
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
        <Box className="flex items-center" shadow="none" surface="none">
          <Button>Deploy now</Button>
        </Box>
        <CodeBlock code={exampleJsx} />
        <h3 className="text-lg font-semibold text-brand">Variants</h3>
        <p className="text-base leading-7 text-foreground">
          Use the <Code>variant</Code> prop to change the visual style. Defaults to{' '}
          <Code>primary</Code>.
        </p>
        <Box className="flex flex-wrap items-center gap-3" shadow="none" surface="none">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </Box>
        <CodeBlock code={variantsSnippet} />
        <h3 className="text-lg font-semibold text-brand">Sizes</h3>
        <p className="text-base leading-7 text-foreground">
          Use the <Code>size</Code> prop to control the button dimensions. Defaults to{' '}
          <Code>md</Code>.
        </p>
        <Box className="flex flex-wrap items-center gap-3" shadow="none" surface="none">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
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
                  <Code>variant</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"primary" | "secondary"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"primary"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls the visual treatment of the button.
                </td>
              </tr>
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
                  Controls the height and horizontal spacing of the button.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>type</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"button" | "submit" | "reset"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"button"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Uses the native button type attribute.
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

export default ButtonPage;
