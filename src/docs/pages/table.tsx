import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Table } from '../../lib';
import { CodeBlock } from '../code-block';

// ─────────────────────────────────────────────────────────────────────────────
// Snippets
// ─────────────────────────────────────────────────────────────────────────────

const importSnippet = `import { Table } from '@your-org/components';`;

const presentationalSnippet = `const headers = ['Owner', 'Stage', 'Deals', 'Pipeline'];

const rows = [
  { owner: 'Ana Torres', stage: 'Negotiation', deals: 7, pipeline: '$42,300' },
];

<Table aria-label="Deals">
  <Table.Head
    headers={headers}
    renderHeader={(header) => header}
  />
  <Table.Body
    rows={rows}
    getRowKey={(row) => row.owner}
    getRowCells={(row) => [row.owner, row.stage, row.deals, row.pipeline]}
    renderCell={(cell) => cell}
    striped
  />
</Table>`;

const footSnippet = `<Table aria-label="Deals summary">
  <Table.Head headers={headers} renderHeader={(header) => header} />
  <Table.Body
    rows={rows}
    getRowKey={(row) => row.owner}
    getRowCells={(row) => [row.owner, row.stage, row.deals, row.pipeline]}
    renderCell={(cell) => cell}
  />
  <Table.Foot>
    <tr>
      <td colSpan={2}>Total</td>
      <td className="text-right font-semibold">7</td>
      <td className="text-right font-semibold">$42,300</td>
    </tr>
  </Table.Foot>
</Table>`;

const tanstackSnippet = `import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

type User = { name: string; role: string };

const columnDefs: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
];

function TanStackTable() {
  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table aria-label="Users">
      <Table.Head
        headers={table.getFlatHeaders()}
        getHeaderKey={(header) => header.id}
        renderHeader={(header) =>
          flexRender(header.column.columnDef.header, header.getContext())
        }
      />
      <Table.Body
        rows={table.getRowModel().rows}
        getRowKey={(row) => row.id}
        getRowCells={(row) => row.getVisibleCells()}
        getCellKey={(cell) => cell.id}
        renderCell={(cell) =>
          flexRender(cell.column.columnDef.cell, cell.getContext())
        }
      />
    </Table>
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// Example data
// ─────────────────────────────────────────────────────────────────────────────

type Deal = { owner: string; stage: string; deals: number; pipeline: string };

const deals: Deal[] = [
  { owner: 'Ana Torres', stage: 'Negotiation', deals: 7, pipeline: '$42,300' },
  { owner: 'Diego Ruiz', stage: 'Proposal', deals: 5, pipeline: '$31,700' },
  { owner: 'Camila Vega', stage: 'Qualified', deals: 9, pipeline: '$58,900' },
];

const dealHeaders = ['Owner', 'Stage', 'Deals', 'Pipeline'] as const;

// ─────────────────────────────────────────────────────────────────────────────
type User = { name: string; role: string };

const users: User[] = [
  { name: 'Ana Torres', role: 'Admin' },
  { name: 'Diego Ruiz', role: 'Editor' },
  { name: 'Camila Vega', role: 'Viewer' },
  { name: 'Luis Mora', role: 'Editor' },
];

const userColumnDefs: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
];

function SortableTableExample() {
  const table = useReactTable({
    data: users,
    columns: userColumnDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table aria-label="Users">
      <Table.Head
        headers={table.getFlatHeaders()}
        getHeaderKey={(header) => header.id}
        renderHeader={(header) => flexRender(header.column.columnDef.header, header.getContext())}
      />
      <Table.Body
        rows={table.getRowModel().rows}
        getRowKey={(row) => row.id}
        getRowCells={(row) => row.getVisibleCells()}
        getCellKey={(cell) => cell.id}
        renderCell={(cell) => flexRender(cell.column.columnDef.cell, cell.getContext())}
      />
    </Table>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function TablePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Table
        </p>
        <h1 className="text-3xl font-bold text-brand">Table</h1>
        <p className="text-foreground">
          <code>Table</code> is a presentational compound component. The root renders the bordered
          shell and native <code>{'<table>'}</code>, while <code>Table.Head</code> and{' '}
          <code>Table.Body</code> receive precomputed headers, rows, and render functions.
        </p>
      </header>

      {/* ── Import ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Import</h2>
        <CodeBlock code={importSnippet} />
      </section>

      {/* ── Standalone ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Presentational usage</h2>
        <p className="text-foreground">
          Pass plain headers and rows when you already know the final shape you want to render.
          <code>striped</code> now belongs to <code>Table.Body</code> because row styling is a body
          concern, not root orchestration.
        </p>
        <CodeBlock code={presentationalSnippet} />
        <Box className="overflow-x-auto">
          <Table aria-label="Deals">
            <Table.Head headers={dealHeaders} renderHeader={(header) => header} />
            <Table.Body
              rows={deals}
              getRowKey={(row) => row.owner}
              getRowCells={(row) => [row.owner, row.stage, row.deals, row.pipeline]}
              renderCell={(cell, _row, _rowIndex, cellIndex) =>
                cellIndex >= 2 ? <span className="block text-right">{cell}</span> : cell
              }
              striped
            />
          </Table>
        </Box>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">With Table.Foot</h2>
        <p className="text-foreground">
          <code>Table.Foot</code> is a semantic <code>{'<tfoot>'}</code> pass-through. You own the
          footer rows, so add your own <code>{'<tr>'}</code> and keep any <code>colSpan</code>
          exactly where you need it.
        </p>
        <CodeBlock code={footSnippet} />
        <Box className="overflow-x-auto">
          <Table aria-label="Deals summary">
            <Table.Head headers={dealHeaders} renderHeader={(header) => header} />
            <Table.Body
              rows={deals}
              getRowKey={(row) => row.owner}
              getRowCells={(row) => [row.owner, row.stage, row.deals, row.pipeline]}
              renderCell={(cell, _row, _rowIndex, cellIndex) =>
                cellIndex >= 2 ? <span className="block text-right">{cell}</span> : cell
              }
            />
            <Table.Foot>
              <tr>
                <td colSpan={2} className="px-4 py-3 text-sm font-semibold text-foreground">
                  Total
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-right text-foreground">21</td>
                <td className="px-4 py-3 text-sm font-semibold text-right text-foreground">
                  $132,900
                </td>
              </tr>
            </Table.Foot>
          </Table>
        </Box>
      </section>

      {/* ── TanStack (sorting) ─────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">TanStack adapter usage</h2>
        <p className="text-foreground">
          Keep TanStack outside the component boundary. Build the table instance in your app, then
          adapt <code>getFlatHeaders()</code>, <code>getRowModel().rows</code>, and{' '}
          <code>flexRender(...)</code> into the presentational props.
        </p>
        <CodeBlock code={tanstackSnippet} />
        <Box className="overflow-x-auto">
          <SortableTableExample />
        </Box>
      </section>
    </article>
  );
}

export default TablePage;
