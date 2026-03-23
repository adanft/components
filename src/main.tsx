import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lib/styles.css';

import App from './docs/app.tsx';
import { initializeTheme } from './lib/theme.ts';

initializeTheme();

// biome-ignore lint/style/noNonNullAssertion: root element always exists in index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
