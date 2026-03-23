import { useState } from "react";

import {
  Box,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHead,
  SidebarLink,
  SidebarSection,
} from "../../lib";
import { CodeBlock } from "../code-block";

const importSnippet = `import { useState } from 'react';

import {
  Sidebar,
  SidebarHead,
  SidebarBody,
  SidebarLink,
  SidebarSection,
  SidebarGroup,
} from '../../lib';`;

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
      <li><SidebarSection text="Core" state={sidebarState} /></li>
      <li><SidebarLink href="/docs/button" nfIconName="nf-fa-hand_pointer_o" text="Button" /></li>
      <li><SidebarLink href="/docs/box" nfIconName="nf-md-view_agenda_outline" text="Box" /></li>
      <li><SidebarLink href="/docs/sidebar" nfIconName="nf-md-dock_left" text="Sidebar" /></li>

      <li><SidebarSection text="Management" state={sidebarState} /></li>
      <li>
        <SidebarGroup iconName="nf-md-file_document" text="Reports">
          <ul className="flex flex-col gap-2">
            <li>
              <SidebarLink
                href="/docs/financial-report"
                nfIconName="nf-fa-money_check"
                text="Financial Report"
              />
            </li>
            <li>
              <SidebarGroup iconName="nf-fa-chalkboard_user" text="User Reports">
                <ul className="flex flex-col gap-2">
                  <li>
                    <SidebarLink
                      href="/docs/user-activity"
                      nfIconName="nf-fa-hospital_user"
                      text="User Activity"
                    />
                  </li>
                  <li>
                    <SidebarLink
                      href="/docs/user-growth"
                      nfIconName="nf-fa-user_tie"
                      text="User Growth"
                    />
                  </li>
                </ul>
              </SidebarGroup>
            </li>
            <li>
              <SidebarLink
                href="/docs/system-reports"
                nfIconName="nf-md-view_compact"
                text="System Reports"
              />
            </li>
          </ul>
        </SidebarGroup>
      </li>

      <li><SidebarSection text="Operations" state={sidebarState} /></li>
      <li><SidebarLink href="/docs/backup" nfIconName="nf-md-folder_lock_open_outline" text="Backup" /></li>
      <li>
        <SidebarLink
          href="/docs/restore"
          nfIconName="nf-md-folder_refresh_outline"
          text="Restore"
        />
      </li>
      <li><SidebarLink href="/docs/settings" nfIconName="nf-cod-settings_gear" text="Settings" /></li>
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
      <li><SidebarSection text="Core" state={sidebarState} /></li>
      <li><SidebarLink href="/docs/button" nfIconName="nf-fa-hand_pointer_o" text="Button" /></li>
      <li><SidebarLink href="/docs/box" nfIconName="nf-md-view_agenda_outline" text="Box" /></li>
      <li><SidebarLink href="/docs/sidebar" nfIconName="nf-md-dock_left" text="Sidebar" /></li>

      <li><SidebarSection text="Management" state={sidebarState} /></li>
      <li>
        <SidebarGroup iconName="nf-md-file_document" text="Reports">
          <ul className="flex flex-col gap-2">
            <li><SidebarLink href="/docs/financial-report" nfIconName="nf-fa-money_check" text="Financial Report" /></li>
            <li>
              <SidebarGroup iconName="nf-fa-chalkboard_user" text="User Reports">
                <ul className="flex flex-col gap-2">
                  <li><SidebarLink href="/docs/user-activity" nfIconName="nf-fa-hospital_user" text="User Activity" /></li>
                  <li><SidebarLink href="/docs/user-growth" nfIconName="nf-fa-user_tie" text="User Growth" /></li>
                </ul>
              </SidebarGroup>
            </li>
            <li><SidebarLink href="/docs/system-reports" nfIconName="nf-md-view_compact" text="System Reports" /></li>
          </ul>
        </SidebarGroup>
      </li>

      <li><SidebarSection text="Operations" state={sidebarState} /></li>
      <li><SidebarLink href="/docs/backup" nfIconName="nf-md-folder_lock_open_outline" text="Backup" /></li>
      <li><SidebarLink href="/docs/restore" nfIconName="nf-md-folder_refresh_outline" text="Restore" /></li>
      <li><SidebarLink href="/docs/settings" nfIconName="nf-cod-settings_gear" text="Settings" /></li>
    </ul>
  </SidebarBody>
</Sidebar>`;

function SidebarPage() {
  const [sidebarState, setSidebarState] = useState(true);

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          components {">"} Sidebar
        </p>
        <h1 className="text-3xl font-bold text-brand">Sidebar</h1>
        <p className="text-foreground">
          <code>Sidebar</code> is a composition-first aside primitive. Keep
          expansion controlled with <code>state</code> and <code>action</code>,
          then build navigation using <code>SidebarHead</code>,{" "}
          <code>SidebarBody</code>, <code>SidebarSection</code>,{" "}
          <code>SidebarGroup</code>, and <code>SidebarLink</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Usage</h2>
        <p className="text-foreground">
          Import Sidebar primitives from the public entrypoint and compose
          links, sections, and groups directly in JSX.
        </p>
        <CodeBlock code={importSnippet} />
        <CodeBlock code={usageSnippet} />
        <p className="text-foreground">
          <code>SidebarBody</code> uses <code>SimpleBar</code> for scrolling. In
          embedded layouts, provide a max height so content scrolls while the
          shell and header stay visible.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand">Example</h2>
        <Box className="relative">
          <Sidebar
            state={sidebarState}
            action={setSidebarState}
            className="static z-auto max-h-[560px]"
          >
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
                  <SidebarSection
                    text="Core"
                    className={sidebarState ? "px-2" : "px-6"}
                  />
                </li>
                <li>
                  <SidebarLink
                    href="/docs/button"
                    nfIconName="nf-fa-hand_pointer_o"
                    text="Button"
                  />
                </li>
                <li>
                  <SidebarLink
                    href="/docs/box"
                    nfIconName="nf-md-view_agenda_outline"
                    text="Box"
                  />
                </li>
                <li>
                  <SidebarLink
                    href="/docs/sidebar"
                    nfIconName="nf-md-dock_left"
                    text="Sidebar"
                  />
                </li>

                <li>
                  <SidebarSection
                    text="Management"
                    className={sidebarState ? "px-2" : "px-6"}
                  />
                </li>
                <li>
                  <SidebarGroup iconName="nf-md-file_document" text="Reports">
                    <ul className="flex flex-col gap-2">
                      <li>
                        <SidebarLink
                          href="/docs/financial-report"
                          nfIconName="nf-fa-money_check"
                          text="Financial Report"
                        />
                      </li>
                      <li>
                        <SidebarGroup
                          iconName="nf-fa-chalkboard_user"
                          text="User Reports"
                        >
                          <ul className="flex flex-col gap-2">
                            <li>
                              <SidebarLink
                                href="/docs/user-activity"
                                nfIconName="nf-fa-hospital_user"
                                text="User Activity"
                              />
                            </li>
                            <li>
                              <SidebarLink
                                href="/docs/user-growth"
                                nfIconName="nf-fa-user_tie"
                                text="User Growth"
                              />
                            </li>
                          </ul>
                        </SidebarGroup>
                      </li>
                      <li>
                        <SidebarLink
                          href="/docs/system-reports"
                          nfIconName="nf-md-view_compact"
                          text="System Reports"
                        />
                      </li>
                    </ul>
                  </SidebarGroup>
                </li>

                <li>
                  <SidebarSection
                    text="Operations"
                    className={sidebarState ? "px-2" : "px-6"}
                  />
                </li>
                <li>
                  <SidebarLink
                    href="/docs/backup"
                    nfIconName="nf-md-folder_lock_open_outline"
                    text="Backup"
                  />
                </li>
                <li>
                  <SidebarLink
                    href="/docs/restore"
                    nfIconName="nf-md-folder_refresh_outline"
                    text="Restore"
                  />
                </li>
                <li>
                  <SidebarLink
                    href="/docs/settings"
                    nfIconName="nf-cod-settings_gear"
                    text="Settings"
                  />
                </li>
              </ul>
            </SidebarBody>
          </Sidebar>
        </Box>
        <CodeBlock code={exampleJsx} />
      </section>
    </article>
  );
}

export default SidebarPage;
