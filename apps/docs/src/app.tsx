import { Route, Routes } from 'react-router';

import {
  DOCS_ACCORDION_PATH,
  DOCS_ALERT_PATH,
  DOCS_BADGE_PATH,
  DOCS_BOX_PATH,
  DOCS_BUTTON_PATH,
  DOCS_CHECKBOX_PATH,
  DOCS_DROPDOWN_MENU_PATH,
  DOCS_FIELD_PATH,
  DOCS_HOME_PATH,
  DOCS_MODAL_PATH,
  DOCS_NOT_FOUND_PATH,
  DOCS_PAGINATION_PATH,
  DOCS_POPOVER_PATH,
  DOCS_PROFILE_PATH,
  DOCS_RADIO_GROUP_PATH,
  DOCS_SELECT_PATH,
  DOCS_SIDEBAR_PATH,
  DOCS_SKELETON_PATH,
  DOCS_SWITCH_PATH,
  DOCS_TABLE_PATH,
  DOCS_TABS_PATH,
  DOCS_THEME_SWITCH_PATH,
  DOCS_TOOLTIP_PATH,
} from './data/routes';
import NotFound from './components/not-found';
import Home from './pages/home';
import AccordionPage from './pages/accordion';
import AlertPage from './pages/alert';
import BadgePage from './pages/badge';
import BoxPage from './pages/box';
import ButtonPage from './pages/button';
import CheckboxPage from './pages/checkbox';
import DropdownMenuPage from './pages/dropdown-menu';
import FieldPage from './pages/field';
import ModalPage from './pages/modal';
import PaginationPage from './pages/pagination';
import PopoverPage from './pages/popover';
import ProfilePage from './pages/profile';
import RadioGroupPage from './pages/radio-group';
import SelectPage from './pages/select';
import SidebarPage from './pages/sidebar';
import SkeletonPage from './pages/skeleton';
import SwitchPage from './pages/switch';
import TablePage from './pages/table';
import TabsPage from './pages/tabs';
import ThemeSwitchPage from './pages/theme-switch';
import TooltipPage from './pages/tooltip';
import DocsShell from './shell';

function App() {
  return (
    <DocsShell>
      <Routes>
        <Route path={DOCS_HOME_PATH} element={<Home />} />
        <Route path={DOCS_ACCORDION_PATH} element={<AccordionPage />} />
        <Route path={DOCS_ALERT_PATH} element={<AlertPage />} />
        <Route path={DOCS_BADGE_PATH} element={<BadgePage />} />
        <Route path={DOCS_BUTTON_PATH} element={<ButtonPage />} />
        <Route path={DOCS_BOX_PATH} element={<BoxPage />} />
        <Route path={DOCS_DROPDOWN_MENU_PATH} element={<DropdownMenuPage />} />
        <Route path={DOCS_FIELD_PATH} element={<FieldPage />} />
        <Route path={DOCS_MODAL_PATH} element={<ModalPage />} />
        <Route path={DOCS_PAGINATION_PATH} element={<PaginationPage />} />
        <Route path={DOCS_POPOVER_PATH} element={<PopoverPage />} />
        <Route path={DOCS_PROFILE_PATH} element={<ProfilePage />} />
        <Route path={DOCS_RADIO_GROUP_PATH} element={<RadioGroupPage />} />
        <Route path={DOCS_SELECT_PATH} element={<SelectPage />} />
        <Route path={DOCS_SIDEBAR_PATH} element={<SidebarPage />} />
        <Route path={DOCS_SKELETON_PATH} element={<SkeletonPage />} />
        <Route path={DOCS_SWITCH_PATH} element={<SwitchPage />} />
        <Route path={DOCS_TABS_PATH} element={<TabsPage />} />
        <Route path={DOCS_TABLE_PATH} element={<TablePage />} />
        <Route path={DOCS_CHECKBOX_PATH} element={<CheckboxPage />} />
        <Route path={DOCS_THEME_SWITCH_PATH} element={<ThemeSwitchPage />} />
        <Route path={DOCS_TOOLTIP_PATH} element={<TooltipPage />} />
        <Route path={DOCS_NOT_FOUND_PATH} element={<NotFound />} />
      </Routes>
    </DocsShell>
  );
}

export default App;
