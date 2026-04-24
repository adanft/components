import { copyFileSync, cpSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const packageRoot = path.resolve(import.meta.dirname, '..');
const sourceStyles = path.join(packageRoot, 'src/styles.css');
const sourceThemeDir = path.join(packageRoot, 'src/theme');
const distDir = path.join(packageRoot, 'dist');
const distStyles = path.join(distDir, 'styles.css');
const distThemeDir = path.join(distDir, 'theme');

mkdirSync(distDir, { recursive: true });
copyFileSync(sourceStyles, distStyles);
cpSync(sourceThemeDir, distThemeDir, { recursive: true });
