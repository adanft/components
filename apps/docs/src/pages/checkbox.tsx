import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Checkbox } from '@adanft/ui';`;

const usageSnippet = `<Checkbox label="Accept terms" onChange={() => {}} />`;

const statesSnippet = `<Checkbox label="Unchecked" onChange={() => {}} />
<Checkbox label="Checked" checked onChange={() => {}} />
<Checkbox label="Disabled" disabled onChange={() => {}} />
<Checkbox aria-invalid label="Invalid" onChange={() => {}} />`;

const labelPositionSnippet = `<Checkbox label="Label on the right (default)" labelPosition="right" onChange={() => {}} />
<Checkbox label="Label on the left" labelPosition="left" onChange={() => {}} />
<Checkbox label="Label on top" labelPosition="top" onChange={() => {}} />
<Checkbox label="Label on bottom" labelPosition="bottom" onChange={() => {}} />`;

const withoutLabelSnippet = `<Checkbox aria-label="Accept terms" onChange={() => {}} />`;

function CheckboxPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Checkbox</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Checkbox</Code> is a form control used to toggle a checked or unchecked state.
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
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Checkbox label="Accept terms" onChange={() => {}} />
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-heading">States</h3>
        <Box className="flex flex-wrap items-center gap-6" shadow="none" surface="none">
          <Checkbox label="Unchecked" onChange={() => {}} />
          <Checkbox label="Checked" defaultChecked onChange={() => {}} />
          <Checkbox label="Disabled" disabled onChange={() => {}} />
          <Checkbox aria-invalid label="Invalid" onChange={() => {}} />
        </Box>
        <CodeBlock code={statesSnippet} />

        <h3 className="text-lg font-semibold text-heading">Label position</h3>
        <Box className="flex flex-wrap items-center gap-8" shadow="none" surface="none">
          <Checkbox label="Right (default)" labelPosition="right" onChange={() => {}} />
          <Checkbox label="Left" labelPosition="left" onChange={() => {}} />
          <Checkbox label="Top" labelPosition="top" onChange={() => {}} />
          <Checkbox label="Bottom" labelPosition="bottom" onChange={() => {}} />
        </Box>
        <CodeBlock code={labelPositionSnippet} />

        <h3 className="text-lg font-semibold text-heading">Without label</h3>
        <p className="text-foreground">
          When no <Code>label</Code> prop is provided, make sure the control still has an accessible
          name through <Code>aria-label</Code> or <Code>aria-labelledby</Code>.
        </p>
        <Box className="flex items-center gap-4" shadow="none" surface="none">
          <Checkbox aria-label="Accept terms" onChange={() => {}} />
        </Box>
        <CodeBlock code={withoutLabelSnippet} />
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
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Optional text rendered next to the checkbox.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>labelPosition</Code>
              </TableCell>
              <TableCell>
                <Code>{`"left" | "right" | "top" | "bottom"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"right"`}</Code>
              </TableCell>
              <TableCell>Controls where the label appears relative to the checkbox.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>checked</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Controls the checked state when used as a controlled input.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>defaultChecked</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Sets the initial checked state for uncontrolled usage.</TableCell>
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
                <Code>aria-invalid</Code>
              </TableCell>
              <TableCell>
                <Code>{`boolean | "true" | "false"`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Marks the input invalid and applies the invalid visual state.</TableCell>
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

export default CheckboxPage;
