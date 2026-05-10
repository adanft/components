import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const packageRoot = path.resolve(import.meta.dirname, '..');
const sourceStyles = path.join(packageRoot, 'src/styles.css');
const distDir = path.join(packageRoot, 'dist');
const distStyles = path.join(distDir, 'styles.css');

mkdirSync(distDir, { recursive: true });
copyFileSync(sourceStyles, distStyles);
