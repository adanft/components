import {
  Box,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Input } from '@adanft/ui';`;

const usageSnippet = `<Input type="email" placeholder="name@example.com" />`;

const defaultExampleJsx = `<Input type="email" placeholder="name@example.com" />`;

const disabledExampleJsx = `<Input type="email" placeholder="name@example.com" disabled />`;

function InputPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Input</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Input</Code> is a simple text field primitive with base styles for common form
          entry.
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
          <Input type="email" placeholder="name@example.com" />
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Disabled</h3>
        <Box shadow="none" surface="none">
          <Input type="email" placeholder="name@example.com" disabled />
        </Box>
        <CodeBlock code={disabledExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
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
                <Code>type</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>"text"</Code>
              </TableCell>
              <TableCell>Uses the native input type attribute.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the base input styles.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>native input props</TableCell>
              <TableCell>input attributes</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Supports native attributes like placeholder, disabled, value, and name.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default InputPage;
