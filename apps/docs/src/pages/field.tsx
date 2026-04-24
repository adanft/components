import {
  Box,
  Field,
  Input,
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

const importSnippet = `import { Field, Input, Label } from '@adanft/ui';`;

const usageSnippet = `<Field required>
  <Field.Label htmlFor="email">Email *</Field.Label>
  <Input id="email" type="email" required />
  <Field.Description id="email-description">We never share your email.</Field.Description>
</Field>`;

const defaultExampleJsx = `<Field required>
  <Field.Label htmlFor="email">Email *</Field.Label>
  <Input id="email" type="email" required />
  <Field.Description id="email-description">We never share your email.</Field.Description>
</Field>`;

const invalidExampleJsx = `<Field invalid required>
  <Field.Label htmlFor="work-email" data-invalid>
    Work email *
  </Field.Label>
  <Input
    id="work-email"
    type="email"
    required
    aria-invalid="true"
    aria-describedby="work-email-description work-email-error"
    aria-errormessage="work-email-error"
  />
  <Field.Description id="work-email-description">Use your company address.</Field.Description>
  <Field.Error
    id="work-email-error"
    errors={[{ message: 'Email is required.' }, { message: 'Email must be valid.' }]}
  />
</Field>`;

const groupedExampleJsx = `<Field.Set invalid aria-describedby="plan-description plan-error">
  <Field.Legend>Plan</Field.Legend>
  <Field.Description id="plan-description">Choose one option.</Field.Description>
  <RadioGroup value="starter" onValueChange={() => undefined}>
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
  </RadioGroup>
  <Field.Error id="plan-error">You must choose a plan.</Field.Error>
</Field.Set>`;

const workEmailErrors = [{ message: 'Email is required.' }, { message: 'Email must be valid.' }];

function FieldPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Field</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Field</Code> groups labels, controls, helper text, and validation feedback while
          leaving native attributes and ARIA associations explicit.
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
          <Field required>
            <Field.Label htmlFor="email">Email *</Field.Label>
            <Input id="email" type="email" required />
            <Field.Description id="email-description">We never share your email.</Field.Description>
          </Field>
        </Box>
        <CodeBlock code={defaultExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Errors</h3>
        <Box shadow="none" surface="none">
          <Field invalid required>
            <Field.Label htmlFor="work-email" data-invalid>
              Work email *
            </Field.Label>
            <Input
              id="work-email"
              type="email"
              required
              aria-invalid="true"
              aria-describedby="work-email-description work-email-error"
              aria-errormessage="work-email-error"
            />
            <Field.Description id="work-email-description">
              Use your company address.
            </Field.Description>
            <Field.Error id="work-email-error" errors={workEmailErrors} />
          </Field>
        </Box>
        <CodeBlock code={invalidExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Grouped</h3>
        <Box shadow="none" surface="none">
          <Field.Set invalid aria-describedby="plan-description plan-error">
            <Field.Legend>Plan</Field.Legend>
            <Field.Description id="plan-description">Choose one option.</Field.Description>
            <RadioGroup value="starter" onValueChange={() => undefined}>
              <RadioGroup.Item value="starter" label="Starter" />
              <RadioGroup.Item value="pro" label="Pro" />
            </RadioGroup>
            <Field.Error id="plan-error">You must choose a plan.</Field.Error>
          </Field.Set>
        </Box>
        <CodeBlock code={groupedExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Field</h3>
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
                <Code>invalid</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Adds <Code>data-invalid</Code> to the root wrapper for styling hooks.
              </TableCell>
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
                Adds <Code>data-required</Code> to the root wrapper for styling hooks.
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

        <h3 className="text-lg font-semibold text-heading">Field.Set and Field.Legend</h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            <Code>Field.Set</Code> renders a native <Code>{'<fieldset>'}</Code> for grouped
            controls. It accepts native fieldset attributes plus <Code>invalid</Code> and{' '}
            <Code>required</Code> styling hooks.
          </p>
          <p>
            <Code>Field.Legend</Code> renders the group title as a native <Code>{'<legend>'}</Code>.
            Pass attributes like <Code>aria-describedby</Code> directly to <Code>Field.Set</Code>{' '}
            when helper or error text should describe the group.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-heading">
          Field.Label, Field.Description and Field.Error
        </h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            <Code>Field.Label</Code> renders a styled native <Code>{'<label>'}</Code>. Use{' '}
            <Code>htmlFor</Code> with the control <Code>id</Code>, and add <Code>data-invalid</Code>{' '}
            when the label should use the invalid state.
          </p>
          <p>
            <Code>Field.Description</Code> renders helper text as a native paragraph.{' '}
            <Code>Field.Error</Code> renders validation feedback with <Code>role="alert"</Code> by
            default.
          </p>
          <p>
            Pass <Code>children</Code> to <Code>Field.Error</Code> for custom content, or pass an{' '}
            <Code>errors</Code> array with message objects to render one or more unique messages.
          </p>
          <p>
            Use native IDs and ARIA props explicitly, for example <Code>Label htmlFor</Code>,{' '}
            <Code>Input id</Code>, and <Code>aria-describedby</Code>. The field primitives do not
            generate IDs or clone controls.
          </p>
        </div>
      </section>
    </article>
  );
}

export default FieldPage;
