import { Box, Tabs } from '@adanft/ui';
import { BarChart3, LayoutGrid, Settings } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Tabs } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Tabs } from '@adanft/ui';

const [value, setValue] = useState('overview');

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

const exampleSnippet = `const [value, setValue] = useState('overview');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.List className="inline-flex rounded-lg border border-border bg-surface p-1">
    <Tabs.Trigger
      value="overview"
      className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background"
    >
      Overview
    </Tabs.Trigger>
    <Tabs.Trigger
      value="analytics"
      className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background"
    >
      Analytics
    </Tabs.Trigger>
    <Tabs.Trigger
      value="settings"
      className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background"
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

function TabsPage() {
  const [value, setValue] = useState('overview');

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Tabs
        </p>
        <h1 className="text-3xl font-bold text-heading">Tabs</h1>
        <p className="text-foreground">
          <code>Tabs</code> provides a controlled compound API for switching between related panels.
          Use <code>Tabs.List</code> for the tablist, <code>Tabs.Trigger</code> for each tab button,
          and <code>Tabs.Content</code> for the associated panel.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Usage</h2>
        <p className="text-foreground">
          <code>Tabs</code> is controlled. Keep the active <code>value</code> in state and update it
          through <code>onValueChange</code>.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Example</h2>
        <Box className="overflow-visible p-6">
          <Tabs value={value} onValueChange={setValue}>
            <Tabs.List className="inline-flex rounded-lg border border-border bg-surface p-1">
              <Tabs.Trigger
                value="overview"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-foreground data-[state=active]:bg-background data-[state=active]:shadow-card">
                <LayoutGrid size={16} />
                Overview
              </Tabs.Trigger>
              <Tabs.Trigger
                value="analytics"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-foreground data-[state=active]:bg-background data-[state=active]:shadow-card">
                <BarChart3 size={16} />
                Analytics
              </Tabs.Trigger>
              <Tabs.Trigger
                value="settings"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-foreground data-[state=active]:bg-background data-[state=active]:shadow-card">
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
        <CodeBlock code={exampleSnippet} />
      </section>
    </article>
  );
}

export default TabsPage;
