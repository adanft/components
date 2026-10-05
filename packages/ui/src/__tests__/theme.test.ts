import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { initializeTheme, setTheme } from '../helpers/theme';

describe('theme helper transitions', () => {
  const documentDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (documentDescriptor) {
      Object.defineProperty(globalThis, 'document', documentDescriptor);
    }
    if (storageDescriptor) {
      Object.defineProperty(globalThis, 'localStorage', storageDescriptor);
    }
  });

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

  it('sets dark, writes localStorage and cookie, and updates the document class', () => {
    expect(initializeTheme()).toBe(false);

    const isDark = setTheme(true);

    expect(isDark).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.cookie).toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('sets the default theme, clears localStorage, and expires the cookie', () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    // biome-ignore lint/suspicious/noDocumentCookie: tests need to seed the SSR-readable theme cookie.
    document.cookie = 'theme=dark; path=/; max-age=31536000; SameSite=Lax';

    const isDark = setTheme(false);

    expect(isDark).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();
    expect(document.cookie).not.toContain('theme=dark');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('does not throw or access storage when document is unavailable', () => {
    vi.stubGlobal('document', undefined);
    const storageGetter = vi.spyOn(globalThis, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage denied', 'SecurityError');
    });

    expect(initializeTheme()).toBe(false);
    expect(setTheme(true)).toBe(false);
    expect(setTheme(false)).toBe(false);
    expect(storageGetter).not.toHaveBeenCalled();
  });

  it('clears existing dark state when readable storage is empty', () => {
    document.documentElement.classList.add('dark');

    expect(initializeTheme()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  describe.each(['denied getter', 'missing storage', 'failed read'] as const)(
    'with %s',
    (failure) => {
      function failStorage() {
        if (failure === 'denied getter') {
          vi.spyOn(globalThis, 'localStorage', 'get').mockImplementation(() => {
            throw new DOMException('Storage denied', 'SecurityError');
          });
        } else if (failure === 'missing storage') {
          vi.stubGlobal('localStorage', undefined);
        } else {
          vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new DOMException('Storage denied', 'SecurityError');
          });
        }
      }

      it.each([true, false])('preserves initial dark=%s without reading cookie', (isDark) => {
        document.documentElement.classList.toggle('dark', isDark);
        const cookieGetter = vi.spyOn(document, 'cookie', 'get');
        failStorage();

        expect(initializeTheme()).toBe(isDark);
        expect(document.documentElement.classList.contains('dark')).toBe(isDark);
        expect(cookieGetter).not.toHaveBeenCalled();
      });

      if (failure !== 'failed read') {
        it.each([true, false])('sets dark=%s and independently persists cookie', (isDark) => {
          document.documentElement.classList.toggle('dark', !isDark);
          const cookieSetter = vi.spyOn(document, 'cookie', 'set');
          failStorage();

          expect(setTheme(isDark)).toBe(isDark);
          expect(document.documentElement.classList.contains('dark')).toBe(isDark);
          expect(cookieSetter).toHaveBeenCalledWith(
            isDark
              ? 'theme=dark; path=/; max-age=31536000; SameSite=Lax'
              : 'theme=; path=/; max-age=0; SameSite=Lax',
          );
        });
      }
    },
  );

  it.each([
    ['setItem', 'SecurityError', true],
    ['setItem', 'QuotaExceededError', true],
    ['removeItem', 'SecurityError', false],
  ] as const)('sets theme despite %s %s and still attempts cookie', (method, errorName, isDark) => {
    document.documentElement.classList.toggle('dark', !isDark);
    vi.spyOn(Storage.prototype, method).mockImplementation(() => {
      throw new DOMException('Storage failed', errorName);
    });
    const cookieSetter = vi.spyOn(document, 'cookie', 'set');

    expect(setTheme(isDark)).toBe(isDark);
    expect(document.documentElement.classList.contains('dark')).toBe(isDark);
    expect(cookieSetter).toHaveBeenCalledOnce();
  });

  it.each([true, false])('sets dark=%s despite cookie setter failure', (isDark) => {
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', 'dark');
    vi.spyOn(document, 'cookie', 'set').mockImplementation(() => {
      throw new DOMException('Cookie denied', 'SecurityError');
    });

    expect(setTheme(isDark)).toBe(isDark);
    expect(document.documentElement.classList.contains('dark')).toBe(isDark);
    expect(localStorage.getItem('theme')).toBe(isDark ? 'dark' : null);
  });

  it('returns the applied theme when both persistence mechanisms fail', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage full', 'QuotaExceededError');
    });
    const cookieSetter = vi.spyOn(document, 'cookie', 'set').mockImplementation(() => {
      throw new DOMException('Cookie denied', 'SecurityError');
    });

    expect(setTheme(true)).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(cookieSetter).toHaveBeenCalledOnce();
  });

  it.each(['initializeTheme', 'setTheme'])('does not swallow DOM errors in %s', (operation) => {
    const error = new Error('DOM failure');
    vi.spyOn(document.documentElement.classList, 'toggle').mockImplementation(() => {
      throw error;
    });

    expect(() => (operation === 'initializeTheme' ? initializeTheme() : setTheme(true))).toThrow(
      error,
    );
  });
});
