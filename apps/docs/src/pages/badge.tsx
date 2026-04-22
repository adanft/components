import {
  Badge,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Badge } from '@adanft/ui';`;

const usageSnippet = `<Badge>Beta</Badge>`;

const variantsSnippet = `<Badge variant="primary">New</Badge>
<Badge>Beta</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="outline">Internal</Badge>`;

function BadgePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Badge</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Badge</Code> is a compact label used to display short metadata, states, or
          categories.
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
        <Box className="flex items-center gap-3" shadow="none" surface="none">
          <Badge>Beta</Badge>
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-brand">Variants</h3>
        <Box className="flex flex-wrap items-center gap-3" shadow="none" surface="none">
          <Badge variant="primary">New</Badge>
          <Badge>Beta</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="danger">Error</Badge>
          <Badge variant="outline">Internal</Badge>
        </Box>
        <CodeBlock code={variantsSnippet} />
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
                <Code>variant</Code>
              </TableCell>
              <TableCell>
                <Code>{`"primary" | "secondary" | "success" | "danger" | "outline"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"secondary"`}</Code>
              </TableCell>
              <TableCell>Controls the visual treatment of the badge.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Extends the component styles and can override default values when needed.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default BadgePage;
