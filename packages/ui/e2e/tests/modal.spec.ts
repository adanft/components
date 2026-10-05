import { expect, test } from '@playwright/test';

for (const strict of [false, true]) {
  test(`nested modal restores keyboard focus${strict ? ' in StrictMode' : ''}`, async ({
    page,
  }) => {
    await page.goto(strict ? '/?case=modal&strict' : '/?case=modal');

    const launcher = page.getByRole('button', { name: 'Open outer modal', exact: true });
    const innerOpener = page.getByRole('button', { name: 'Open inner modal', exact: true });
    const outer = page.getByRole('dialog', { name: 'Outer modal', exact: true });
    const inner = page.getByRole('dialog', { name: 'Inner modal', exact: true });

    await page.keyboard.press('Tab');
    await expect(launcher).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(outer).toHaveCount(1);
    await expect(innerOpener).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(inner).toHaveCount(1);
    // The dialogs are nested in React, but each renders its own body portal.
    await expect(page.locator('body > [data-modal-portal]')).toHaveCount(2);
    await expect(page.getByRole('button', { name: 'Close inner modal' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close inner modal' })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(inner).toHaveCount(0);
    await expect(outer).toHaveCount(1);
    await expect(page.locator('body > [data-modal-portal]')).toHaveCount(1);
    await expect(innerOpener).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('body > [data-modal-portal]')).toHaveCount(0);
    await expect(launcher).toBeFocused();
  });
}
