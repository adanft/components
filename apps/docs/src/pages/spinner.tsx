import {
  Box,
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Spinner } from '@adanft/ui';`;

const usageSnippet = `<Spinner />`;

const defaultExampleJsx = `<Spinner />`;

const speedsExampleJsx = `<div className="flex items-center gap-4">
  <Spinner speed="slow" />
  <Spinner speed="normal" />
  <Spinner speed="fast" />
</div>`;

const decorativeExampleJsx = `<Button disabled>
  <Spinner aria-hidden="true" className="mr-2 size-4 text-white" />
  Saving
</Button>`;

const largeInfoExampleJsx = `<Spinner className="size-24 text-success" />`;

function SpinnerPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Spinner</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Spinner</Code> is a loading indicator for indeterminate actions or pending states.
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
        <Box className="flex items-center justify-center p-8" shadow="none" surface="none">
          <Spinner />
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Speed</h3>
        <Box className="p-8" shadow="none" surface="none">
          <div className="flex items-center gap-4">
            <Spinner speed="slow" />
            <Spinner speed="normal" />
            <Spinner speed="fast" />
          </div>
        </Box>
        <CodeBlock code={speedsExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Loading button</h3>
        <Box shadow="none" surface="none">
          <Button disabled>
            <Spinner aria-hidden="true" className="mr-2 size-4 text-white" />
            Saving
          </Button>
        </Box>
        <CodeBlock code={decorativeExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Custom spinner</h3>
        <Box className="flex items-center justify-center p-8" shadow="none" surface="none">
          <Spinner className="size-24 text-success" />
        </Box>
        <CodeBlock code={largeInfoExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<svg>`}</Code> element.
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
                <Code>speed</Code>
              </TableCell>
              <TableCell>
                <Code>{`"slow" | "normal" | "fast"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"normal"`}</Code>
              </TableCell>
              <TableCell>
                Controls the spinner animation duration with subtle timing steps.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>{`"Loading"`}</Code>
              </TableCell>
              <TableCell>Names the status when the spinner itself announces loading.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-hidden</Code>
              </TableCell>
              <TableCell>
                <Code>{`boolean | "true" | "false"`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Hides decorative spinners from assistive technology.</TableCell>
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
                Adjusts size and color with utilities like <Code>size-24</Code> or{' '}
                <Code>text-info</Code>.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default SpinnerPage;
