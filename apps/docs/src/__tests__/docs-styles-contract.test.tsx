import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../index.css', () => {
  const style = document.createElement('style');

  style.setAttribute('data-testid', 'mock-docs-styles');
  style.textContent = 'body { font-family: "Poppins", sans-serif; }';
  document.head.append(style);

  return {};
});

describe('docs bootstrap package contract', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.className = '';
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    window.history.pushState({}, '', '/');
  });

  it('boots the docs app with package theme helpers and the docs-owned stylesheet entrypoint', async () => {
    localStorage.setItem('theme', 'dark');

    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);

    await import('../main');

    expect(await screen.findByRole('heading', { name: /react components/i })).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');

    const hasInjectedDocsStyles = Array.from(document.head.querySelectorAll('style')).some(
      (style) => {
        const cssText = style.textContent ?? '';
        return cssText.includes('font-family: "Poppins", sans-serif');
      },
    );

    expect(hasInjectedDocsStyles).toBe(true);
  });
});
