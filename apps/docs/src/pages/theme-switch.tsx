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

const importSnippet = `// Package root import
import { ThemeSwitch } from '@adanft/ui';

// Public package subpath import
import ThemeSwitch from '@adanft/ui/theme-switch';`;

const setupSnippet = `// Package root import
import { initializeTheme, setTheme } from '@adanft/ui';

// Public package subpath import
import { initializeTheme, setTheme } from '@adanft/ui/theme';

// CSR only: call this in the browser before your app renders.
const initialDark = initializeTheme();

// Call this from your controlled change handler.
setTheme(!initialDark);`;

const ssrSnippet = `// theme-control.tsx
'use client';

import { setTheme, ThemeSwitch } from '@adanft/ui';
import { useState } from 'react';

export function ThemeControl({ initialDark }) {
  const [isDark, setIsDark] = useState(initialDark);

  const handleThemeChange = (nextIsDark) => {
    setTheme(nextIsDark);
    setIsDark(nextIsDark);
  };

  return <ThemeSwitch checked={isDark} onCheckedChange={handleThemeChange} />;
}

// app/layout.tsx
import { cookies } from 'next/headers';
import { ThemeControl } from './theme-control';

export default async function RootLayout({ children }) {
  const isDark = (await cookies()).get('theme')?.value === 'dark';

  return (
    <html className={isDark ? 'dark' : ''}>
      <body>
        <ThemeControl initialDark={isDark} />
        {children}
      </body>
    </html>
  );
}`;

const usageSnippet = `<ThemeSwitch checked={isDark} onCheckedChange={handleThemeChange} />`;

const defaultExampleSnippet = `import { ThemeSwitch } from '@adanft/ui';
import { useState } from 'react';

function ExampleThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  return <ThemeSwitch checked={isDark} onCheckedChange={setIsDark} />;
}`;

const sizesSnippet = `<ThemeSwitch checked={false} onCheckedChange={() => {}} size="sm" />
<ThemeSwitch checked={false} onCheckedChange={() => {}} size="md" />
<ThemeSwitch checked={false} onCheckedChange={() => {}} size="lg" />`;

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
          Use <Code>initializeTheme()</Code> only for CSR bootstrap and <Code>setTheme()</Code> to
          apply and persist explicit changes. For SSR, read the theme cookie on the server and pass
          that value into a controlled client component.
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
          <ThemeSwitch checked={demoIsDark} onCheckedChange={setDemoIsDark} />
        </Box>
        <CodeBlock code={defaultExampleSnippet} />

        <h3 className="text-lg font-semibold text-heading">Sizes</h3>
        <Box className="flex flex-wrap items-center gap-6" shadow="none" surface="none">
          <ThemeSwitch checked={false} onCheckedChange={() => {}} size="sm" />
          <ThemeSwitch checked={false} onCheckedChange={() => {}} size="md" />
          <ThemeSwitch checked={false} onCheckedChange={() => {}} size="lg" />
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
                <Code>checked</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Controls the switch state from your app theme source.</TableCell>
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
                Requests a controlled state change without mutating global theme state.
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
