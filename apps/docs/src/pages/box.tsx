import { Box, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const defaultExampleJsx = `<Box className="space-y-2">
  <h3 className="text-lg font-semibold text-heading">Default box</h3>
  <p className="text-foreground">
    Use the default Box when you want a standard bordered surface.
  </p>
</Box>`;

const transparentExampleJsx = `<Box surface="none" shadow="none" className="space-y-2">
  <h3 className="text-lg font-semibold text-heading">Release notes</h3>
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
        <h1 className="text-3xl font-bold text-heading">Box</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Box</Code> is a simple container component used to group related content with a
          consistent visual wrapper.
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
        <Box shadow="none" surface="none">
          <Box className="space-y-2">
            <h3 className="text-lg font-semibold text-heading">Default box</h3>
            <p className="text-foreground">
              Use the default Box when you want a standard bordered surface.
            </p>
          </Box>
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Transparent</h3>
        <Box shadow="none" surface="none">
          <Box surface="none" shadow="none" className="space-y-2">
            <h3 className="text-lg font-semibold text-heading">Release notes</h3>
            <p className="text-foreground">
              Version 2.4 ships improved card spacing and keyboard focus styles.
            </p>
          </Box>
        </Box>
        <CodeBlock code={transparentExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<div>`}</Code> element.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Prop</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>surface</Code>
              </TableCell>
              <TableCell>
                <Code>{`"default" | "none"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"default"`}</Code>
              </TableCell>
              <TableCell>
                Defines whether <Code>Box</Code> renders its default surface or stays transparent.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>padding</Code>
              </TableCell>
              <TableCell>
                <Code>{`"default" | "none"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"default"`}</Code>
              </TableCell>
              <TableCell>Controls the built-in inner spacing of the container.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>shadow</Code>
              </TableCell>
              <TableCell>
                <Code>{`"default" | "none"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"default"`}</Code>
              </TableCell>
              <TableCell>Adds or removes the default card shadow.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default BoxPage;
