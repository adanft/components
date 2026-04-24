import {
  Accordion,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Accordion } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Accordion } from '@adanft/ui';

function ExampleAccordion() {
  const [value, setValue] = useState<string | null>('overview');

  return (
    <Accordion value={value} onValueChange={setValue}>
      <Accordion.Item value="overview">
        <Accordion.Header>
          <Accordion.Trigger>Overview</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Overview content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`;

const collapsibleExampleJsx = `<Accordion value={value} onValueChange={setValue} className="space-y-3">
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

const fixedOpenExampleJsx = `<Accordion value={value} onValueChange={setValue} collapsible={false} className="space-y-3">
  <Accordion.Item value="shipping" className="rounded-lg border border-border bg-surface">
    <Accordion.Header>
      <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
        Shipping
        <ChevronDown size={16} />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
      Shipping details
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="returns" className="rounded-lg border border-border bg-surface">
    <Accordion.Header>
      <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
        Returns
        <ChevronDown size={16} />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
      Returns policy
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`;

function AccordionPage() {
  const [collapsibleValue, setCollapsibleValue] = useState<string | null>('overview');
  const [fixedValue, setFixedValue] = useState<string | null>('shipping');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Accordion</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Accordion</Code> is a controlled primitive for expandable sections.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Collapsible</h3>
        <Box shadow="none" surface="none">
          <Accordion
            value={collapsibleValue}
            onValueChange={setCollapsibleValue}
            className="space-y-3">
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
          </Accordion>
        </Box>
        <CodeBlock code={collapsibleExampleJsx} />

        <h3 className="text-lg font-semibold text-heading">Fixed Open</h3>
        <Box shadow="none" surface="none">
          <Accordion
            value={fixedValue}
            onValueChange={setFixedValue}
            collapsible={false}
            className="space-y-3">
            <Accordion.Item value="shipping" className="rounded-lg border border-border bg-surface">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
                  Shipping
                  <ChevronDown size={16} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
                Delivery windows, tracking updates, and carrier coverage for the current region.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="returns" className="rounded-lg border border-border bg-surface">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground">
                  Returns
                  <ChevronDown size={16} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-foreground">
                Return windows, refund expectations, and exceptions for digital purchases.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Box>
        <CodeBlock code={fixedOpenExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Accordion</h3>
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
                <Code>{'string | null'}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Controls which item is open. Use null when nothing should be expanded.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onValueChange</Code>
              </TableCell>
              <TableCell>
                <Code>{'(value: string | null) => void'}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Receives the next open item whenever a trigger is activated.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>collapsible</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>true</Code>
              </TableCell>
              <TableCell>
                Allows the open item to close itself through user interaction. Set it to false to
                prevent closing the active item from the trigger.
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
              <TableCell>
                Extends the root wrapper when you need consumer-owned spacing or layout.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Accordion.Item</h3>
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
              <TableCell>Unique identifier for the section represented by the item.</TableCell>
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
                Extends the item wrapper when consumer composition needs custom styling.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Accordion.Header</h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            Use <Code>Accordion.Header</Code> to wrap the trigger with heading semantics.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-heading">
          Accordion.Trigger and Accordion.Content
        </h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            Use <Code>Accordion.Trigger</Code> for the clickable control that opens or closes each
            section.
          </p>
          <p>
            Use <Code>Accordion.Content</Code> for the content panel that belongs to the trigger.
          </p>
        </div>
      </section>
    </article>
  );
}

export default AccordionPage;
