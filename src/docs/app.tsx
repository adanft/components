import { Route, BrowserRouter as Router, Routes } from 'react-router';

import { Home, NotFound } from '../lib';
import {
  DOCS_BOX_PATH,
  DOCS_BUTTON_PATH,
  DOCS_CHECKBOX_PATH,
  DOCS_HOME_PATH,
  DOCS_ICON_PATH,
  DOCS_INPUT_FIELD_PATH,
  DOCS_MODAL_PATH,
  DOCS_NOT_FOUND_PATH,
  DOCS_PROFILE_PATH,
  DOCS_SIDEBAR_PATH,
  DOCS_TABLE_PATH,
  DOCS_THEME_SWITCH_PATH,
} from './data/routes';
import BoxPage from './pages/box';
import ButtonPage from './pages/button';
import CheckboxPage from './pages/checkbox';
import IconPage from './pages/icon';
import InputFieldPage from './pages/input-field';
import ModalPage from './pages/modal';
import ProfilePage from './pages/profile';
import SidebarPage from './pages/sidebar';
import TablePage from './pages/table';
import ThemeSwitchPage from './pages/theme-switch';
import DocsShell from './shell';

function App() {
  return (
    <Router>
      <DocsShell>
        <Routes>
          <Route path={DOCS_HOME_PATH} element={<Home />} />
          <Route path={DOCS_BUTTON_PATH} element={<ButtonPage />} />
          <Route path={DOCS_BOX_PATH} element={<BoxPage />} />
          <Route path={DOCS_ICON_PATH} element={<IconPage />} />
          <Route path={DOCS_INPUT_FIELD_PATH} element={<InputFieldPage />} />
          <Route path={DOCS_MODAL_PATH} element={<ModalPage />} />
          <Route path={DOCS_PROFILE_PATH} element={<ProfilePage />} />
          <Route path={DOCS_SIDEBAR_PATH} element={<SidebarPage />} />
          <Route path={DOCS_TABLE_PATH} element={<TablePage />} />
          <Route path={DOCS_CHECKBOX_PATH} element={<CheckboxPage />} />
          <Route path={DOCS_THEME_SWITCH_PATH} element={<ThemeSwitchPage />} />
          <Route path={DOCS_NOT_FOUND_PATH} element={<NotFound />} />
        </Routes>
      </DocsShell>
    </Router>
  );
}

export default App;
