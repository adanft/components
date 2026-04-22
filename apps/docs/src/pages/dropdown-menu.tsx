import {
  Box,
  Button,
  DropdownMenu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@adanft/ui';
import { LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { DropdownMenu } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { DropdownMenu } from '@adanft/ui';

function ExampleDropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <button type="button">Actions</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => {}}>Profile</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}`;

const simpleExampleJsx = `const [open, setOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenu.Trigger>
    <Button>Actions</Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Label>Account</DropdownMenu.Label>

    <DropdownMenu.Item onSelect={() => {}} textValue="Profile">
      <User size={16} />
      Profile
    </DropdownMenu.Item>

    <DropdownMenu.Item onSelect={() => {}} textValue="Settings">
      <Settings size={16} />
      Settings
    </DropdownMenu.Item>

    <DropdownMenu.Separator />

    <DropdownMenu.Item disabled textValue="Sign out">
      <LogOut size={16} />
      Sign out
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`;

const advancedExampleJsx = `const [open, setOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setOpen} placement="bottom-end">
  <DropdownMenu.Trigger>
    <Button variant="secondary">Row actions</Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={() => {}}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Archive</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onSelect={() => {}}>Export CSV</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`;

function DropdownMenuPage() {
  const [simpleOpen, setSimpleOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">DropdownMenu</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>DropdownMenu</Code> is a controlled actions menu with compound parts for the
          trigger, floating content, items, labels, and separators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Simple</h3>
        <Box shadow="none" surface="none" className="overflow-visible p-8">
          <DropdownMenu open={simpleOpen} onOpenChange={setSimpleOpen}>
            <DropdownMenu.Trigger>
              <Button>Actions</Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              <DropdownMenu.Label>Account</DropdownMenu.Label>
              <DropdownMenu.Item onSelect={() => undefined} textValue="Profile">
                <User size={16} />
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => undefined} textValue="Settings">
                <Settings size={16} />
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item disabled textValue="Sign out">
                <LogOut size={16} />
                Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Box>
        <CodeBlock code={simpleExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Advanced</h3>
        <Box shadow="none" surface="none" className="overflow-visible p-8">
          <DropdownMenu open={advancedOpen} onOpenChange={setAdvancedOpen} placement="bottom-end">
            <DropdownMenu.Trigger>
              <Button variant="secondary">Row actions</Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => undefined}>Duplicate</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => undefined}>Archive</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => undefined}>Export CSV</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Box>
        <CodeBlock code={advancedExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>

        <h3 className="text-lg font-semibold text-brand">DropdownMenu</h3>
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
              <TableCell>Controls whether the menu content is rendered.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onOpenChange</Code>
              </TableCell>
              <TableCell>
                <Code>{'(open: boolean) => void'}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Receives the next open state after trigger or dismiss interactions.
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
                <Code>bottom-start</Code>
              </TableCell>
              <TableCell>Sets the Floating UI placement used for the menu content.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Composes the trigger and content parts inside the controlled root.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-brand">DropdownMenu.Trigger</h3>
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
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>ReactElement</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Expects a single valid element child so the component can attach refs and trigger
                props.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-brand">DropdownMenu.Content</h3>
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
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Renders the floating menu body when the root is open.</TableCell>
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
                Extends the rendered div for consumer-owned spacing and visuals.
              </TableCell>
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

        <h3 className="text-lg font-semibold text-brand">DropdownMenu.Item</h3>
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
                <Code>onSelect</Code>
              </TableCell>
              <TableCell>
                <Code>{'() => void'}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Runs when the item is activated, then closes the menu.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>textValue</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Provides the typeahead label when the visible item content is not plain text.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Prevents selection and applies the disabled state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>className</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Extends the button element rendered for each menu item.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-brand">
          DropdownMenu.Label and DropdownMenu.Separator
        </h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            Use <Code>DropdownMenu.Label</Code> to group related actions with a lightweight heading.
          </p>
          <p>
            Use <Code>DropdownMenu.Separator</Code> to divide action groups inside the menu.
          </p>
        </div>
      </section>
    </article>
  );
}

export default DropdownMenuPage;
