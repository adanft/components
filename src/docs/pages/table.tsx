import {
  Box,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import {
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableHeadCell,
  TableCell,
  TableCaption,
} from '../../lib';`;

const usageSnippet = `<Table>
  <TableCaption>Quarterly revenue by account owner.</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeadCell>Owner</TableHeadCell>
      <TableHeadCell>Region</TableHeadCell>
      <TableHeadCell className="text-right">Revenue</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Ana Torres</TableCell>
      <TableCell>LATAM</TableCell>
      <TableCell className="text-right">$42,300</TableCell>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableHeadCell scope="row" colSpan={2}>Total</TableHeadCell>
      <TableCell className="text-right font-semibold">$42,300</TableCell>
    </TableRow>
  </TableFoot>
</Table>`;

function TablePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Table
        </p>
        <h1 className="text-3xl font-bold text-brand">Table</h1>
        <p className="text-foreground">
          <code>Table</code> is a semantic composition set for data grids. Build structure with{' '}
          <code>TableHead</code>, <code>TableBody</code>, and <code>TableFoot</code>; then compose
          rows and cells with <code>TableRow</code>, <code>TableHeadCell</code>, and{' '}
          <code>TableCell</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Prefer header cells for labels, add a caption for context, and keep numeric values aligned
          for readability.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="overflow-x-auto">
          <Table>
            <TableCaption>Current month pipeline by account owner.</TableCaption>
            <TableHead>
              <TableRow>
                <TableHeadCell>Owner</TableHeadCell>
                <TableHeadCell>Stage</TableHeadCell>
                <TableHeadCell className="text-right">Deals</TableHeadCell>
                <TableHeadCell className="text-right">Pipeline</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Ana Torres</TableCell>
                <TableCell>Negotiation</TableCell>
                <TableCell className="text-right">7</TableCell>
                <TableCell className="text-right">$42,300</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Diego Ruiz</TableCell>
                <TableCell>Proposal</TableCell>
                <TableCell className="text-right">5</TableCell>
                <TableCell className="text-right">$31,700</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Camila Vega</TableCell>
                <TableCell>Qualified</TableCell>
                <TableCell className="text-right">9</TableCell>
                <TableCell className="text-right">$58,900</TableCell>
              </TableRow>
            </TableBody>

            <TableFoot>
              <TableRow>
                <TableHeadCell scope="row" colSpan={2}>
                  Total
                </TableHeadCell>
                <TableCell className="text-right font-semibold">21</TableCell>
                <TableCell className="text-right font-semibold">$132,900</TableCell>
              </TableRow>
            </TableFoot>
          </Table>
        </Box>
      </section>
    </article>
  );
}

export default TablePage;
