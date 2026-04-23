import {
  Box,
  PaginationFoot,
  PaginationHead,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
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
        <h1 className="text-3xl font-bold text-heading">Pagination</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>PaginationHead</Code> and <Code>PaginationFoot</Code> are presentational primitives
          for page-size controls, page navigation, and visible range feedback.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Head</h3>
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

        <h3 className="text-lg font-semibold text-heading">Foot</h3>
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
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <h3 className="text-lg font-semibold text-heading">PaginationHead</h3>
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
                <Code>pageSize</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Current number of items shown per page.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>totalItems</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Total number of items across all pages.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onPaginationChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(next: { pageSize: number; pageIndex: number }) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Called when the page size changes. The next page index always resets to{' '}
                <Code>0</Code>.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>{`"items"`}</Code>
              </TableCell>
              <TableCell>Label used in the “per page” control and total count text.</TableCell>
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
                Extends the wrapper layout and can override default visual styles when needed.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>pageSizeOptions</Code>
              </TableCell>
              <TableCell>
                <Code>number[]</Code>
              </TableCell>
              <TableCell>
                <Code>{`[5, 10, 20, 50]`}</Code>
              </TableCell>
              <TableCell>Available page-size options rendered by the select control.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">PaginationFoot</h3>
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
                <Code>pageIndex</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Zero-based current page index.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>pageSize</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Number of items shown per page.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>totalItems</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Total number of items across all pages.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>totalPages</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Total number of pages available.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onPageChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(pageIndex: number) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called when the user navigates to another page.</TableCell>
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
                Extends the wrapper layout and can override default visual styles when needed.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>{`"items"`}</Code>
              </TableCell>
              <TableCell>Label used in the visible range text.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default PaginationPage;
