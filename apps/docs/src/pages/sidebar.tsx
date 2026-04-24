import {
  Box,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLink,
  SidebarHead,
  SidebarLink,
  SidebarSection,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
        <h1 className="text-3xl font-bold text-heading">Sidebar</h1>
        <p className="text-base leading-7 text-foreground">
          <Code>Sidebar</Code> is a composition-based navigation shell with controlled expanded
          state, top-level links, grouped nested links, and flyout behavior when collapsed.
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

        <h3 className="text-lg font-semibold text-heading">Advanced</h3>
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
        <h2 className="text-2xl font-semibold text-heading">API Reference</h2>

        <h3 className="text-lg font-semibold text-heading">Sidebar</h3>
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
                <Code>state</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Controls whether the sidebar renders expanded or collapsed.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>action</Code>
              </TableCell>
              <TableCell>
                <Code>{`(state: boolean) => void`}</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Receives expansion changes from the toggle button and outside click handler.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">SidebarHead</h3>
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
                <Code>logoSrc</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Brand image rendered at the top of the sidebar.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>title</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Brand label rendered next to the logo.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>href</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>
                <Code>"/"</Code>
              </TableCell>
              <TableCell>Optional destination for the brand link.</TableCell>
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
                Extends the wrapper header with custom classes or native header props.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">SidebarLink</h3>
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
                <Code>href</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required unless <Code>asChild</Code> is enabled; defines the destination for the
                top-level navigation entry.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>icon</Code>
              </TableCell>
              <TableCell>
                <Code>LucideIcon</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Icon rendered before the top-level link label.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>text</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Visible label for the link.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>active</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Marks the current route visually.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>asChild</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Delegates rendering to a custom child such as a router link.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">SidebarGroup</h3>
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
                <Code>icon</Code>
              </TableCell>
              <TableCell>
                <Code>LucideIcon</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Icon rendered in the group trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>text</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Visible label for the group trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code>ReactNode</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Accepts only <Code>SidebarGroupLink</Code> children.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>active</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Styles the group trigger independently from its open or closed state. Expanded
                sidebars still start open when any nested <Code>SidebarGroupLink</Code> is active.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">SidebarGroupLink</h3>
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
                <Code>href</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                Required unless <Code>asChild</Code> is enabled; defines the destination for the
                nested navigation entry.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>text</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>Visible label for the nested link.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>active</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>Marks the selected nested route.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>asChild</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>
                <Code>false</Code>
              </TableCell>
              <TableCell>
                Delegates rendering to a custom child like <Code>Link</Code>.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold text-heading">SidebarBody and SidebarSection</h3>
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
