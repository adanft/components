import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './app.tsx';
import { getStorage } from './helpers/local-storage.ts';

const theme = getStorage('theme');

if (theme === 'dark') {
  document.body.classList.add(theme);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
