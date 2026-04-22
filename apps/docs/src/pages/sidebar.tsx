import {
  Box,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarLink,
  SidebarSection,
} from '@adanft/ui';
import { Archive, Box as BoxIcon, FileText, Hand, PanelLeft, Settings } from 'lucide-react';
import { type MouseEvent, useState } from 'react';
import { CodeBlock } from '../code-block';
import { Code } from '../components/code';

const importSnippet = `import { FileText, Hand } from 'lucide-react';
import { useState } from 'react';

import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarLink,
  SidebarSection,
} from '@adanft/ui';`;

const usageSnippet = `function ExampleSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Sidebar state={sidebarOpen} action={setSidebarOpen} className="static z-auto max-h-[560px]">
      <SidebarHead
        href="/"
        logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
        title="Comps Docs"
      />
      <SidebarBody>
        <SidebarSection text="Core" />
        <SidebarLink href="/docs/button" icon={Hand} text="Button" />
        <SidebarGroup active icon={FileText} text="Reports">
          <SidebarGroupLink href="/docs/financial-report" text="Financial Report" />
          <SidebarGroupLink active href="/docs/users" text="User Reports" />
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
  );
}`;

const composedExampleJsx = `<Sidebar state={sidebarOpen} action={setSidebarOpen} className="static z-auto max-h-[560px]">
  <SidebarHead
    href="/"
    logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
    title="Comps Docs"
  />
  <SidebarBody>
    <SidebarSection text="Core" />
    <SidebarLink href="/docs/button" icon={Hand} text="Button" />
    <SidebarLink href="/docs/box" icon={BoxIcon} text="Box" />
    <SidebarLink active href="/docs/sidebar" icon={PanelLeft} text="Sidebar" />
    <SidebarSection text="Management" />
    <SidebarGroup icon={FileText} text="Reports">
      <SidebarGroupLink href="/docs/financial-report" text="Financial Report" />
      <SidebarGroupLink active href="/docs/users" text="User Reports" />
    </SidebarGroup>
    <SidebarSection text="Operations" />
    <SidebarLink href="/docs/backup" icon={Archive} text="Backup" />
    <SidebarLink href="/docs/settings" icon={Settings} text="Settings" />
  </SidebarBody>
</Sidebar>`;

const simpleExampleJsx = `<Sidebar state={sidebarOpen} action={setSidebarOpen} className="static z-auto max-h-[420px]">
  <SidebarHead
    href="/"
    logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
    title="Comps Docs"
  />
  <SidebarBody>
    <SidebarSection text="Core" />
    <SidebarLink active href="/docs/sidebar" icon={PanelLeft} text="Sidebar" />
    <SidebarLink href="/docs/button" icon={Hand} text="Button" />
    <SidebarLink href="/docs/box" icon={BoxIcon} text="Box" />
  </SidebarBody>
</Sidebar>`;

function SidebarPage() {
  const [simpleSidebarOpen, setSimpleSidebarOpen] = useState(true);
  const [advancedSidebarOpen, setAdvancedSidebarOpen] = useState(true);
  const [simpleActivePath, setSimpleActivePath] = useState('/docs/sidebar');
  const [advancedActivePath, setAdvancedActivePath] = useState('/docs/users');

  function handleExampleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    setActivePath: (href: string) => void,
    href: string,
  ) {
    event.preventDefault();
    setActivePath(href);
  }

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-brand">Sidebar</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Sidebar</Code> is a composition-based navigation shell with controlled expanded
          state, top-level links, grouped nested links, and flyout behavior when collapsed.
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
        <Box className="relative" shadow="none" surface="none">
          <Sidebar
            state={simpleSidebarOpen}
            action={setSimpleSidebarOpen}
            className="static z-auto max-h-[420px]">
            <SidebarHead
              href="/"
              logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
              title="Comps Docs"
            />
            <SidebarBody>
              <SidebarSection text="Core" />
              <SidebarLink
                active={simpleActivePath === '/docs/sidebar'}
                href="/docs/sidebar"
                icon={PanelLeft}
                text="Sidebar"
                onClick={(event) =>
                  handleExampleNavigation(event, setSimpleActivePath, '/docs/sidebar')
                }
              />
              <SidebarLink
                active={simpleActivePath === '/docs/button'}
                href="/docs/button"
                icon={Hand}
                text="Button"
                onClick={(event) =>
                  handleExampleNavigation(event, setSimpleActivePath, '/docs/button')
                }
              />
              <SidebarLink
                active={simpleActivePath === '/docs/box'}
                href="/docs/box"
                icon={BoxIcon}
                text="Box"
                onClick={(event) =>
                  handleExampleNavigation(event, setSimpleActivePath, '/docs/box')
                }
              />
            </SidebarBody>
          </Sidebar>
        </Box>
        <CodeBlock code={simpleExampleJsx} />

        <h3 className="text-lg font-semibold text-brand">Advanced</h3>
        <Box className="relative" shadow="none" surface="none">
          <Sidebar
            state={advancedSidebarOpen}
            action={setAdvancedSidebarOpen}
            className="static z-auto max-h-[560px]">
            <SidebarHead
              href="/"
              logoSrc="https://raw.githubusercontent.com/uditkumar01/ReactComponentGeneratorExtension/main/assets/logo.png"
              title="Comps Docs"
            />
            <SidebarBody>
              <SidebarSection text="Core" />
              <SidebarLink
                active={advancedActivePath === '/docs/button'}
                href="/docs/button"
                icon={Hand}
                text="Button"
                onClick={(event) =>
                  handleExampleNavigation(event, setAdvancedActivePath, '/docs/button')
                }
              />
              <SidebarLink
                active={advancedActivePath === '/docs/box'}
                href="/docs/box"
                icon={BoxIcon}
                text="Box"
                onClick={(event) =>
                  handleExampleNavigation(event, setAdvancedActivePath, '/docs/box')
                }
              />
              <SidebarLink
                active={advancedActivePath === '/docs/sidebar'}
                href="/docs/sidebar"
                icon={PanelLeft}
                text="Sidebar"
                onClick={(event) =>
                  handleExampleNavigation(event, setAdvancedActivePath, '/docs/sidebar')
                }
              />
              <SidebarSection text="Management" />
              <SidebarGroup
                active={
                  advancedActivePath === '/docs/financial-report' ||
                  advancedActivePath === '/docs/users'
                }
                icon={FileText}
                text="Reports">
                <SidebarGroupLink
                  active={advancedActivePath === '/docs/financial-report'}
                  href="/docs/financial-report"
                  text="Financial Report"
                  onClick={(event) =>
                    handleExampleNavigation(event, setAdvancedActivePath, '/docs/financial-report')
                  }
                />
                <SidebarGroupLink
                  active={advancedActivePath === '/docs/users'}
                  href="/docs/users"
                  text="User Reports"
                  onClick={(event) =>
                    handleExampleNavigation(event, setAdvancedActivePath, '/docs/users')
                  }
                />
              </SidebarGroup>
              <SidebarSection text="Operations" />
              <SidebarLink
                active={advancedActivePath === '/docs/backup'}
                href="/docs/backup"
                icon={Archive}
                text="Backup"
                onClick={(event) =>
                  handleExampleNavigation(event, setAdvancedActivePath, '/docs/backup')
                }
              />
              <SidebarLink
                active={advancedActivePath === '/docs/settings'}
                href="/docs/settings"
                icon={Settings}
                text="Settings"
                onClick={(event) =>
                  handleExampleNavigation(event, setAdvancedActivePath, '/docs/settings')
                }
              />
            </SidebarBody>
          </Sidebar>
        </Box>
        <CodeBlock code={composedExampleJsx} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand">API Reference</h2>

        <h3 className="text-lg font-semibold text-brand">Sidebar</h3>
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
                  <Code>state</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Controls whether the sidebar renders expanded or collapsed.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>action</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>{`(state: boolean) => void`}</Code>
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  Receives expansion changes from the toggle button and outside click handler.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">SidebarHead</h3>
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
                  <Code>logoSrc</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Brand image rendered at the top of the sidebar.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>title</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Brand label rendered next to the logo.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>href</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>"/"</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Optional destination for the brand link.
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
                  Extends the wrapper header with custom classes or native header props.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">SidebarLink</h3>
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
                  <Code>href</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required unless <Code>asChild</Code> is enabled; defines the destination for the
                  top-level navigation entry.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>icon</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>LucideIcon</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Icon rendered before the top-level link label.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>text</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">Visible label for the link.</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>active</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>false</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Marks the current route visually.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>asChild</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>false</Code>
                </td>
                <td className="px-4 py-3">
                  Delegates rendering to a custom child such as a router link.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">SidebarGroup</h3>
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
                  <Code>icon</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>LucideIcon</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Icon rendered in the group trigger.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>text</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Visible label for the group trigger.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>children</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>ReactNode</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Accepts only <Code>SidebarGroupLink</Code> children.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>active</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>false</Code>
                </td>
                <td className="px-4 py-3">
                  Styles the group trigger independently from its open or closed state. Expanded
                  sidebars still start open when any nested <Code>SidebarGroupLink</Code> is active.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">SidebarGroupLink</h3>
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
                  <Code>href</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Required unless <Code>asChild</Code> is enabled; defines the destination for the
                  nested navigation entry.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>text</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>string</Code>
                </td>
                <td className="border-b border-border px-4 py-3">—</td>
                <td className="border-b border-border px-4 py-3">
                  Visible label for the nested link.
                </td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3">
                  <Code>active</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  <Code>false</Code>
                </td>
                <td className="border-b border-border px-4 py-3">
                  Marks the selected nested route.
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3">
                  <Code>asChild</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>boolean</Code>
                </td>
                <td className="px-4 py-3">
                  <Code>false</Code>
                </td>
                <td className="px-4 py-3">
                  Delegates rendering to a custom child like <Code>Link</Code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-brand">SidebarBody and SidebarSection</h3>
        <div className="space-y-3 text-base leading-7 text-foreground">
          <p>
            <Code>SidebarBody</Code> wraps the navigation content area and is the place where the
            top-level sidebar items should be composed directly, including <Code>SidebarLink</Code>,{' '}
            <Code>SidebarSection</Code>, and <Code>SidebarGroup</Code>.
          </p>
        </div>
      </section>
    </article>
  );
}

export default SidebarPage;
