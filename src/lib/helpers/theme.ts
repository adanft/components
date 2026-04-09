type ThemeMode = 'light' | 'dark';

type ThemeListener = () => void;

type ThemeOptions = {
  storageKey?: string;
  className?: string;
  target?: HTMLElement;
};

const DEFAULT_STORAGE_KEY = 'theme';
const DEFAULT_CLASS_NAME = 'dark';

const themeListeners = new Set<ThemeListener>();

function getThemeTarget(target?: HTMLElement): HTMLElement | null {
  if (target) {
    return target;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return document.documentElement;
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

function readTheme(storageKey = DEFAULT_STORAGE_KEY): ThemeMode {
  return getStoredTheme(storageKey) ?? 'light';
}

function notifyThemeListeners(): void {
  for (const listener of themeListeners) {
    listener();
  }
}

function subscribeTheme(listener: ThemeListener): () => void {
  themeListeners.add(listener);

  return () => {
    themeListeners.delete(listener);
  };
}

function dispatchThemeChange(): void {
  notifyThemeListeners();
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
  const theme = readTheme(options.storageKey);
  const appliedTheme = applyTheme(theme, options);
  dispatchThemeChange();
  return appliedTheme;
}

function toggleTheme(options: ThemeOptions = {}): ThemeMode {
  const currentTheme = readTheme(options.storageKey);
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setStoredTheme(nextTheme, options.storageKey);
  const appliedTheme = applyTheme(nextTheme, options);
  dispatchThemeChange();
  return appliedTheme;
}

export type { ThemeMode, ThemeOptions };
export { initializeTheme, readTheme, subscribeTheme, toggleTheme };
