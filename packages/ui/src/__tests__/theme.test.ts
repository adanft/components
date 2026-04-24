import { beforeEach, describe, expect, it } from 'vitest';

import { initializeTheme, toggleTheme } from '../theme';

describe('theme helper transitions', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('initializes to light when nothing is stored, then honors stored dark mode', () => {
    expect(initializeTheme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    localStorage.setItem('theme', 'dark');
    expect(initializeTheme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme, persists next value, and flips document class', () => {
    expect(initializeTheme()).toBe('light');

    let currentTheme = toggleTheme();
    expect(currentTheme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    currentTheme = toggleTheme();
    expect(currentTheme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('supports custom target, className, and storageKey through the public API', () => {
    const target = document.createElement('div');

    expect(initializeTheme({ target, className: 'night', storageKey: 'ui-theme' })).toBe('light');
    expect(target.classList.contains('night')).toBe(false);

    const currentTheme = toggleTheme({ target, className: 'night', storageKey: 'ui-theme' });
    expect(currentTheme).toBe('dark');
    expect(localStorage.getItem('ui-theme')).toBe('dark');
    expect(target.classList.contains('night')).toBe(true);
  });
});
