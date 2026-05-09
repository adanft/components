import {
  Box,
  Button,
  Popover,
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

const importSnippet = `import { Popover } from '@adanft/ui';`;

const usageSnippet = `const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <Popover.Trigger>
    <Button>Open popover</Button>
  </Popover.Trigger>

  <Popover.Content className="rounded-md border border-border bg-surface p-4 shadow-card">
    <div className="text-foreground">Popover content</div>
  </Popover.Content>
</Popover>`;

const defaultExampleSnippet = `const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <Popover.Trigger>
    <Button>Share project</Button>
  </Popover.Trigger>

  <Popover.Content className="w-72 rounded-md border border-border bg-surface p-4 shadow-card">
    <div className="space-y-3">
      <p className="font-semibold text-foreground">Share project</p>
      <p className="text-sm text-foreground">Invite a teammate to review the release notes.</p>
      <Button className="w-full">Copy invite link</Button>
    </div>
  </Popover.Content>
</Popover>`;

const placementExampleSnippet = `const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen} placement="bottom-start">
  <Popover.Trigger>
    <Button variant="secondary">View shortcuts</Button>
  </Popover.Trigger>

  <Popover.Content className="rounded-md border border-border bg-surface p-4 shadow-card">
    <ul className="space-y-2 text-sm text-foreground">
      <li><strong>⌘K</strong> Open command menu</li>
      <li><strong>G then H</strong> Go to home</li>
      <li><strong>?</strong> Open help</li>
    </ul>
  </Popover.Content>
</Popover>`;

function PopoverPage() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [placementOpen, setPlacementOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Popover</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Popover</Code> shows interactive floating content anchored to a trigger.
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
          className="flex min-h-44 items-start justify-center overflow-visible p-8"
          shadow="none"
          surface="none">
          <Popover open={defaultOpen} onOpenChange={setDefaultOpen}>
            <Popover.Trigger>
              <Button>Share project</Button>
            </Popover.Trigger>

            <Popover.Content className="w-72 rounded-md border border-border bg-surface p-4 shadow-card">
              <div className="space-y-3">
                <p className="font-semibold text-foreground">Share project</p>
                <p className="text-sm text-foreground">
                  Invite a teammate to review the release notes.
                </p>
                <Button className="w-full" onClick={() => setDefaultOpen(false)}>
                  Copy invite link
                </Button>
              </div>
            </Popover.Content>
          </Popover>
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Placement</h3>
        <Box
          className="flex min-h-44 items-start justify-center overflow-visible p-8"
          shadow="none"
          surface="none">
          <Popover open={placementOpen} onOpenChange={setPlacementOpen} placement="bottom-start">
            <Popover.Trigger>
              <Button variant="secondary">View shortcuts</Button>
            </Popover.Trigger>

            <Popover.Content className="rounded-md border border-border bg-surface p-4 shadow-card">
              <ul className="space-y-2 text-sm text-foreground">
                <li>
                  <strong>⌘K</strong> Open command menu
                </li>
                <li>
                  <strong>G then H</strong> Go to home
                </li>
                <li>
                  <strong>?</strong> Open help
                </li>
              </ul>
            </Popover.Content>
          </Popover>
        </Box>
        <CodeBlock code={placementExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Popover</h3>
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
              <TableCell>Controls whether the floating content is rendered.</TableCell>
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
                Runs when the trigger, outside press, or Escape requests a state change.
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
                <Code>{`"bottom"`}</Code>
              </TableCell>
              <TableCell>Sets the preferred Floating UI placement for the content.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>contentRole</Code>
              </TableCell>
              <TableCell>
                <Code>{`"dialog" | null`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"dialog"`}</Code>
              </TableCell>
              <TableCell>
                Sets the ARIA role on <Code>Popover.Content</Code>. Use <Code>null</Code> for purely
                supplemental content that should not expose a dialog role.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>triggerHasPopup</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>true</Code>
              </TableCell>
              <TableCell>
                Adds <Code>aria-haspopup="dialog"</Code> to the trigger. Set to <Code>false</Code>
                when that announcement is not appropriate for your content.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Popover.Trigger</h3>
        <p className="text-foreground">
          Accepts a single child element and attaches the trigger behavior to it.
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
                <Code>aria-expanded</Code>
              </TableCell>
              <TableCell>Reflects whether the popover is open.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-haspopup</Code>
              </TableCell>
              <TableCell>Identifies the trigger as opening a dialog when enabled.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Popover.Content</h3>
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
      </section>
    </article>
  );
}

export default PopoverPage;
