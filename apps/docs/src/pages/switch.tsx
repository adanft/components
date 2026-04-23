import {
  Box,
  Switch,
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
        <h1 className="text-3xl font-bold text-heading">Switch</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Switch</Code> is a controlled input used to toggle an on or off state.
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
        <Box shadow="none" surface="none">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} label="Dark mode" />
        </Box>
        <CodeBlock code={usageSnippet} />

        <h3 className="text-lg font-semibold text-heading">Label positions</h3>
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

        <h3 className="text-lg font-semibold text-heading">Disabled</h3>
        <Box shadow="none" surface="none">
          <Switch checked={false} disabled onCheckedChange={() => undefined} label="Disabled" />
        </Box>
        <CodeBlock code={disabledSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
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
                <Code>checked</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Controls the switch state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onCheckedChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(checked: boolean) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called with the next checked state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>label</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Optional text rendered next to the switch.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>labelPosition</Code>
              </TableCell>
              <TableCell>
                <Code>{`"left" | "right" | "top" | "bottom"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"right"`}</Code>
              </TableCell>
              <TableCell>Controls where the label appears relative to the switch.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Disables interaction and applies the disabled visual state.</TableCell>
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
                Extends the component styles and can override default values when needed.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default SwitchPage;
