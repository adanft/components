import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { Home, NotFound } from '../lib';
import {
  DOCS_BOX_PATH,
  DOCS_HOME_PATH,
  DOCS_ICON_PATH,
  DOCS_INPUT_FIELD_PATH,
  DOCS_PROFILE_PATH,
  DOCS_NOT_FOUND_PATH,
} from './data/routes';
import BoxPage from './pages/box';
import IconPage from './pages/icon';
import InputFieldPage from './pages/input-field';
import ProfilePage from './pages/profile';
import DocsShell from './shell';

function App() {
  return (
    <Router>
      <DocsShell>
        <Routes>
          <Route path={DOCS_HOME_PATH} element={<Home />} />
          <Route path={DOCS_BOX_PATH} element={<BoxPage />} />
          <Route path={DOCS_ICON_PATH} element={<IconPage />} />
          <Route path={DOCS_INPUT_FIELD_PATH} element={<InputFieldPage />} />
          <Route path={DOCS_PROFILE_PATH} element={<ProfilePage />} />
          <Route path={DOCS_NOT_FOUND_PATH} element={<NotFound />} />
        </Routes>
      </DocsShell>
    </Router>
  );
}

export default App;
