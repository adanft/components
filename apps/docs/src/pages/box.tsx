import { Box } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const defaultExampleJsx = `<Box className="space-y-2">
  <h3 className="text-lg font-semibold text-brand">Default box</h3>
  <p className="text-foreground">
    Use the default Box when you want a standard bordered surface.
  </p>
</Box>`;

const transparentExampleJsx = `<Box surface="none" shadow="none" className="space-y-2">
  <h3 className="text-lg font-semibold text-brand">Release notes</h3>
  <p className="text-foreground">
    Version 2.4 ships improved card spacing and keyboard focus styles.
  </p>
</Box>`;

const importSnippet = `import { Box } from '@adanft/ui';`;

const usageSnippet = `<Box surface="default" padding="default" shadow="default">
  <p className="text-foreground">Content inside the container</p>
</Box>`;

function BoxPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Box</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Box</Code> is a simple container component used to group related content with a
          consistent visual wrapper.
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
        <Box shadow="none" surface="none">
          <Box className="space-y-2">
            <h3 className="text-lg font-semibold text-brand">Default box</h3>
            <p className="text-foreground">
              Use the default Box when you want a standard bordered surface.
            </p>
          </Box>
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Transparent</h3>
        <Box shadow="none" surface="none">
          <Box surface="none" shadow="none" className="space-y-2">
            <h3 className="text-lg font-semibold text-brand">Release notes</h3>
            <p className="text-foreground">
              Version 2.4 ships improved card spacing and keyboard focus styles.
            </p>
          </Box>
        </Box>
        <CodeBlock code={transparentExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-muted">
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
                  <Code>surface</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"default" | "none"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"default"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Defines whether <Code>Box</Code> renders its default surface or stays transparent.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>padding</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"default" | "none"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"default"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls the built-in inner spacing of the container.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>shadow</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"default" | "none"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"default"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Adds or removes the default card shadow.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
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

export default BoxPage;
