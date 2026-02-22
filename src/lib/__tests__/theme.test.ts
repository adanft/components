import { describe, expect, it, beforeEach } from 'vitest';

import { applyTheme, getStoredTheme, initializeTheme, toggleTheme, type ThemeMode } from '../theme';

describe('theme helper transitions', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('returns null when stored value is missing or invalid', () => {
    expect(getStoredTheme()).toBeNull();

    localStorage.setItem('theme', 'system');
    expect(getStoredTheme()).toBeNull();
  });

  it('reads stored theme from a custom key', () => {
    localStorage.setItem('ui-theme', 'dark');
    expect(getStoredTheme('ui-theme')).toBe('dark');
  });

  it('applies and removes the theme class on a provided target', () => {
    const target = document.createElement('div');

    expect(applyTheme('dark', { target, className: 'night' })).toBe('dark');
    expect(target.classList.contains('night')).toBe(true);

    expect(applyTheme('light', { target, className: 'night' })).toBe('light');
    expect(target.classList.contains('night')).toBe(false);
  });

  it('initializes to light when nothing is stored, then honors stored dark mode', () => {
    expect(initializeTheme()).toBe('light');
    expect(document.body.classList.contains('dark')).toBe(false);

    localStorage.setItem('theme', 'dark');
    expect(initializeTheme()).toBe('dark');
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('toggles theme, persists next value, and flips document class', () => {
    let currentTheme: ThemeMode = initializeTheme();
    expect(currentTheme).toBe('light');

    currentTheme = toggleTheme(currentTheme);
    expect(currentTheme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.classList.contains('dark')).toBe(true);

    currentTheme = toggleTheme(currentTheme);
    expect(currentTheme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
