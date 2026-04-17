import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Accordion, Box } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Accordion } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Accordion } from '@adanft/ui';

const [value, setValue] = useState<string | null>('overview');

<Accordion value={value} onValueChange={setValue}>
  <Accordion.Item value="overview">
    <Accordion.Header>
      <Accordion.Trigger>Overview</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Overview content</Accordion.Content>
  </Accordion.Item>
</Accordion>`;

const exampleSnippet = `const [value, setValue] = useState<string | null>('overview');

<Accordion value={value} onValueChange={setValue} className="space-y-3">
  <Accordion.Item value="overview" className="rounded-lg border border-border bg-surface">
    <Accordion.Header>
      <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
        Overview
        <ChevronDown size={16} />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
      Overview content
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`;

function AccordionPage() {
  const [value, setValue] = useState<string | null>('overview');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Accordion
        </p>
        <h1 className="text-3xl font-bold text-brand">Accordion</h1>
        <p className="text-foreground">
          <code>Accordion</code> provides a controlled compound API for vertically stacked,
          expandable sections. Use <code>Accordion.Item</code>, <code>Accordion.Header</code>,{' '}
          <code>Accordion.Trigger</code>, and <code>Accordion.Content</code> together.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          <code>Accordion</code> is controlled through a single open <code>value</code> (or{' '}
          <code>null</code> when all items are closed).
        </p>
        <p className="text-foreground">
          Keyboard support follows the expected accordion pattern: use <code>ArrowDown</code>,{' '}
          <code>ArrowUp</code>, <code>Home</code>, and <code>End</code> to move between triggers.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="p-6">
          <Accordion value={value} onValueChange={setValue} className="space-y-3">
            <Accordion.Item value="overview" className="rounded-lg border border-border bg-surface">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
                  Overview
                  <ChevronDown size={16} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
                High-level product summary, release notes, and current priorities.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              value="analytics"
              className="rounded-lg border border-border bg-surface">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
                  Analytics
                  <ChevronDown size={16} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
                Trends, retention, and performance metrics for the current release cycle.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="settings" className="rounded-lg border border-border bg-surface">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
                  Settings
                  <ChevronDown size={16} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
                Feature flags, environments, and configuration details.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>
    </article>
  );
}

export default AccordionPage;
