import { expect, type Page, test } from '@playwright/test';

// Each test gets a fresh browser context; descriptors never leak into another case.
test.beforeEach(async ({ page }) => {
  await page.goto('/?case=theme');
  await expect(page.getByRole('heading', { name: 'Theme persistence' })).toBeVisible();
});

async function expectTheme(page: Page, dark: boolean) {
  await expect(page.getByLabel('Theme result')).toHaveText(String(dark));
  if (dark) {
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  } else {
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
  }
}

type StorageFailure = 'getter' | 'missing' | 'getItem' | 'setItem' | 'removeItem';

async function denyPersistence(
  page: Page,
  storage?: StorageFailure,
  cookie = false,
  error = 'SecurityError',
) {
  await page.evaluate(
    ({ storage, cookie, error }) => {
      const fail = () => {
        throw new DOMException('Injected persistence denial', error);
      };
      if (storage === 'getter' || storage === 'missing') {
        Object.defineProperty(window, 'localStorage', {
          configurable: true,
          get: storage === 'getter' ? fail : () => undefined,
        });
      } else if (storage) {
        Object.defineProperty(Storage.prototype, storage, { configurable: true, value: fail });
      }
      // Count attempts even when the setter throws; keep the real getter readable.
      const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
      if (!descriptor?.get || !descriptor.set) throw new Error('Missing native cookie descriptor');
      const { get, set } = descriptor;
      let attempts = 0;
      Object.defineProperty(document, 'cookie', {
        configurable: true,
        get: () => get.call(document),
        set: (value: string) => {
          document.documentElement.dataset.cookieAttempts = String(++attempts);
          if (cookie) fail();
          set.call(document, value);
        },
      });
    },
    { storage, cookie, error },
  );
}

for (const stored of [null, 'dark', 'light']) {
  test(`initialization reads ${stored ?? 'empty'} storage, not the cookie`, async ({ page }) => {
    await page.evaluate((value) => {
      document.documentElement.classList.toggle('dark', value !== 'dark');
      if (value !== null) localStorage.setItem('theme', value);
      // biome-ignore lint/suspicious/noDocumentCookie: seed the real browser cookie for this test.
      document.cookie = 'theme=dark; path=/';
    }, stored);
    await page.getByRole('button', { name: 'Initialize theme' }).click();
    await expectTheme(page, stored === 'dark');
    expect(await page.evaluate(() => document.cookie)).toBe('theme=dark');
  });
}

test('normal dark/light setting persists storage and cookie', async ({ page }) => {
  for (const dark of [true, false]) {
    await page.getByRole('button', { name: dark ? 'Set dark' : 'Set light', exact: true }).click();
    await expectTheme(page, dark);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(dark ? 'dark' : null);
    expect(await page.evaluate(() => document.cookie)).toBe(dark ? 'theme=dark' : '');
  }
});

for (const storage of ['getItem', 'getter', 'missing'] as const) {
  for (const dark of [true, false]) {
    test(`initialization preserves ${dark ? 'dark' : 'light'} with ${storage} unavailable`, async ({
      page,
    }) => {
      await page.evaluate((dark) => {
        document.documentElement.classList.toggle('dark', dark);
        // A conflicting saved value makes preservation observable, not accidental.
        localStorage.setItem('theme', dark ? 'light' : 'dark');
      }, dark);
      await denyPersistence(page, storage);
      await page.getByRole('button', { name: 'Initialize theme' }).click();
      await expectTheme(page, dark);
      await expect(page.locator('html')).not.toHaveAttribute('data-cookie-attempts');
    });
  }
}

const failures: {
  name: string;
  storage?: StorageFailure;
  cookie?: boolean;
  dark: boolean;
  error?: string;
}[] = [
  { name: 'denied getter', storage: 'getter', dark: true },
  { name: 'setItem SecurityError', storage: 'setItem', dark: true },
  {
    name: 'setItem QuotaExceededError',
    storage: 'setItem',
    dark: true,
    error: 'QuotaExceededError',
  },
  { name: 'removeItem SecurityError', storage: 'removeItem', dark: false },
  { name: 'cookie setter', cookie: true, dark: true },
  { name: 'storage and cookie setters', storage: 'setItem', cookie: true, dark: true },
  { name: 'storage removal and cookie setter', storage: 'removeItem', cookie: true, dark: false },
];

for (const scenario of failures) {
  test(`setting survives ${scenario.name}`, async ({ page }) => {
    const { dark } = scenario;
    await page.evaluate((dark) => {
      document.documentElement.classList.toggle('dark', !dark);
      if (!dark) {
        localStorage.setItem('theme', 'dark');
        // biome-ignore lint/suspicious/noDocumentCookie: seed cookie to verify removal independently.
        document.cookie = 'theme=dark; path=/';
      }
    }, dark);
    await denyPersistence(page, scenario.storage, scenario.cookie, scenario.error);
    await page.getByRole('button', { name: dark ? 'Set dark' : 'Set light', exact: true }).click();
    await expectTheme(page, dark);
    await expect(page.locator('html')).toHaveAttribute('data-cookie-attempts', '1');
    expect(await page.evaluate(() => document.cookie)).toBe(
      scenario.cookie ? (dark ? '' : 'theme=dark') : dark ? 'theme=dark' : '',
    );
    if (!scenario.storage) {
      expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(dark ? 'dark' : null);
    }
  });
}
