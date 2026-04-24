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
          <Code>Tooltip</Code> shows short contextual text on hover or focus. It is a primitive for
          non-interactive hints, not a replacement for <Code>Popover</Code>.
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

        <h3 className="text-lg font-semibold text-heading">Tooltip.Trigger and Tooltip.Content</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Part</TableHead>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col">Default</TableHead>
              <TableHead scope="col">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>Tooltip.Trigger</Code>
              </TableCell>
              <TableCell>single React element</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Clones one interactive child and wires hover/focus handlers. Prefer a native button
                or the library <Code>Button</Code> component.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>Tooltip.Content</Code>
              </TableCell>
              <TableCell>native div props</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Renders short, non-interactive text while open. Pass visual classes explicitly
                because the primitive has no default surface styles.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default TooltipPage;
