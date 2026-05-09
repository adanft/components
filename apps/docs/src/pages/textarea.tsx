import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Textarea } from '@adanft/ui';`;

const usageSnippet = `<Textarea placeholder="Write a message" />`;

const defaultExampleJsx = `<Textarea aria-label="Message" placeholder="Write a message" />`;

const invalidExampleJsx = `<Textarea aria-invalid aria-label="Message" placeholder="Write a message" />`;

const disabledExampleJsx = `<Textarea aria-label="Message" placeholder="Write a message" disabled />`;

function TextareaPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Textarea</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Textarea</Code> is a multi-line text field for longer form content.
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
          <Textarea aria-label="Message" placeholder="Write a message" />
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Invalid</h3>
        <Box shadow="none" surface="none">
          <Textarea aria-invalid aria-label="Message" placeholder="Write a message" />
        </Box>
        <CodeBlock code={invalidExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Disabled</h3>
        <Box shadow="none" surface="none">
          <Textarea aria-label="Message" placeholder="Write a message" disabled />
        </Box>
        <CodeBlock code={disabledExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<textarea>`}</Code> element.
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Attribute</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>aria-invalid</Code>
              </TableCell>
              <TableCell>Applies the invalid visual state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default TextareaPage;
