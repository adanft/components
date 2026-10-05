import { expect, test } from '@playwright/test';

for (const strict of [false, true]) {
  test(`dropdown composes consumer keyboard focus${strict ? ' in StrictMode' : ''}`, async ({
    page,
  }) => {
    await page.goto(strict ? '/?case=dropdown-menu&strict' : '/?case=dropdown-menu');

    const trigger = page.getByRole('button', { name: 'Actions', exact: true });
    const first = page.getByRole('menuitem', { name: 'Profile', exact: true });
    const second = page.getByRole('menuitem', { name: 'Settings', exact: true });
    const count = page.getByTestId('focus-count');

    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(first).toBeFocused();
    await expect(first).toHaveAttribute('data-active', '');
    await expect(count).toHaveText('0');

    await page.keyboard.press('ArrowDown');
    await expect(second).toBeFocused();
    await expect(second).toHaveAttribute('data-active', '');
    await expect(first).not.toHaveAttribute('data-active', '');
    await expect(count).toHaveText('1');
    await expect(page.getByTestId('focus-target')).toHaveText('Settings');
  });
}
