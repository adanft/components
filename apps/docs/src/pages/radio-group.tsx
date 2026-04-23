import { Box, RadioGroup } from '@adanft/ui';
import { useState } from 'react';
import { CodeBlock } from '../code-block';

const importSnippet = `import { RadioGroup } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { RadioGroup } from '@adanft/ui';

const [value, setValue] = useState('starter');

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="starter" label="Starter" />
  <RadioGroup.Item value="pro" label="Pro" />
  <RadioGroup.Item value="enterprise" label="Enterprise" />
</RadioGroup>`;

const exampleSnippet = `const [plan, setPlan] = useState('starter');

<RadioGroup value={plan} onValueChange={setPlan} className="flex-col gap-3">
  <RadioGroup.Item value="starter" label="Starter" />
  <RadioGroup.Item value="pro" label="Pro" />
  <RadioGroup.Item value="enterprise" label="Enterprise" />
</RadioGroup>`;

function RadioGroupPage() {
  const [plan, setPlan] = useState('starter');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} RadioGroup
        </p>
        <h1 className="text-3xl font-bold text-heading">RadioGroup</h1>
        <p className="text-foreground">
          <code>RadioGroup</code> provides a controlled set of mutually exclusive options. Use it
          when the user must choose exactly one option from a list.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Usage</h2>
        <p className="text-foreground">
          <code>RadioGroup</code> is controlled through <code>value</code> and{' '}
          <code>onValueChange</code>.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Example</h2>
        <Box className="p-6">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="mb-4 font-medium text-foreground">Choose a billing plan</p>
            <RadioGroup
              value={plan}
              onValueChange={setPlan}
              aria-label="Billing plan"
              className="flex-col gap-3">
              <RadioGroup.Item value="starter" label="Starter" />
              <RadioGroup.Item value="pro" label="Pro" />
              <RadioGroup.Item value="enterprise" label="Enterprise" />
            </RadioGroup>
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>
    </article>
  );
}

export default RadioGroupPage;
