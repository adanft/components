import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Skeleton } from '@adanft/ui';`;

const usageSnippet = `<Skeleton className="h-4 w-32 rounded-sm" />`;

const animatedExampleSnippet = `<div aria-busy="true" className="space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton className="size-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-28 rounded-sm" />
      <Skeleton className="h-3 w-40 rounded-sm" />
    </div>
  </div>

  <Skeleton className="h-24 w-full rounded-md" />
  <Skeleton className="h-4 w-3/4 rounded-sm" />
  <Skeleton className="h-4 w-2/3 rounded-sm" />
</div>`;

const staticExampleSnippet = `<div aria-busy="true" className="space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton animation="none" className="size-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton animation="none" className="h-4 w-28 rounded-sm" />
      <Skeleton animation="none" className="h-3 w-40 rounded-sm" />
    </div>
  </div>

  <Skeleton animation="none" className="h-24 w-full rounded-md" />
  <Skeleton animation="none" className="h-4 w-3/4 rounded-sm" />
  <Skeleton animation="none" className="h-4 w-2/3 rounded-sm" />
</div>`;

function SkeletonPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Skeleton</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Skeleton</Code> provides loading placeholders for content that has not been rendered
          yet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Animated</h3>
        <Box className="p-8" shadow="none" surface="none">
          <div
            aria-busy="true"
            className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded-sm" />
                <Skeleton className="h-3 w-40 rounded-sm" />
              </div>
            </div>

            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-sm" />
            <Skeleton className="h-4 w-2/3 rounded-sm" />
          </div>
        </Box>
        <CodeBlock code={animatedExampleSnippet} />

        <h3 className="text-lg font-semibold text-brand">Without animation</h3>
        <Box className="p-8" shadow="none" surface="none">
          <div
            aria-busy="true"
            className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3">
              <Skeleton animation="none" className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton animation="none" className="h-4 w-28 rounded-sm" />
                <Skeleton animation="none" className="h-3 w-40 rounded-sm" />
              </div>
            </div>

            <Skeleton animation="none" className="h-24 w-full rounded-md" />
            <Skeleton animation="none" className="h-4 w-3/4 rounded-sm" />
            <Skeleton animation="none" className="h-4 w-2/3 rounded-sm" />
          </div>
        </Box>
        <CodeBlock code={staticExampleSnippet} />
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
                <Code>animation</Code>
              </TableCell>
              <TableCell>
                <Code>{`"pulse" | "none"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"pulse"`}</Code>
              </TableCell>
              <TableCell>Controls whether the skeleton animates.</TableCell>
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

export default SkeletonPage;
