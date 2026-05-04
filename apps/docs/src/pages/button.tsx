import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { Link } from 'react-router';
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

const linkSnippet = `import { Link } from 'react-router';

<Button asChild>
  <Link to="/components">Go to</Link>
</Button>`;

function ButtonPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Button</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Button</Code> is an action component used to trigger user interactions with a
          consistent visual style.
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
        <Box className="flex items-center" shadow="none" surface="none">
          <Button>Deploy now</Button>
        </Box>
        <CodeBlock code={exampleJsx} />
        <h3 className="text-lg font-semibold text-heading">Variants</h3>
        <p className="text-base leading-7 text-foreground">
          Use the <Code>variant</Code> prop to change the visual style. Defaults to{' '}
          <Code>primary</Code>.
        </p>
        <Box className="flex flex-wrap items-center gap-3" shadow="none" surface="none">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </Box>
        <CodeBlock code={variantsSnippet} />
        <h3 className="text-lg font-semibold text-heading">Sizes</h3>
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
        <h3 className="text-lg font-semibold text-heading">Links</h3>
        <p className="text-base leading-7 text-foreground">
          Use <Code>asChild</Code> when React Router, Next.js, or another link component owns
          navigation. Native <Code>disabled</Code> behavior remains button-only.
        </p>
        <Box className="flex items-center" shadow="none" surface="none">
          <Button asChild>
            <Link to="/components">Go to</Link>
          </Button>
        </Box>
        <CodeBlock code={linkSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
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
                <Code>{`"primary" | "secondary"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"primary"`}</Code>
              </TableCell>
              <TableCell>Controls the visual treatment of the button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>size</Code>
              </TableCell>
              <TableCell>
                <Code>{`"sm" | "md" | "lg"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"md"`}</Code>
              </TableCell>
              <TableCell>Controls the height and horizontal spacing of the button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>asChild</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Applies Button styling to a child element, such as React Router or Next.js links.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>type</Code>
              </TableCell>
              <TableCell>
                <Code>{`"button" | "submit" | "reset"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"button"`}</Code>
              </TableCell>
              <TableCell>Uses the native button type attribute.</TableCell>
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

export default ButtonPage;
