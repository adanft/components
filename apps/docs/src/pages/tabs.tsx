import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
} from '@adanft/ui';
import { BarChart3, LayoutGrid, Settings } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Tabs } from '@adanft/ui';`;

const usageSnippet = `const [value, setValue] = useState('overview');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="overview">Overview panel</Tabs.Content>
  <Tabs.Content value="analytics">Analytics panel</Tabs.Content>
  <Tabs.Content value="settings">Settings panel</Tabs.Content>
</Tabs>`;

const defaultExampleSnippet = `const [value, setValue] = useState('overview');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.List className="inline-flex rounded-lg border border-border bg-surface p-1">
    <Tabs.Trigger
      value="overview"
      className="inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card"
    >
      Overview
    </Tabs.Trigger>
    <Tabs.Trigger
      value="analytics"
      className="inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card"
    >
      Analytics
    </Tabs.Trigger>
    <Tabs.Trigger
      value="settings"
      className="inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card"
    >
      Settings
    </Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="overview" className="rounded-lg border border-border bg-surface p-6">
    Overview panel
  </Tabs.Content>
  <Tabs.Content value="analytics" className="rounded-lg border border-border bg-surface p-6">
    Analytics panel
  </Tabs.Content>
  <Tabs.Content value="settings" className="rounded-lg border border-border bg-surface p-6">
    Settings panel
  </Tabs.Content>
</Tabs>`;

const verticalExampleSnippet = `const [value, setValue] = useState('account');

<Tabs value={value} onValueChange={setValue}>
  <div className="grid gap-4 md:grid-cols-[12rem_1fr]">
    <Tabs.List orientation="vertical" className="flex flex-col rounded-lg border border-border bg-surface p-1">
      <Tabs.Trigger
        value="account"
        className="rounded-md border border-transparent px-4 py-2 text-left text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card"
      >
        Account
      </Tabs.Trigger>
      <Tabs.Trigger
        value="billing"
        className="rounded-md border border-transparent px-4 py-2 text-left text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card"
      >
        Billing
      </Tabs.Trigger>
      <Tabs.Trigger
        value="security"
        className="rounded-md border border-transparent px-4 py-2 text-left text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card"
      >
        Security
      </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="account" className="rounded-lg border border-border bg-surface p-6">
      Account preferences
    </Tabs.Content>
    <Tabs.Content value="billing" className="rounded-lg border border-border bg-surface p-6">
      Billing details
    </Tabs.Content>
    <Tabs.Content value="security" className="rounded-lg border border-border bg-surface p-6">
      Security settings
    </Tabs.Content>
  </div>
</Tabs>`;

function TabsPage() {
  const [value, setValue] = useState('overview');
  const [verticalValue, setVerticalValue] = useState('account');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Tabs</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Tabs</Code> is used to switch between related sections without leaving the current
          page.
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
        <Box className="overflow-visible p-6" shadow="none" surface="none">
          <Tabs value={value} onValueChange={setValue}>
            <Tabs.List className="inline-flex rounded-lg border border-border bg-surface p-1">
              <Tabs.Trigger
                value="overview"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card">
                <LayoutGrid size={16} />
                Overview
              </Tabs.Trigger>
              <Tabs.Trigger
                value="analytics"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card">
                <BarChart3 size={16} />
                Analytics
              </Tabs.Trigger>
              <Tabs.Trigger
                value="settings"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card">
                <Settings size={16} />
                Settings
              </Tabs.Trigger>
            </Tabs.List>

            <div className="mt-4">
              <Tabs.Content
                value="overview"
                className="rounded-lg border border-border bg-surface p-6 text-foreground">
                Overview panel with high-level product metrics and release notes.
              </Tabs.Content>
              <Tabs.Content
                value="analytics"
                className="rounded-lg border border-border bg-surface p-6 text-foreground">
                Analytics panel focused on trends, retention, and event volume.
              </Tabs.Content>
              <Tabs.Content
                value="settings"
                className="rounded-lg border border-border bg-surface p-6 text-foreground">
                Settings panel for feature flags and environment preferences.
              </Tabs.Content>
            </div>
          </Tabs>
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Vertical</h3>
        <Box className="overflow-visible p-6" shadow="none" surface="none">
          <Tabs value={verticalValue} onValueChange={setVerticalValue}>
            <div className="grid gap-4 md:grid-cols-[12rem_1fr]">
              <Tabs.List
                orientation="vertical"
                className="flex flex-col rounded-lg border border-border bg-surface p-1">
                <Tabs.Trigger
                  value="account"
                  className="rounded-md border border-transparent px-4 py-2 text-left text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card">
                  Account
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="billing"
                  className="rounded-md border border-transparent px-4 py-2 text-left text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card">
                  Billing
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="security"
                  className="rounded-md border border-transparent px-4 py-2 text-left text-sm text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-card">
                  Security
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content
                value="account"
                className="rounded-lg border border-border bg-surface p-6 text-foreground">
                Account preferences for profile details and communication settings.
              </Tabs.Content>
              <Tabs.Content
                value="billing"
                className="rounded-lg border border-border bg-surface p-6 text-foreground">
                Billing details for invoices, payment methods, and plan changes.
              </Tabs.Content>
              <Tabs.Content
                value="security"
                className="rounded-lg border border-border bg-surface p-6 text-foreground">
                Security settings for passwords, sessions, and multi-factor authentication.
              </Tabs.Content>
            </div>
          </Tabs>
        </Box>
        <CodeBlock code={verticalExampleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Tabs</h3>
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
              <TableCell>Current selected tab value.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onValueChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(value: string) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Runs when click or keyboard navigation requests a new tab.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Tabs.List</h3>
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
                <Code>orientation</Code>
              </TableCell>
              <TableCell>
                <Code>{`"horizontal" | "vertical"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"horizontal"`}</Code>
              </TableCell>
              <TableCell>Controls which arrow keys move through triggers.</TableCell>
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
              <TableCell>Identifies the list as a tablist.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-orientation</Code>
              </TableCell>
              <TableCell>Reflects the tablist orientation.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Tabs.Trigger</h3>
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
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Matches the content value this trigger controls.</TableCell>
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
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Prevents selecting the tab and removes it from keyboard navigation.
              </TableCell>
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
                <Code>id</Code>
              </TableCell>
              <TableCell>Connects the trigger to its tab panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>type</Code>
              </TableCell>
              <TableCell>Sets the trigger button type.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>role</Code>
              </TableCell>
              <TableCell>Identifies the button as a tab.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-selected</Code>
              </TableCell>
              <TableCell>Reflects whether the tab is selected.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-controls</Code>
              </TableCell>
              <TableCell>References the controlled tab panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-disabled</Code>
              </TableCell>
              <TableCell>Reflects disabled tab semantics when provided.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>tabIndex</Code>
              </TableCell>
              <TableCell>Controls roving focus for selected and inactive tabs.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-state</Code>
              </TableCell>
              <TableCell>Reflects the active or inactive tab state.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">Tabs.Content</h3>
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
                <Code>value</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Matches the trigger value that activates this panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>keepMounted</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Keeps inactive content mounted and hidden with the native <Code>hidden</Code>{' '}
                attribute. By default, inactive panels unmount to avoid rendering hidden work.
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
                <Code>id</Code>
              </TableCell>
              <TableCell>Connects the tab panel to its trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>role</Code>
              </TableCell>
              <TableCell>Identifies the content as a tab panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-labelledby</Code>
              </TableCell>
              <TableCell>References the trigger that labels the tab panel.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>data-state</Code>
              </TableCell>
              <TableCell>Reflects the active or inactive panel state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hidden</Code>
              </TableCell>
              <TableCell>Hides kept-mounted inactive panels.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default TabsPage;
