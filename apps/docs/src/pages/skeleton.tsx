import { Box, Skeleton } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Skeleton } from '@adanft/ui';`;

const usageSnippet = `<Skeleton className="h-4 w-32" />
<Skeleton shape="circle" className="size-10" />
<Skeleton shape="rounded" className="h-24 w-full" />`;

const exampleSnippet = `<div aria-busy="true" className="space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton shape="circle" className="size-12" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-40" />
    </div>
  </div>

  <Skeleton shape="rounded" className="h-24 w-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-2/3" />
</div>`;

function SkeletonPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Skeleton
        </p>
        <h1 className="text-3xl font-bold text-brand">Skeleton</h1>
        <p className="text-foreground">
          <code>Skeleton</code> provides a lightweight loading placeholder for predictable layouts.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Use <code>shape</code>, <code>animation</code>, and <code>className</code> to compose the
          placeholder you need.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Full example</h2>
        <Box className="p-8">
          <div
            aria-busy="true"
            className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" className="size-12" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>

            <Skeleton shape="rounded" className="h-24 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What this v1 includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>
            Shapes: <code>text</code>, <code>block</code>, <code>rounded</code>, <code>circle</code>
            .
          </li>
          <li>
            Animations: <code>pulse</code> and <code>none</code>.
          </li>
          <li>
            Composability through <code>className</code> instead of preset card components.
          </li>
          <li>Motion-safe behavior with reduced-motion respected automatically.</li>
        </ul>
      </section>
    </article>
  );
}

export default SkeletonPage;
