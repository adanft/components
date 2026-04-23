import {
  Box,
  Field,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Field } from '@adanft/ui';`;

const usageSnippet = `<Field id="email" invalid required>
  <Field.Label>Email</Field.Label>
  <Field.Control asChild>
    <input type="email" />
  </Field.Control>
  <Field.Description>We never share your email.</Field.Description>
  <Field.Error>Email is required.</Field.Error>
</Field>`;

const singleControlExampleJsx = `<Field id="email" invalid required>
  <Field.Label>Email</Field.Label>
  <Field.Control asChild>
    <input type="email" />
  </Field.Control>
  <Field.Description>We never share your email.</Field.Description>
  <Field.Error>Email is required.</Field.Error>
</Field>`;

const groupedExampleJsx = `<Field.Set invalid>
  <Field.Legend>Plan</Field.Legend>
  <Field.Description>Choose one option.</Field.Description>
  <RadioGroup value="starter" onValueChange={() => undefined}>
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
  </RadioGroup>
  <Field.Error>You must choose a plan.</Field.Error>
</Field.Set>`;

function FieldPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Field</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Field</Code> wires labels, descriptions, errors, and controls into an accessible
          form structure.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Single Control</h3>
        <Box shadow="none" surface="none">
          <Field id="email" invalid required>
            <Field.Label>Email</Field.Label>
            <Field.Control asChild>
              <input type="email" />
            </Field.Control>
            <Field.Description>We never share your email.</Field.Description>
            <Field.Error>Email is required.</Field.Error>
          </Field>
        </Box>
        <CodeBlock code={singleControlExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Grouped</h3>
        <Box shadow="none" surface="none">
          <Field.Set invalid>
            <Field.Legend>Plan</Field.Legend>
            <Field.Description>Choose one option.</Field.Description>
            <RadioGroup value="starter" onValueChange={() => undefined}>
              <RadioGroup.Item value="starter" label="Starter" />
              <RadioGroup.Item value="pro" label="Pro" />
            </RadioGroup>
            <Field.Error>You must choose a plan.</Field.Error>
          </Field.Set>
        </Box>
        <CodeBlock code={groupedExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>

        <h3 className="text-lg font-semibold text-brand">Field</h3>
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
                <Code>id</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>auto</TableCell>
              <TableCell>
                Optional control id used to wire the label, description, and error state.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>invalid</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Marks the field as invalid and enables error wiring.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>required</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Marks the field as required and appends the required indicator to labels.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the root field wrapper.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-brand">Field.Control</h3>
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
                <Code>asChild</Code>
              </TableCell>
              <TableCell>
                <Code>true</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Injects field wiring into the child form control.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>ReactElement</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Expects a single valid form control element.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-brand">Field.Set and Field.Legend</h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            Use <Code>Field.Set</Code> and <Code>Field.Legend</Code> for grouped controls such as
            radio groups.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-brand">
          Field.Label, Field.Description and Field.Error
        </h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            Use <Code>Field.Label</Code> for single controls, <Code>Field.Description</Code> for
            helper text, and <Code>Field.Error</Code> for validation feedback.
          </p>
          <p>
            Inside <Code>Field.Set</Code>, use <Code>Field.Legend</Code> instead of{' '}
            <Code>Field.Label</Code>.
          </p>
        </div>
      </section>
    </article>
  );
}

export default FieldPage;
