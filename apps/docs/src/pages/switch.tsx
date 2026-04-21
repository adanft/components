import { Box, Switch } from '@adanft/ui';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { Switch } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Switch } from '@adanft/ui';

const [checked, setChecked] = useState(false);

<Switch checked={checked} onCheckedChange={setChecked} label="Dark mode" />`;

const positionsSnippet = `<Switch checked={false} onCheckedChange={() => undefined} label="Right" labelPosition="right" />
<Switch checked={false} onCheckedChange={() => undefined} label="Left" labelPosition="left" />
<Switch checked={false} onCheckedChange={() => undefined} label="Top" labelPosition="top" />
<Switch checked={false} onCheckedChange={() => undefined} label="Bottom" labelPosition="bottom" />`;

const disabledSnippet = `<Switch checked={false} disabled onCheckedChange={() => undefined} label="Disabled" />`;

function SwitchPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Switch</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Switch</Code> is a controlled input used to toggle an on or off state.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">Examples</h2>

        <h3 className="text-lg font-semibold text-brand">Default</h3>
        <Box shadow="none" surface="none">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} label="Dark mode" />
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-brand">Label positions</h3>
        <Box className="flex flex-wrap gap-8" shadow="none" surface="none">
          <Switch
            checked={false}
            onCheckedChange={() => undefined}
            label="Right"
            labelPosition="right"
          />
          <Switch
            checked={false}
            onCheckedChange={() => undefined}
            label="Left"
            labelPosition="left"
          />
          <Switch
            checked={false}
            onCheckedChange={() => undefined}
            label="Top"
            labelPosition="top"
          />
          <Switch
            checked={false}
            onCheckedChange={() => undefined}
            label="Bottom"
            labelPosition="bottom"
          />
        </Box>
        <CodeBlock code={positionsSnippet} />

        <h3 className="text-lg font-semibold text-brand">Disabled</h3>
        <Box shadow="none" surface="none">
          <Switch checked={false} disabled onCheckedChange={() => undefined} label="Disabled" />
        </Box>
        <CodeBlock code={disabledSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm text-foreground">
            <thead className="bg-surface/60 text-sm text-muted">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Prop</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Type</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Default</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>checked</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">Controls the switch state.</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>onCheckedChange</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`(checked: boolean) => void`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Called with the next checked state.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>label</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Optional text rendered next to the switch.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>labelPosition</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"left" | "right" | "top" | "bottom"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>{`"right"`}</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Controls where the label appears relative to the switch.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>disabled</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Disables interaction and applies the disabled visual state.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>className</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Extends the component styles and can override default values when needed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export default SwitchPage;
