import { Box, PaginationFoot, PaginationHead } from '@adanft/ui';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { PaginationFoot, PaginationHead } from '@adanft/ui';`;

const usageSnippet = `const totalItems = 125;
const [pageIndex, setPageIndex] = useState(0);
const [pageSize, setPageSize] = useState(10);

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
/>`;

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

function PaginationPage() {
  const [headPageSize, setHeadPageSize] = useState(10);
  const [footPageIndex, setFootPageIndex] = useState(2);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Pagination</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>PaginationHead</Code> and <Code>PaginationFoot</Code> are presentational primitives
          for page-size controls, page navigation, and visible range feedback.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Head</h3>
        <Box shadow="none" surface="none">
          <PaginationHead
            pageSize={headPageSize}
            totalItems={125}
            onPaginationChange={({ pageSize }) => {
              setHeadPageSize(pageSize);
            }}
          />
        </Box>
        <CodeBlock code={headSnippet} />

        <h3 className="text-lg font-semibold text-brand">Foot</h3>
        <Box shadow="none" surface="none">
          <PaginationFoot
            pageIndex={footPageIndex}
            pageSize={10}
            totalItems={125}
            totalPages={13}
            onPageChange={setFootPageIndex}
          />
        </Box>
        <CodeBlock code={footSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
        <h3 className="text-lg font-semibold text-brand">PaginationHead</h3>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
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
                  <Code>pageSize</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>number</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Current number of items shown per page.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>totalItems</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>number</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Total number of items across all pages.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>onPaginationChange</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`(next: { pageSize: number; pageIndex: number }) => void`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Called when the page size changes. The next page index always resets to{' '}
                  <Code>0</Code>.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>label</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"items"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Label used in the “per page” control and total count text.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Extends the wrapper layout and can override default visual styles when needed.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>pageSizeOptions</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>number[]</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>{`[5, 10, 20, 50]`}</Code>
                </td>
                <td className="px-4 py-3">
                  Available page-size options rendered by the select control.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">PaginationFoot</h3>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
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
                  <Code>pageIndex</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>number</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">Zero-based current page index.</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>pageSize</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>number</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Number of items shown per page.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>totalItems</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>number</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Total number of items across all pages.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>totalPages</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>number</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Total number of pages available.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>onPageChange</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`(pageIndex: number) => void`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Called when the user navigates to another page.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Extends the wrapper layout and can override default visual styles when needed.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>label</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>{`"items"`}</Code>
                </td>
                <td className="px-4 py-3">Label used in the visible range text.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default PaginationPage;
