import {
  Box,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';`;

const usageSnippet = `<Table aria-label="Deals">
  <TableCaption>Pipeline by owner</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
      <TableHead scope="col" className="text-right">Deals</TableHead>
      <TableHead scope="col" className="text-right">Pipeline</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana Torres</TableCell>
      <TableCell>Negotiation</TableCell>
      <TableCell className="text-right">7</TableCell>
      <TableCell className="text-right">$42,300</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

const simpleExampleJsx = `<Table aria-label="Deals">
  <TableCaption>Pipeline by owner</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
      <TableHead scope="col" className="text-right">Deals</TableHead>
      <TableHead scope="col" className="text-right">Pipeline</TableHead>
    </TableRow>
  </TableHeader>
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
</Table>`;

const footerExampleJsx = `<Table aria-label="Deals summary">
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
      <TableHead scope="col" className="text-right">Deals</TableHead>
      <TableHead scope="col" className="text-right">Pipeline</TableHead>
    </TableRow>
  </TableHeader>
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
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2} className="font-semibold text-foreground">Total</TableCell>
      <TableCell className="text-right font-semibold text-foreground">21</TableCell>
      <TableCell className="text-right font-semibold text-foreground">$132,900</TableCell>
    </TableRow>
  </TableFooter>
</Table>`;

type Deal = {
  deals: number;
  owner: string;
  pipeline: string;
  stage: string;
};

const deals: Deal[] = [
  { owner: 'Ana Torres', stage: 'Negotiation', deals: 7, pipeline: '$42,300' },
  { owner: 'Diego Ruiz', stage: 'Proposal', deals: 5, pipeline: '$31,700' },
  { owner: 'Camila Vega', stage: 'Qualified', deals: 9, pipeline: '$58,900' },
];

function TablePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Table</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Table</Code> displays structured tabular data with consistent base styles and
          semantic HTML.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Simple</h3>
        <Box shadow="none" surface="none">
          <Table aria-label="Deals">
            <TableCaption>Pipeline by owner</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Owner</TableHead>
                <TableHead scope="col">Stage</TableHead>
                <TableHead scope="col" className="text-right">
                  Deals
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Pipeline
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.owner}>
                  <TableCell>{deal.owner}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell className="text-right">{deal.deals}</TableCell>
                  <TableCell className="text-right">{deal.pipeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <CodeBlock code={simpleExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Footer</h3>
        <Box shadow="none" surface="none">
          <Table aria-label="Deals summary">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Owner</TableHead>
                <TableHead scope="col">Stage</TableHead>
                <TableHead scope="col" className="text-right">
                  Deals
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Pipeline
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.owner}>
                  <TableCell>{deal.owner}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell className="text-right">{deal.deals}</TableCell>
                  <TableCell className="text-right">{deal.pipeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="font-semibold text-foreground">
                  Total
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">21</TableCell>
                <TableCell className="text-right font-semibold text-foreground">$132,900</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
        <CodeBlock code={footerExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>

        <h3 className="text-lg font-semibold text-brand">Table</h3>
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
                  <Code>className</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Extends the base table element inside the scrollable wrapper.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">native table props</td>
                <td className="px-4 py-3">table attributes</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Supports semantic attributes like <Code>aria-label</Code> directly on the table.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">TableCaption</h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            Use <Code>TableCaption</Code> when the table needs a short textual label or summary.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-brand">TableHeader, TableBody and TableFooter</h3>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Component</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>TableHeader</Code>
                </td>
                <td className="border-b border-border px-4 py-3">Wraps column headers.</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>TableBody</Code>
                </td>
                <td className="border-b border-border px-4 py-3">Wraps the main table rows.</td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>TableFooter</Code>
                </td>
                <td className="px-4 py-3">Wraps totals or summary rows.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">TableRow, TableHead and TableCell</h3>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Component</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>TableRow</Code>
                </td>
                <td className="border-b border-border px-4 py-3">Defines a single row.</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>TableHead</Code>
                </td>
                <td className="border-b border-border px-4 py-3">Defines a header cell.</td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>TableCell</Code>
                </td>
                <td className="px-4 py-3">Defines a body or footer cell.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default TablePage;
