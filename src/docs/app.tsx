import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { Home, NotFound } from '../lib';
import { DOCS_BOX_PATH, DOCS_HOME_PATH, DOCS_ICON_PATH, DOCS_NOT_FOUND_PATH } from './data/routes';
import BoxPage from './pages/box';
import IconPage from './pages/icon';
import DocsShell from './shell';

function App() {
  return (
    <Router>
      <DocsShell>
        <Routes>
          <Route path={DOCS_HOME_PATH} element={<Home />} />
          <Route path={DOCS_BOX_PATH} element={<BoxPage />} />
          <Route path={DOCS_ICON_PATH} element={<IconPage />} />
          <Route path={DOCS_NOT_FOUND_PATH} element={<NotFound />} />
        </Routes>
      </DocsShell>
    </Router>
  );
}

export default App;
