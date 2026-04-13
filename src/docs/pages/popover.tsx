import { useState } from 'react';

import { Box, Button, Popover } from '../../lib';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Popover } from '../../lib';`;

const usageSnippet = `import { useState } from 'react';
import { Popover } from '../../lib';

const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <Popover.Trigger>
    <button type="button">Open popover</button>
  </Popover.Trigger>

  <Popover.Content>
    <div>Popover content</div>
  </Popover.Content>
</Popover>`;

const buttonExampleSnippet = `const [open, setOpen] = useState(false);

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

const textExampleSnippet = `const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen} placement="bottom-start">
  <Popover.Trigger>
    <span className="cursor-pointer text-brand underline">View keyboard shortcuts</span>
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
  const [buttonOpen, setButtonOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Popover
        </p>
        <h1 className="text-3xl font-bold text-brand">Popover</h1>
        <p className="text-foreground">
          <code>Popover</code> provides a controlled, anchored floating surface. Use{' '}
          <code>Popover.Trigger</code> with any single child element and render the floating content
          inside <code>Popover.Content</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import <code>Popover</code> from the public entrypoint and control the <code>open</code>{' '}
          state yourself.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Button trigger</h2>
        <Box className="flex min-h-44 items-start justify-center overflow-visible p-8">
          <Popover open={buttonOpen} onOpenChange={setButtonOpen}>
            <Popover.Trigger>
              <Button>Share project</Button>
            </Popover.Trigger>

            <Popover.Content className="w-72 rounded-md border border-border bg-surface p-4 shadow-card">
              <div className="space-y-3">
                <p className="font-semibold text-foreground">Share project</p>
                <p className="text-sm text-foreground">
                  Invite a teammate to review the release notes.
                </p>
                <Button className="w-full">Copy invite link</Button>
              </div>
            </Popover.Content>
          </Popover>
        </Box>
        <CodeBlock code={buttonExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Text trigger</h2>
        <Box className="flex min-h-44 items-start justify-center overflow-visible p-8">
          <Popover open={textOpen} onOpenChange={setTextOpen} placement="bottom-start">
            <Popover.Trigger>
              <span className="cursor-pointer text-brand underline">View keyboard shortcuts</span>
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
        <CodeBlock code={textExampleSnippet} />
      </section>
    </article>
  );
}

export default PopoverPage;
