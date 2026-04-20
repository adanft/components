import { Box, Switch } from '@adanft/ui';
import { Moon, Plane } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Switch } from '@adanft/ui';`;

const usageSnippet = `import { useState } from 'react';
import { Switch } from '@adanft/ui';

const [checked, setChecked] = useState(false);

<Switch checked={checked} onCheckedChange={setChecked} label="Dark mode" />`;

const exampleSnippet = `const [darkMode, setDarkMode] = useState(false);
const [airplaneMode, setAirplaneMode] = useState(true);

<Switch checked={darkMode} onCheckedChange={setDarkMode} label="Dark mode" />
<Switch checked={airplaneMode} onCheckedChange={setAirplaneMode} label="Airplane mode" />`;

function SwitchPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(true);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Switch
        </p>
        <h1 className="text-3xl font-bold text-brand">Switch</h1>
        <p className="text-foreground">
          <code>Switch</code> is a controlled on/off control for settings and preferences. Use it
          when the UI should communicate enabled or disabled state rather than a generic checkbox
          choice.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          <code>Switch</code> is controlled through <code>checked</code> and{' '}
          <code>onCheckedChange</code>.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center gap-3 text-foreground">
              <Moon size={18} />
              <div>
                <p className="font-medium">Dark mode</p>
                <p className="text-sm text-muted">Use the dark theme across the dashboard.</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center gap-3 text-foreground">
              <Plane size={18} />
              <div>
                <p className="font-medium">Airplane mode</p>
                <p className="text-sm text-muted">Pause sync and background notifications.</p>
              </div>
            </div>
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              aria-label="Toggle airplane mode"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch checked={darkMode} onCheckedChange={setDarkMode} label="Dark mode" />
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              label="Airplane mode"
            />
          </div>
        </Box>
        <CodeBlock code={exampleSnippet} />
      </section>
    </article>
  );
}

export default SwitchPage;
