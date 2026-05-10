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

const importSnippet = `import { Field, Input, RadioGroup } from '@adanft/ui';`;

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
          <Code>Field</Code> groups form labels, controls, helper text, and validation messages.
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
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<div>`}</Code> element.
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
                <Code>invalid</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Adds the invalid field state.</TableCell>
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
              <TableCell>Adds the required field state.</TableCell>
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
                <Code>data-invalid</Code>
              </TableCell>
              <TableCell>Reflects the invalid field state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-required</Code>
              </TableCell>
              <TableCell>Reflects the required field state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Field.Set</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<fieldset>`}</Code> element.
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
                <Code>invalid</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Adds the invalid field state.</TableCell>
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
              <TableCell>Adds the required field state.</TableCell>
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
                <Code>data-invalid</Code>
              </TableCell>
              <TableCell>Reflects the invalid field state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-required</Code>
              </TableCell>
              <TableCell>Reflects the required field state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Field.Legend</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<legend>`}</Code> element.
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

        <h3 className="text-lg font-semibold text-heading">Field.Label</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<label>`}</Code> element.
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
                <Code>data-invalid</Code>
              </TableCell>
              <TableCell>Applies the invalid visual state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Field.Description</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<p>`}</Code> element.
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

        <h3 className="text-lg font-semibold text-heading">Field.Error</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<div>`}</Code> element.
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
                <Code>errors</Code>
              </TableCell>
              <TableCell>
                <Code>{`Array<{ message?: string } | undefined>`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Renders one or more unique error messages.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>role</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>{`"alert"`}</Code>
              </TableCell>
              <TableCell>Sets the accessibility role for validation feedback.</TableCell>
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
      </section>
    </article>
  );
}

export default FieldPage;
