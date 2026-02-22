import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { Home, Navbar, NotFound, Sidebar } from '../lib';
import { RouterLinkAdapter } from './router-adapters';
import useRouteActiveMatcher from './use-route-active-matcher';

function DocsSidebar() {
  const getIsActive = useRouteActiveMatcher();

  return (
    <Sidebar
      LinkComponent={RouterLinkAdapter}
      HomeLinkComponent={RouterLinkAdapter}
      getIsActive={getIsActive}
    />
  );
}

function App() {
  return (
    <Router>
      <DocsSidebar />
      <main className="absolute left-16.25 text-color w-[calc(100%-65px)] p-4 min-h-[calc(100vh-97px)] bg-primary-color top-24.25">
        <div className="container mx-auto">
          <Navbar />
          <Routes>
            <Route path="/components" element={<Home />} />
            <Route path="/components/*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
