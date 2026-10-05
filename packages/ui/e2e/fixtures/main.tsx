import { type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ModalCase from './cases/modal';
import ThemeCase from './cases/theme';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing fixture root');

const params = new URLSearchParams(window.location.search);
const caseName = params.get('case') ?? 'modal';
let fixture: ReactNode;
if (caseName === 'modal') {
  fixture = <ModalCase />;
} else if (caseName === 'theme') {
  fixture = <ThemeCase />;
} else {
  root.textContent = `Unknown fixture case: ${caseName}. Available cases: modal, theme.`;
  throw new Error(`Unknown fixture case: ${caseName}`);
}
createRoot(root).render(params.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture);
