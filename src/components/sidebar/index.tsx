import { useState, type JSX } from 'react';

import useOutsideHandler from '../../hooks/use-outside-handler';
import SidebarHeader from '../sidebar-header';
import SidebarLink from '../sidebar-link';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SidebarLinkList from '../sidebar-link-list';

function Sidebar(): JSX.Element {
  const [onActive, setOnActive] = useState(false);
  const asideRef = useOutsideHandler(() => {
    setOnActive(false);
  });

  return (
    <aside
      ref={asideRef}
      className={`transition-all duration-300 fixed min-h-screen z-20 top-0 left-0 back border-r border-color shadow-personal bg-secondary-color
        ${onActive ? 'w-80.25' : 'w-16.25'}`}>
      <SidebarHeader action={setOnActive} state={onActive} />
      <SimpleBar className="max-h-[calc(100vh-96px)] overflow-x-hidden">
        <nav className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            <li>
              <SidebarLink
                nfIconName="nf-fa-shopping_cart"
                text="Orders"
                href="/components/orders"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-md-shopping"
                text="Products"
                href="/components/products"
              />
            </li>
            <li>
              <SidebarLink nfIconName="nf-fa-history" text="History" href="/components/history" />
            </li>
            <li>
              <SidebarLink nfIconName="nf-fa-users" text="Users" href="/components/users" />
            </li>
            <li>
              <SidebarLink nfIconName="nf-oct-star" text="Favorites" href="/components/favorite" />
            </li>
          </ul>
          <h5
            className={`text-muted py-4 ${onActive ? 'px-2' : 'px-6'} text-lg font-semibold whitespace-nowrap`}>
            <i className="nf nf-fa-minus"></i>
            <span className="ml-6">CONTENT MANAGEMENT</span>
          </h5>
          <SidebarLinkList iconName="nf-md-file_document" text="Reports">
            <ul className="flex flex-col gap-2">
              <li>
                <SidebarLink
                  nfIconName="nf-fa-money_check"
                  text="Financial Report"
                  href="/components/financial-report"
                />
              </li>
              <li>
                <SidebarLinkList iconName="nf-fa-chalkboard_user" text="User Reports">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <SidebarLink
                        nfIconName="nf-fa-hospital_user"
                        text="User Activity"
                        href="/components/user-activity"
                      />
                    </li>
                    <li>
                      <SidebarLink
                        nfIconName="nf-fa-user_tie"
                        text="User Growth"
                        href="/components/user-growth"
                      />
                    </li>
                  </ul>
                </SidebarLinkList>
              </li>
              <li>
                <SidebarLink
                  nfIconName="nf-md-view_compact"
                  text="System Reports"
                  href="/components/system-reports"
                />
              </li>
            </ul>
          </SidebarLinkList>
          <ul className="flex flex-col gap-2">
            <li>
              <SidebarLink
                nfIconName="nf-md-integrated_circuit_chip"
                text="Integrations"
                href="/components/integrations"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-fa-bell"
                text="Notifications"
                href="/components/notifications"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-md-google_analytics"
                text="Analytics"
                href="/components/analytics"
              />
            </li>
          </ul>
          <h5
            className={`text-muted py-4 ${onActive ? 'px-2' : 'px-6'} text-lg font-semibold whitespace-nowrap`}>
            <i className="nf nf-fa-minus"></i>
            <span className="ml-6">BACKUP & RESTORE</span>
          </h5>
          <ul className="flex flex-col gap-2">
            <li>
              <SidebarLink
                nfIconName="nf-md-folder_lock_open_outline"
                text="Backup"
                href="/components/backup"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-md-folder_refresh_outline"
                text="Restore"
                href="/components/restore"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-fa-camera_retro"
                text="Snapshots"
                href="/components/snapshots"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-md-calendar"
                text="Schedule"
                href="/components/schedule"
              />
            </li>
            <li>
              <SidebarLink
                nfIconName="nf-cod-settings_gear"
                text="Settings"
                href="/components/settings"
              />
            </li>
          </ul>
        </nav>
      </SimpleBar>
    </aside>
  );
}

export default Sidebar;
