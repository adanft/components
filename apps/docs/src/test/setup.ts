import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { createElement, type ReactNode } from 'react';
import { afterEach, vi } from 'vitest';

vi.mock('simplebar-react', () => ({
  default: ({ children, className }: { children: ReactNode; className?: string }) =>
    createElement('div', { className, 'data-testid': 'simplebar' }, children),
}));

afterEach(() => {
  cleanup();
});
