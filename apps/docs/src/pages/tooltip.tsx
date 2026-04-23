import { Box, Button, Tooltip } from '@adanft/ui';
import { Info, Save } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Tooltip } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Tooltip } from '@adanft/ui';

const [open, setOpen] = useState(false);

<Tooltip open={open} onOpenChange={setOpen}>
  <Tooltip.Trigger>
    <button type="button">Hover or focus me</button>
  </Tooltip.Trigger>

  <Tooltip.Content>
    Helpful tooltip text
  </Tooltip.Content>
</Tooltip>`;

const buttonExampleSnippet = `const [open, setOpen] = useState(false);

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
  const [buttonOpen, setButtonOpen] = useState(false);
  const [iconOpen, setIconOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Tooltip
        </p>
        <h1 className="text-3xl font-bold text-heading">Tooltip</h1>
        <p className="text-foreground">
          <code>Tooltip</code> shows short contextual text on hover or focus. It should stay
          non-interactive and should not be used as a popover replacement.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Usage</h2>
        <p className="text-foreground">
          Keep tooltips short, descriptive, and attached to a single trigger element.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Button trigger</h2>
        <Box className="flex min-h-44 items-center justify-center overflow-visible p-8">
          <Tooltip open={buttonOpen} onOpenChange={setButtonOpen}>
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
        <CodeBlock code={buttonExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Icon trigger</h2>
        <Box className="flex min-h-44 items-center justify-center overflow-visible p-8">
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
    </article>
  );
}

export default TooltipPage;
