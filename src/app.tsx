import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Sidebar from './components/sidebar';
import Products from './pages/products';
import Users from './pages/users';
import Analytics from './pages/analytics';
import Home from './pages/home';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <main className="absolute left-16.25 text-color w-[calc(100%-65px)] p-4 min-h-[calc(100vh-97px)] bg-primary-color top-24.25">
          <div className="container mx-auto">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;
