import {
  Box,
  Select,
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

const importSnippet = `import { Select } from '@adanft/ui';`;

const usageSnippet = `<Select placeholder="Choose a plan" defaultValue="starter">
  <option value="starter">Starter</option>
  <option value="pro">Pro</option>
  <option value="team">Team</option>
</Select>`;

const defaultExampleSnippet = `<Select aria-label="Choose plan" defaultValue="starter">
  <option value="starter">Starter</option>
  <option value="pro">Pro</option>
  <option value="team">Team</option>
</Select>`;

const invalidExampleSnippet = `<Select aria-invalid aria-label="Choose plan" defaultValue="">
  <option value="">Choose a plan</option>
  <option value="starter">Starter</option>
  <option value="pro">Pro</option>
</Select>`;

const exampleSnippet = `const [value, setValue] = useState('pro');

<Select
  aria-label="Choose billing plan"
  className="min-w-72"
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="Choose a plan"
>
  <option value="starter">Starter — Basic tools for personal work</option>
  <option value="pro">Pro — Advanced collaboration for small teams</option>
  <option value="team">Team — Shared workflows for growing product squads</option>
  <option value="business">Business — Governance and reporting for larger teams</option>
  <option value="enterprise" disabled>Enterprise — Coming soon</option>
</Select>`;

function SelectPage() {
  const [value, setValue] = useState('pro');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Select</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Select</Code> lets users choose one option from a list.
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
        <Box shadow="none" surface="none">
          <Select aria-label="Choose plan" defaultValue="starter">
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="team">Team</option>
          </Select>
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Invalid</h3>
        <Box shadow="none" surface="none">
          <Select aria-invalid aria-label="Choose plan" defaultValue="">
            <option value="">Choose a plan</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
          </Select>
        </Box>
        <CodeBlock code={invalidExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Controlled</h3>
        <Box shadow="none" surface="none">
          <Select
            aria-label="Choose billing plan"
            className="min-w-72"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Choose a plan">
            <option value="starter">Starter — Basic tools for personal work</option>
            <option value="pro">Pro — Advanced collaboration for small teams</option>
            <option value="team">Team — Shared workflows for growing product squads</option>
            <option value="business">Business — Governance and reporting for larger teams</option>
            <option value="enterprise" disabled>
              Enterprise — Coming soon
            </option>
          </Select>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<select>`}</Code> element.
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
                <Code>placeholder</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Renders an initial disabled option when provided.</TableCell>
            </TableRow>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Attribute</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>data-placeholder</Code>
              </TableCell>
              <TableCell>Applies the placeholder visual state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-invalid</Code>
              </TableCell>
              <TableCell>Applies the invalid visual state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-hidden</Code>
              </TableCell>
              <TableCell>Hides the decorative chevron icon from assistive technology.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default SelectPage;
