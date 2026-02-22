type ThemeMode = 'light' | 'dark';

type ThemeOptions = {
  storageKey?: string;
  className?: string;
  target?: HTMLElement;
};

const DEFAULT_STORAGE_KEY = 'theme';
const DEFAULT_CLASS_NAME = 'dark';

function getThemeTarget(target?: HTMLElement): HTMLElement | null {
  if (target) {
    return target;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return document.body;
}

function normalizeTheme(value: string | null): ThemeMode | null {
  if (value === 'dark') {
    return 'dark';
  }

  if (value === 'light') {
    return 'light';
  }

  return null;
}

function getStoredTheme(storageKey = DEFAULT_STORAGE_KEY): ThemeMode | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  return normalizeTheme(localStorage.getItem(storageKey));
}

function setStoredTheme(theme: ThemeMode, storageKey = DEFAULT_STORAGE_KEY): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(storageKey, theme);
}

function applyTheme(theme: ThemeMode, options: ThemeOptions = {}): ThemeMode {
  const target = getThemeTarget(options.target);

  if (!target) {
    return theme;
  }

  target.classList.toggle(options.className ?? DEFAULT_CLASS_NAME, theme === 'dark');
  return theme;
}

function initializeTheme(options: ThemeOptions = {}): ThemeMode {
  const theme = getStoredTheme(options.storageKey) ?? 'light';
  return applyTheme(theme, options);
}

function toggleTheme(currentTheme: ThemeMode, options: ThemeOptions = {}): ThemeMode {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setStoredTheme(nextTheme, options.storageKey);
  return applyTheme(nextTheme, options);
}

export { applyTheme, getStoredTheme, initializeTheme, setStoredTheme, toggleTheme };
export type { ThemeMode, ThemeOptions };
