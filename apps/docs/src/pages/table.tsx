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

const importSnippet = `// Package root import
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';

// Public package subpath import
import Table, {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui/table';`;

const usageSnippet = `<Table aria-label="Deals">
  <TableCaption>Pipeline by owner</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
      <TableHead scope="col">Deals</TableHead>
      <TableHead scope="col">Pipeline</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana Torres</TableCell>
      <TableCell>Negotiation</TableCell>
      <TableCell>7</TableCell>
      <TableCell>$42,300</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

const simpleExampleJsx = `<Table aria-label="Deals">
  <TableCaption>Pipeline by owner</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
      <TableHead scope="col">Deals</TableHead>
      <TableHead scope="col">Pipeline</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana Torres</TableCell>
      <TableCell>Negotiation</TableCell>
      <TableCell>7</TableCell>
      <TableCell>$42,300</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Diego Ruiz</TableCell>
      <TableCell>Proposal</TableCell>
      <TableCell>5</TableCell>
      <TableCell>$31,700</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Camila Vega</TableCell>
      <TableCell>Qualified</TableCell>
      <TableCell>9</TableCell>
      <TableCell>$58,900</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

const footerExampleJsx = `<Table aria-label="Deals summary">
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Owner</TableHead>
      <TableHead scope="col">Stage</TableHead>
      <TableHead scope="col">Deals</TableHead>
      <TableHead scope="col">Pipeline</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana Torres</TableCell>
      <TableCell>Negotiation</TableCell>
      <TableCell>7</TableCell>
      <TableCell>$42,300</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Diego Ruiz</TableCell>
      <TableCell>Proposal</TableCell>
      <TableCell>5</TableCell>
      <TableCell>$31,700</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Camila Vega</TableCell>
      <TableCell>Qualified</TableCell>
      <TableCell>9</TableCell>
      <TableCell>$58,900</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>21</TableCell>
      <TableCell>$132,900</TableCell>
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
        <h1 className="text-3xl font-bold text-heading">Table</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Table</Code> displays structured tabular data with consistent base styles and
          semantic HTML.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Simple</h3>
        <Box shadow="none" surface="none">
          <Table aria-label="Deals">
            <TableCaption>Pipeline by owner</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Owner</TableHead>
                <TableHead scope="col">Stage</TableHead>
                <TableHead scope="col">Deals</TableHead>
                <TableHead scope="col">Pipeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.owner}>
                  <TableCell>{deal.owner}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell>{deal.deals}</TableCell>
                  <TableCell>{deal.pipeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <CodeBlock code={simpleExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Footer</h3>
        <Box shadow="none" surface="none">
          <Table aria-label="Deals summary">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Owner</TableHead>
                <TableHead scope="col">Stage</TableHead>
                <TableHead scope="col">Deals</TableHead>
                <TableHead scope="col">Pipeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.owner}>
                  <TableCell>{deal.owner}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell>{deal.deals}</TableCell>
                  <TableCell>{deal.pipeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell>21</TableCell>
                <TableCell>$132,900</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
        <CodeBlock code={footerExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Table</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<table>`}</Code> element inside a scrollable
          container.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableCaption</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<caption>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableHeader</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<thead>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableBody</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<tbody>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableFooter</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<tfoot>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableRow</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<tr>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableHead</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<th>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">TableCell</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<td>`}</Code> element.
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
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the component styles.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default TablePage;
