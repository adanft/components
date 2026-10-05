const THEME_STORAGE_KEY = 'theme';
const DARK_THEME_VALUE = 'dark';
const DARK_THEME_COOKIE = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';
const EXPIRED_THEME_COOKIE = 'theme=; path=/; max-age=0; SameSite=Lax';

function persistTheme(isDark: boolean): void {
  try {
    if (isDark) {
      localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_VALUE);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  } catch {
    // Storage is optional; still attempt cookie persistence independently.
  }

  try {
    // biome-ignore lint/suspicious/noDocumentCookie: broad browser support for SSR-readable theme cookie.
    document.cookie = isDark ? DARK_THEME_COOKIE : EXPIRED_THEME_COOKIE;
  } catch {
    // Cookie persistence is optional too; the document theme is already applied.
  }
}

function initializeTheme(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  let storedTheme: string | null;
  try {
    storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // Preserve the current document theme when storage cannot be read.
    return document.documentElement.classList.contains('dark');
  }

  const isDark = storedTheme === DARK_THEME_VALUE;
  document.documentElement.classList.toggle('dark', isDark);

  return isDark;
}

function setTheme(isDark: boolean): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  document.documentElement.classList.toggle('dark', isDark);
  persistTheme(isDark);

  return isDark;
}

export { initializeTheme, setTheme };
