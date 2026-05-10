import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
} from '@adanft/ui';
import { Info, Save } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Tooltip } from '@adanft/ui';`;

const usageSnippet = `const [open, setOpen] = useState(false);

<Tooltip open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger>
    <Button>Hover or focus me</Button>
  </Tooltip.Trigger>

  <Tooltip.Content className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-card">
    Helpful tooltip text
  </Tooltip.Content>
</Tooltip>`;

const defaultExampleSnippet = `const [open, setOpen] = useState(false);

<Tooltip open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger>
    <Button>
      <Save size={16} />
      Save changes
    </Button>
  </Tooltip.Trigger>

  <Tooltip.Content className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-card">
    Save the current draft
  </Tooltip.Content>
</Tooltip>`;

const iconExampleSnippet = `const [open, setOpen] = useState(false);

<Tooltip open={open} onOpenChange={setOpen} placement="right">
  <Tooltip.Trigger>
    <button
      type="button"
      aria-label="More information"
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground"
    >
      <Info size={16} />
    </button>
  </Tooltip.Trigger>

  <Tooltip.Content className="max-w-52 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-card">
    Tooltips should stay short and non-interactive.
  </Tooltip.Content>
</Tooltip>`;

function TooltipPage() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [iconOpen, setIconOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Tooltip</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Tooltip</Code> shows short, non-interactive hints on hover or focus.
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
        <Box
          className="flex min-h-44 items-center justify-center overflow-visible p-8"
          shadow="none"
          surface="none">
          <Tooltip open={defaultOpen} onOpenChange={setDefaultOpen}>
            <Tooltip.Trigger>
              <Button>
                <Save size={16} />
                Save changes
              </Button>
            </Tooltip.Trigger>

            <Tooltip.Content className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-card">
              Save the current draft
            </Tooltip.Content>
          </Tooltip>
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Icon trigger</h3>
        <Box
          className="flex min-h-44 items-center justify-center overflow-visible p-8"
          shadow="none"
          surface="none">
          <Tooltip open={iconOpen} onOpenChange={setIconOpen} placement="right">
            <Tooltip.Trigger>
              <button
                type="button"
                aria-label="More information"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground">
                <Info size={16} />
              </button>
            </Tooltip.Trigger>

            <Tooltip.Content className="max-w-52 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-card">
              Tooltips should stay short and non-interactive.
            </Tooltip.Content>
          </Tooltip>
        </Box>
        <CodeBlock code={iconExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Tooltip</h3>
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
                <Code>open</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Controls whether the tooltip is rendered.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onOpenChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(open: boolean) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Runs when hover, focus, blur, or Escape requests a state change.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>placement</Code>
              </TableCell>
              <TableCell>
                <Code>Placement</Code>
              </TableCell>
              <TableCell>
                <Code>{`"top"`}</Code>
              </TableCell>
              <TableCell>Sets the preferred Floating UI placement for the tooltip.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Tooltip.Trigger</h3>
        <p className="text-sm leading-6 text-foreground">
          Accepts a single child element and attaches the tooltip trigger behavior to it.
        </p>
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
                <Code>aria-describedby</Code>
              </TableCell>
              <TableCell>
                Connects the trigger to the tooltip content while the tooltip is open.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Tooltip.Content</h3>
        <p className="text-sm leading-6 text-foreground">
          <Code>Tooltip.Content</Code> wraps a native <Code>div</Code> element and accepts native
          div props. Pass visual classes explicitly because the primitive has no default surface
          styles.
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
            <TableRow>
              <TableCell>
                <Code>style</Code>
              </TableCell>
              <TableCell>
                <Code>CSSProperties</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merges with the computed floating styles from the root.</TableCell>
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
                <Code>role</Code>
              </TableCell>
              <TableCell>
                Set to <Code>tooltip</Code> on the content.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default TooltipPage;
