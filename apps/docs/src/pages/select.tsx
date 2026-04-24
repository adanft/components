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
          <Code>Select</Code> is a styled native <Code>{'<select>'}</Code> control for choosing one
          option from a list.
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
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Controls the selected value when used as a controlled component.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>defaultValue</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Sets the initial selected value for uncontrolled usage.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Disables interaction and applies the disabled visual state.</TableCell>
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

export default SelectPage;
