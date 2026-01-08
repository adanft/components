import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Sidebar from './components/sidebar';
import Home from './pages/home';
import Navbar from './components/navbar';
import NotFound from './components/not-found';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
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
    </>
  );
}

export default App;
