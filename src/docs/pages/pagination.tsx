import { useState } from 'react';

import { Box, PaginationFoot, PaginationHead } from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import { PaginationFoot, PaginationHead } from '@your-org/components';`;

const headSnippet = `<PaginationHead
  pageSize={pageSize}
  totalItems={125}
  onPaginationChange={({ pageSize, pageIndex }) => {
    setPageSize(pageSize);
    setPageIndex(pageIndex);
  }}
/>`;

const footSnippet = `<PaginationFoot
  pageIndex={pageIndex}
  pageSize={pageSize}
  totalItems={125}
  totalPages={Math.ceil(125 / pageSize)}
  onPageChange={setPageIndex}
/>`;

const fullSnippet = `function PaginationExample() {
  const totalItems = 125;
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <>
      <PaginationHead
        pageSize={pageSize}
        totalItems={totalItems}
        onPaginationChange={({ pageSize, pageIndex }) => {
          setPageSize(pageSize);
          setPageIndex(pageIndex);
        }}
      />

      <PaginationFoot
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={setPageIndex}
      />
    </>
  );
}`;

function PaginationPreview() {
  const totalItems = 125;
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-4">
      <PaginationHead
        pageSize={pageSize}
        totalItems={totalItems}
        onPaginationChange={({ pageSize, pageIndex }) => {
          setPageSize(pageSize);
          setPageIndex(pageIndex);
        }}
      />
      <PaginationFoot
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPageIndex}
      />
    </div>
  );
}

function PaginationPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Pagination
        </p>
        <h1 className="text-3xl font-bold text-brand">Pagination</h1>
        <p className="text-foreground">
          <code>PaginationHead</code> and <code>PaginationFoot</code> are presentational pagination
          primitives. Keep routing, TanStack Table, or any other state management outside the
          component boundary and adapt them through <code>onPaginationChange</code> and{' '}
          <code>onPageChange</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Import</h2>
        <CodeBlock code={importSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Head</h2>
        <p className="text-foreground">
          Use <code>PaginationHead</code> to control page size and reset pagination back to the
          first page when the size changes.
        </p>
        <CodeBlock code={headSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Foot</h2>
        <p className="text-foreground">
          Use <code>PaginationFoot</code> to render page navigation, previous and next actions, and
          the current visible range.
        </p>
        <CodeBlock code={footSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <p className="text-foreground">
          The two components are designed to work together, but they stay state-agnostic so you can
          plug them into local state, URL params, or TanStack Table.
        </p>
        <Box className="space-y-4">
          <PaginationPreview />
        </Box>
        <CodeBlock code={fullSnippet} />
      </section>
    </article>
  );
}

export default PaginationPage;
