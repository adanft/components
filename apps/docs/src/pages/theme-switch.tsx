import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ThemeSwitch,
} from '@adanft/ui';
import { useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { ThemeSwitch } from '@adanft/ui';`;

const setupSnippet = `import { initializeTheme } from '@adanft/ui/theme';

// CSR only: call this in the browser before your app renders.
initializeTheme();`;

const ssrSnippet = `import { cookies } from 'next/headers';
import { ThemeSwitch } from '@adanft/ui';

// Next/SSR: read the cookie on the server and pass the value in.
export default async function RootLayout({ children }) {
  const isDark = (await cookies()).get('theme')?.value === 'dark';

  return (
    <html className={isDark ? 'dark' : ''}>
      <body>
        <ThemeSwitch initialDark={isDark} />
        {children}
      </body>
    </html>
  );
}`;

const usageSnippet = `<ThemeSwitch initialDark={false} />`;

const defaultExampleSnippet = `import { ThemeSwitch } from '@adanft/ui';
import { useState } from 'react';

function ExampleThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  return <ThemeSwitch initialDark={isDark} onCheckedChange={setIsDark} />;
}`;

const sizesSnippet = `<ThemeSwitch initialDark={false} onCheckedChange={() => {}} size="sm" />
<ThemeSwitch initialDark={false} onCheckedChange={() => {}} size="md" />
<ThemeSwitch initialDark={false} onCheckedChange={() => {}} size="lg" />`;

function ThemeSwitchPage() {
  const [demoIsDark, setDemoIsDark] = useState(false);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-heading">Theme Switch</h1>
        <p className="text-base leading-7 text-foreground">
          Theme Switch lets users toggle between light and dark themes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Setup</h2>
        <p className="text-base leading-7 text-foreground">
          Use <Code>initializeTheme()</Code> only for CSR apps. For SSR, read the theme cookie on
          the server and pass that value to <Code>initialDark</Code> instead.
        </p>
        <CodeBlock code={setupSnippet} />
        <CodeBlock code={ssrSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Usage</h2>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">Examples</h2>

        <h3 className="text-lg font-semibold text-heading">Default</h3>
        <Box shadow="none" surface="none">
          <ThemeSwitch initialDark={demoIsDark} onCheckedChange={setDemoIsDark} />
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Sizes</h3>
        <Box className="flex flex-wrap items-center gap-6" shadow="none" surface="none">
          <ThemeSwitch initialDark={false} onCheckedChange={() => {}} size="sm" />
          <ThemeSwitch initialDark={false} onCheckedChange={() => {}} size="md" />
          <ThemeSwitch initialDark={false} onCheckedChange={() => {}} size="lg" />
        </Box>
        <CodeBlock code={sizesSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>
        <p className="text-foreground">
          A thin wrapper around the native <Code>{`<label>`}</Code> element.
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
                <Code>initialDark</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Sets the initial switch state from your app theme source.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onCheckedChange</Code>
              </TableCell>
              <TableCell>
                <Code>{`(isDark: boolean) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Handles switch state without changing the document theme, useful for controlled
                demos.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>size</Code>
              </TableCell>
              <TableCell>
                <Code>{`"sm" | "md" | "lg"`}</Code>
              </TableCell>
              <TableCell>
                <Code>{`"md"`}</Code>
              </TableCell>
              <TableCell>Controls the size of the track, thumb, and icons.</TableCell>
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
              <TableCell>Identifies the input as a switch.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-checked</Code>
              </TableCell>
              <TableCell>Reflects the current theme switch state.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>aria-hidden</Code>
              </TableCell>
              <TableCell>
                Hides decorative theme icons and visuals from assistive technology.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </article>
  );
}

export default ThemeSwitchPage;
