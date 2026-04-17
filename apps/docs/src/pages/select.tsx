import { useState } from 'react';

import { Box, Select } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Select } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Select } from '@adanft/ui';

const [value, setValue] = useState('pro');

<Select
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="Choose a plan"
>
  <option value="starter">Starter</option>
  <option value="pro">Pro</option>
  <option value="team">Team</option>
  <option value="business">Business</option>
  <option value="enterprise" disabled>Enterprise</option>
</Select>`;

const exampleSnippet = `const [value, setValue] = useState('pro');

<Select
  aria-label="Choose billing plan"
  className="min-w-72 rounded-xl"
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Select
        </p>
        <h1 className="text-3xl font-bold text-brand">Select</h1>
        <p className="text-foreground">
          <code>Select</code> is a styled native <code>{'<select>'}</code> wrapper for choosing one
          value from a list of options.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          <code>Select</code> uses the native select API, so it works with standard{' '}
          <code>value</code>, <code>defaultValue</code>, and <code>onChange</code>.
        </p>
        <p className="text-foreground">
          Use the optional <code>placeholder</code> prop to render an initial disabled option.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Full example</h2>
        <Box className="p-8">
          <div className="mx-auto flex max-w-xl items-center justify-between rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Billing plan</p>
              <p className="text-sm text-muted">
                Choose the plan that best matches the collaboration needs of your team.
              </p>
            </div>

            <Select
              aria-label="Choose billing plan"
              className="min-w-72 rounded-xl"
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
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What this version includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>Native keyboard, focus, accessibility, and platform behavior.</li>
          <li>Optional placeholder rendered as a disabled initial option.</li>
          <li>Disabled support and standard form-compatible select behavior.</li>
          <li>Styled wrapper with a built-in chevron icon.</li>
        </ul>
      </section>
    </article>
  );
}

export default SelectPage;
