import { Archive, BarChart3, Box, FileText, Hand, PanelLeft, Settings, Users } from 'lucide-react';
import { useState } from 'react';

import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
  SidebarSection,
  Box as Surface,
} from '@adanft/ui';
import { CodeBlock } from '../code-block';

const importSnippet = `import { Archive, BarChart3, Box, FileText, Hand, PanelLeft, Settings, Users } from 'lucide-react';
import { useState } from 'react';

import {
  Sidebar,
  SidebarHead,
  SidebarBody,
  SidebarLink,
  SidebarSection,
  SidebarGroup,
} from '@your-org/components';`;

const usageSnippet = `const [sidebarState, setSidebarState] = useState(true);

<Sidebar state={sidebarState} action={setSidebarState} className="static z-auto">
  <SidebarHead
    href="/"
    logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
    title="Comps Docs"
    state={sidebarState}
    action={setSidebarState}
  />
  <SidebarBody>
    <ul className="flex flex-col gap-2">
      <li><SidebarSection text="Core" /></li>
      <li><SidebarLink href="/docs/button" icon={Hand} text="Button" /></li>
      <li><SidebarLink href="/docs/box" icon={Box} text="Box" /></li>
      <li><SidebarLink href="/docs/sidebar" icon={PanelLeft} text="Sidebar" /></li>
      <li>
        <SidebarGroup icon={FileText} text="Reports">
          <ul className="flex flex-col gap-2">
            <li><SidebarLink href="/docs/financial-report" icon={BarChart3} text="Financial Report" /></li>
            <li><SidebarLink href="/docs/users" icon={Users} text="User Reports" /></li>
          </ul>
        </SidebarGroup>
      </li>
      <li><SidebarSection text="Operations" /></li>
      <li><SidebarLink href="/docs/backup" icon={Archive} text="Backup" /></li>
      <li><SidebarLink href="/docs/settings" icon={Settings} text="Settings" /></li>
    </ul>
  </SidebarBody>
</Sidebar>`;

const exampleJsx = `<Sidebar state={sidebarState} action={setSidebarState} className="static z-auto max-h-[560px]">
  <SidebarHead
    href="/"
    logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
    title="Comps Docs"
    state={sidebarState}
    action={setSidebarState}
  />
  <SidebarBody>
    <ul className="flex flex-col gap-2">
      <li><SidebarSection text="Core" className={sidebarState ? 'px-2' : 'px-6'} /></li>
      <li><SidebarLink href="/docs/button" icon={Hand} text="Button" /></li>
      <li><SidebarLink href="/docs/box" icon={Box} text="Box" /></li>
      <li><SidebarLink href="/docs/sidebar" icon={PanelLeft} text="Sidebar" /></li>
      <li><SidebarSection text="Management" className={sidebarState ? 'px-2' : 'px-6'} /></li>
      <li>
        <SidebarGroup icon={FileText} text="Reports">
          <ul className="flex flex-col gap-2">
            <li><SidebarLink href="/docs/financial-report" icon={BarChart3} text="Financial Report" /></li>
            <li><SidebarLink href="/docs/users" icon={Users} text="User Reports" /></li>
          </ul>
        </SidebarGroup>
      </li>
      <li><SidebarSection text="Operations" className={sidebarState ? 'px-2' : 'px-6'} /></li>
      <li><SidebarLink href="/docs/backup" icon={Archive} text="Backup" /></li>
      <li><SidebarLink href="/docs/settings" icon={Settings} text="Settings" /></li>
    </ul>
  </SidebarBody>
</Sidebar>`;

function SidebarPage() {
  const [sidebarState, setSidebarState] = useState(true);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {'>'} Sidebar
        </p>
        <h1 className="text-3xl font-bold text-brand">Sidebar</h1>
        <p className="text-foreground">
          <code>Sidebar</code> is a composition-first aside primitive. Keep expansion controlled
          with <code>state</code> and <code>action</code>, then build navigation using{' '}
          <code>SidebarHead</code>, <code>SidebarBody</code>, <code>SidebarSection</code>,{' '}
          <code>SidebarGroup</code>, and <code>SidebarLink</code> with <code>lucide-react</code>{' '}
          icon components.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import Sidebar primitives from the public entrypoint and pass Lucide icon components
          directly to links and groups.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
        <p className="text-foreground">
          <code>SidebarBody</code> uses <code>SimpleBar</code> for scrolling. In embedded layouts,
          provide a max height so content scrolls while the shell and header stay visible.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Surface className="relative">
          <Sidebar
            state={sidebarState}
            action={setSidebarState}
            className="static z-auto max-h-[560px]">
            <SidebarHead
              href="/"
              logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
              title="Comps Docs"
              state={sidebarState}
              action={setSidebarState}
            />
            <SidebarBody>
              <ul className="flex flex-col gap-2">
                <li>
                  <SidebarSection text="Core" className={sidebarState ? 'px-2' : 'px-6'} />
                </li>
                <li>
                  <SidebarLink href="/docs/button" icon={Hand} text="Button" />
                </li>
                <li>
                  <SidebarLink href="/docs/box" icon={Box} text="Box" />
                </li>
                <li>
                  <SidebarLink href="/docs/sidebar" icon={PanelLeft} text="Sidebar" />
                </li>
                <li>
                  <SidebarSection text="Management" className={sidebarState ? 'px-2' : 'px-6'} />
                </li>
                <li>
                  <SidebarGroup icon={FileText} text="Reports">
                    <ul className="flex flex-col gap-2">
                      <li>
                        <SidebarLink
                          href="/docs/financial-report"
                          icon={BarChart3}
                          text="Financial Report"
                        />
                      </li>
                      <li>
                        <SidebarLink href="/docs/users" icon={Users} text="User Reports" />
                      </li>
                    </ul>
                  </SidebarGroup>
                </li>
                <li>
                  <SidebarSection text="Operations" className={sidebarState ? 'px-2' : 'px-6'} />
                </li>
                <li>
                  <SidebarLink href="/docs/backup" icon={Archive} text="Backup" />
                </li>
                <li>
                  <SidebarLink href="/docs/settings" icon={Settings} text="Settings" />
                </li>
              </ul>
            </SidebarBody>
          </Sidebar>
        </Surface>
        <CodeBlock code={exampleJsx} />
      </section>
    </article>
  );
}

export default SidebarPage;
