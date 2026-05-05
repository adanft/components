const THEME_STORAGE_KEY = 'theme';
const DARK_THEME_VALUE = 'dark';
const DARK_THEME_COOKIE = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';
const EXPIRED_THEME_COOKIE = 'theme=; path=/; max-age=0; SameSite=Lax';

function hasBrowserGlobals(): boolean {
  return typeof document !== 'undefined' && typeof localStorage !== 'undefined';
}

function persistTheme(isDark: boolean): void {
  if (isDark) {
    localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_VALUE);
    // biome-ignore lint/suspicious/noDocumentCookie: broad browser support for SSR-readable theme cookie.
    document.cookie = DARK_THEME_COOKIE;
    return;
  }

  localStorage.removeItem(THEME_STORAGE_KEY);
  // biome-ignore lint/suspicious/noDocumentCookie: broad browser support for expiring SSR-readable theme cookie.
  document.cookie = EXPIRED_THEME_COOKIE;
}

function initializeTheme(): boolean {
  if (!hasBrowserGlobals()) {
    return false;
  }

  const isDark = localStorage.getItem(THEME_STORAGE_KEY) === DARK_THEME_VALUE;

  document.documentElement.classList.toggle('dark', isDark);

  return isDark;
}

function toggleTheme(): boolean {
  if (!hasBrowserGlobals()) {
    return false;
  }

  const isDark = !document.documentElement.classList.contains('dark');

  document.documentElement.classList.toggle('dark', isDark);
  persistTheme(isDark);

  return isDark;
}

export { initializeTheme, toggleTheme };
