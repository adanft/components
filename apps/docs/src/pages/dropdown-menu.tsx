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
        <h1 className="text-3xl font-bold text-heading">Dropdown Menu</h1>
        <p className="text-base leading-7 text-foreground">
          Dropdown Menu shows grouped actions from a trigger for menus and command lists.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Simple</h3>
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

        <h3 className="text-lg font-semibold text-heading">Advanced</h3>
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
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">DropdownMenu</h3>
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
                <Code>{`"bottom-start"`}</Code>
              </TableCell>
              <TableCell>Sets the Floating UI placement used for the menu content.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">DropdownMenu.Trigger</h3>
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
              <TableCell>Reflects whether the menu is open.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-haspopup</Code>
              </TableCell>
              <TableCell>Identifies the trigger as opening a menu.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-state</Code>
              </TableCell>
              <TableCell>Reflects the open or closed trigger state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">DropdownMenu.Content</h3>
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
                <Code>data-state</Code>
              </TableCell>
              <TableCell>Reflects the open or closed content state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">DropdownMenu.Item</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<button>`}</Code> element.
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
              <TableCell>Extends the component styles.</TableCell>
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
              <TableCell>Identifies the item as a menu item.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-disabled</Code>
              </TableCell>
              <TableCell>Reflects the disabled item state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-active</Code>
              </TableCell>
              <TableCell>Applies the active visual state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-disabled</Code>
              </TableCell>
              <TableCell>Applies the disabled visual state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">DropdownMenu.Label</h3>
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
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">DropdownMenu.Separator</h3>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<hr>`}</Code> element.
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
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default DropdownMenuPage;
