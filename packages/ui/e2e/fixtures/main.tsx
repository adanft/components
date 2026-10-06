import { type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DropdownMenuCase from './cases/dropdown-menu';
import ModalCase from './cases/modal';
import SelectCase from './cases/select';
import TextContrastCase from './cases/text-contrast';
import ThemeCase from './cases/theme';
import ThemeSwitchCase from './cases/theme-switch';
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
} else if (caseName === 'dropdown-menu') {
  fixture = <DropdownMenuCase />;
} else if (caseName === 'theme-switch') {
  fixture = <ThemeSwitchCase />;
} else if (caseName === 'text-contrast') {
  fixture = <TextContrastCase />;
} else if (caseName === 'select') {
  fixture = <SelectCase />;
} else {
  root.textContent = `Unknown fixture case: ${caseName}. Available cases: modal, theme, dropdown-menu, theme-switch, text-contrast, select.`;
  throw new Error(`Unknown fixture case: ${caseName}`);
}
createRoot(root).render(params.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture);
