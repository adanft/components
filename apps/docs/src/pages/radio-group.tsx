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
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Field, RadioGroup } from '@adanft/ui';`;

const usageSnippet = `const [plan, setPlan] = useState('starter');

<Field.Set>
  <Field.Legend id="plan-label">Billing plan</Field.Legend>
  <RadioGroup value={plan} onValueChange={setPlan} aria-labelledby="plan-label">
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
    <RadioGroup.Item value="enterprise" label="Enterprise" />
  </RadioGroup>
</Field.Set>`;

const defaultExampleSnippet = `<Field.Set aria-describedby="plan-description">
  <Field.Legend id="plan-label">Billing plan</Field.Legend>
  <Field.Description id="plan-description">Choose the plan that fits your team.</Field.Description>
  <RadioGroup
    value={plan}
    onValueChange={setPlan}
    aria-labelledby="plan-label"
    className="flex-col gap-3"
  >
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
    <RadioGroup.Item value="enterprise" label="Enterprise" />
  </RadioGroup>
</Field.Set>`;

const labelPositionExampleSnippet = `<RadioGroup
  value={billing}
  onValueChange={setBilling}
  aria-label="Billing cycle"
  labelPosition="left"
>
  <RadioGroup.Item value="monthly" label="Monthly" />
  <RadioGroup.Item value="yearly" label="Yearly" />
</RadioGroup>`;

const disabledExampleSnippet = `<RadioGroup
  value={plan}
  onValueChange={setPlan}
  aria-label="Disabled billing plan"
  disabled
>
  <RadioGroup.Item value="starter" label="Starter" />
  <RadioGroup.Item value="pro" label="Pro" />
</RadioGroup>`;

const invalidExampleSnippet = `<RadioGroup value={plan} onValueChange={setPlan} aria-label="Billing plan">
  <RadioGroup.Item aria-invalid value="starter" label="Starter" />
  <RadioGroup.Item value="pro" label="Pro" />
</RadioGroup>`;

function RadioGroupPage() {
  const [plan, setPlan] = useState('starter');
  const [billing, setBilling] = useState('monthly');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">RadioGroup</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>RadioGroup</Code> renders a controlled group of native radio inputs for mutually
          exclusive choices.
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
          <Field.Set aria-describedby="plan-description">
            <Field.Legend id="plan-label">Billing plan</Field.Legend>
            <Field.Description id="plan-description">
              Choose the plan that fits your team.
            </Field.Description>
            <RadioGroup
              value={plan}
              onValueChange={setPlan}
              aria-labelledby="plan-label"
              className="flex-col gap-3">
              <RadioGroup.Item value="starter" label="Starter" />
              <RadioGroup.Item value="pro" label="Pro" />
              <RadioGroup.Item value="enterprise" label="Enterprise" />
            </RadioGroup>
          </Field.Set>
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Label position</h3>
        <Box shadow="none" surface="none">
          <RadioGroup
            value={billing}
            onValueChange={setBilling}
            aria-label="Billing cycle"
            labelPosition="left">
            <RadioGroup.Item value="monthly" label="Monthly" />
            <RadioGroup.Item value="yearly" label="Yearly" />
          </RadioGroup>
        </Box>
        <CodeBlock code={labelPositionExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Disabled</h3>
        <Box shadow="none" surface="none">
          <RadioGroup
            value={plan}
            onValueChange={setPlan}
            aria-label="Disabled billing plan"
            disabled>
            <RadioGroup.Item value="starter" label="Starter" />
            <RadioGroup.Item value="pro" label="Pro" />
          </RadioGroup>
        </Box>
        <CodeBlock code={disabledExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Invalid item</h3>
        <Box shadow="none" surface="none">
          <RadioGroup value={plan} onValueChange={setPlan} aria-label="Billing plan">
            <RadioGroup.Item aria-invalid value="starter" label="Starter" />
            <RadioGroup.Item value="pro" label="Pro" />
          </RadioGroup>
        </Box>
        <CodeBlock code={invalidExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">RadioGroup</h3>
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
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Selected item value.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onValueChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(value: string) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Runs when the user selects a different item.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>name</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>auto</TableCell>
              <TableCell>Shared native radio name. Generated automatically when omitted.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Disables every item in the group.</TableCell>
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
              <TableCell>
                Controls where item labels render relative to the radio indicator.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>native div props</TableCell>
              <TableCell>div attributes</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Pass <Code>aria-label</Code> or <Code>aria-labelledby</Code> to name the group.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">RadioGroup.Item</h3>
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
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Value sent to <Code>onValueChange</Code> when selected.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Visible text for the radio item.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Disables only this item.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-invalid</Code>
              </TableCell>
              <TableCell>
                <Code>{`boolean | "true" | "false"`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Marks the item invalid and applies the invalid visual state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the visual radio indicator styles.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>native input props</TableCell>
              <TableCell>input attributes</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                If no <Code>label</Code> is rendered, pass <Code>aria-label</Code> for an accessible
                name.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default RadioGroupPage;
