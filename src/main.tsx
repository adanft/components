import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="text-cyan-700">Hello Sidebar, eslint and Tailwind configurations.</div>
  </StrictMode>,
);
