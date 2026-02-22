import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { Home, NotFound } from '../lib';
import { DOCS_HOME_PATH, DOCS_NOT_FOUND_PATH } from './data/routes';
import DocsShell from './shell';

function App() {
  return (
    <Router>
      <DocsShell>
        <Routes>
          <Route path={DOCS_HOME_PATH} element={<Home />} />
          <Route path={DOCS_NOT_FOUND_PATH} element={<NotFound />} />
        </Routes>
      </DocsShell>
    </Router>
  );
}

export default App;
