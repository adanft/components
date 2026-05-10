import { beforeEach, describe, expect, it } from 'vitest';

import { initializeTheme, toggleTheme } from '../helpers/theme';

describe('theme helper transitions', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    // biome-ignore lint/suspicious/noDocumentCookie: tests need to reset the SSR-readable theme cookie.
    document.cookie = 'theme=; path=/; max-age=0; SameSite=Lax';
  });

  it('initializes from localStorage dark', () => {
    localStorage.setItem('theme', 'dark');

    expect(initializeTheme()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('does not initialize from cookie in CSR mode', () => {
    // biome-ignore lint/suspicious/noDocumentCookie: tests need to seed the SSR-readable theme cookie.
    document.cookie = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';

    expect(initializeTheme()).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('initializes to false when nothing is stored', () => {
    expect(initializeTheme()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles dark, writes localStorage and cookie, and flips document class', () => {
    expect(initializeTheme()).toBe(false);

    const isDark = toggleTheme();

    expect(isDark).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.cookie).toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to default, clears localStorage, and expires cookie', () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    // biome-ignore lint/suspicious/noDocumentCookie: tests need to seed the SSR-readable theme cookie.
    document.cookie = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';

    const isDark = toggleTheme();

    expect(isDark).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();
    expect(document.cookie).not.toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('does not throw when browser globals are unavailable', () => {
    const originalDocument = globalThis.document;
    const originalLocalStorage = globalThis.localStorage;

    // @ts-expect-error Simulates SSR where browser globals do not exist.
    delete globalThis.document;
    // @ts-expect-error Simulates SSR where browser globals do not exist.
    delete globalThis.localStorage;

    expect(initializeTheme()).toBe(false);
    expect(toggleTheme()).toBe(false);

    globalThis.document = originalDocument;
    globalThis.localStorage = originalLocalStorage;
  });
});
