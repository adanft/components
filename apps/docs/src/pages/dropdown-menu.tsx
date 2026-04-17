import { LogOut, MoreHorizontal, Settings, User } from 'lucide-react';
import { useState } from 'react';

import { Box, Button, DropdownMenu } from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { DropdownMenu } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { DropdownMenu } from '@adanft/ui';

const [open, setOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenu.Trigger>
    <button type="button">Actions</button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={() => {}}>Profile</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`;

const exampleSnippet = `const [open, setOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenu.Trigger>
    <Button aria-label="Open account actions" className="h-10 w-10 px-0">
      <MoreHorizontal size={16} />
    </Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content className="min-w-48 rounded-md border border-border bg-background p-1 shadow-card">
    <DropdownMenu.Label>Account</DropdownMenu.Label>
    <DropdownMenu.Item onSelect={() => {}}>
      <User size={16} />
      Profile
    </DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}} textValue="Settings">
      <Settings size={16} />
      Settings
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item disabled>
      <LogOut size={16} />
      Sign out
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`;

function DropdownMenuPage() {
  const [open, setOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} DropdownMenu
        </p>
        <h1 className="text-3xl font-bold text-brand">DropdownMenu</h1>
        <p className="text-foreground">
          <code>DropdownMenu</code> provides a controlled menu for actions and commands. Use it for
          menu items, not for arbitrary interactive content.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          The menu is controlled through <code>open</code> and <code>onOpenChange</code>. Items
          close the menu automatically when selected.
        </p>
        <p className="text-foreground">
          For richer item content, pass <code>textValue</code> so keyboard typeahead still matches
          the visible action label.
        </p>
        <p className="text-foreground">
          <code>DropdownMenu.Trigger</code> expects a single child that renders a real DOM element
          or correctly forwards its <code>ref</code>.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Full example</h2>
        <Box className="overflow-visible p-8">
          <div className="mx-auto flex max-w-xl items-center justify-between rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Team workspace</p>
              <p className="text-sm text-muted">
                Manage profile actions and account settings from the menu.
              </p>
            </div>

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenu.Trigger>
                <Button aria-label="Open account actions" className="h-10 w-10 px-0">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="min-w-64 rounded-xl border border-border bg-background p-2 shadow-card">
                <DropdownMenu.Label>Account</DropdownMenu.Label>
                <DropdownMenu.Item
                  className="gap-3 rounded-lg px-3 py-2.5"
                  onSelect={() => undefined}
                  textValue="Profile">
                  <User size={16} />
                  <span className="flex flex-col items-start">
                    <span className="font-medium">Profile</span>
                    <span className="text-xs text-muted">Open your public information</span>
                  </span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="gap-3 rounded-lg px-3 py-2.5"
                  onSelect={() => undefined}
                  textValue="Settings">
                  <Settings size={16} />
                  <span className="flex flex-col items-start">
                    <span className="font-medium">Settings</span>
                    <span className="text-xs text-muted">Update team preferences</span>
                  </span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2" />
                <DropdownMenu.Item
                  className="gap-3 rounded-lg px-3 py-2.5 text-muted"
                  disabled
                  textValue="Sign out">
                  <LogOut size={16} />
                  <span className="flex flex-col items-start">
                    <span className="font-medium">Sign out</span>
                    <span className="text-xs text-muted">Unavailable for guest sessions</span>
                  </span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">What this v1 includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground">
          <li>
            <code>DropdownMenu.Trigger</code> with a single child element.
          </li>
          <li>
            <code>DropdownMenu.Content</code> positioned with Floating UI.
          </li>
          <li>
            <code>DropdownMenu.Item</code> with automatic close on select.
          </li>
          <li>
            <code>DropdownMenu.Label</code> and <code>DropdownMenu.Separator</code> for grouping.
          </li>
          <li>Disabled items, arrow-key navigation, typeahead, and Escape to close.</li>
        </ul>
      </section>
    </article>
  );
}

export default DropdownMenuPage;
