import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ModalCase from './cases/modal';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing fixture root');

const params = new URLSearchParams(window.location.search);
const caseName = params.get('case') ?? 'modal';
if (caseName !== 'modal') {
  root.textContent = `Unknown fixture case: ${caseName}. Available case: modal.`;
  throw new Error(`Unknown fixture case: ${caseName}`);
}

const fixture = <ModalCase />;
createRoot(root).render(params.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture);
