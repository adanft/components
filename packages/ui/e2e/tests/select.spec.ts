import { expect, test } from '@playwright/test';

test('placeholder color, explicit default, reset and disabled form behavior', async ({ page }) => {
  await page.goto('/?case=select');
  const placeholder = page.getByRole('combobox', { name: 'Placeholder', exact: true });
  const explicit = page.getByRole('combobox', { name: 'Default', exact: true });
  const color = () => placeholder.evaluate((element) => getComputedStyle(element).color);
  const muted = await color();
  await expect(placeholder).toHaveValue('');
  await expect(placeholder.locator('option:checked')).toBeDisabled();
  await expect(explicit).toHaveValue('pro');
  expect(muted).not.toBe(await explicit.evaluate((element) => getComputedStyle(element).color));
  await placeholder.selectOption('starter');
  expect(await color()).toBe(await explicit.evaluate((element) => getComputedStyle(element).color));
  await explicit.selectOption('starter');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(placeholder).toHaveValue('');
  await expect(explicit).toHaveValue('pro');
  expect(await color()).toBe(muted);
  await expect(page.getByRole('combobox', { name: 'Disabled', exact: true })).toBeDisabled();
  expect(
    await page
      .getByRole('form', { name: 'Plans' })
      .evaluate((element) => Array.from(new FormData(element as HTMLFormElement).entries())),
  ).toEqual([['default', 'pro']]);
});

test('controlled string and numeric values retain native changes', async ({ page }) => {
  await page.goto('/?case=select');
  const controlled = page.getByRole('combobox', { name: 'Controlled', exact: true });
  const numeric = page.getByRole('combobox', { name: 'Numeric', exact: true });
  await expect(controlled).toHaveValue('pro');
  await controlled.selectOption('starter');
  await expect(page.getByLabel('Plan value')).toHaveText('starter');
  await expect(controlled).toHaveValue('starter');
  await expect(numeric).toHaveValue('10');
  await numeric.selectOption('20');
  await expect(page.getByLabel('Numeric value')).toHaveText('20');
  await expect(numeric).toHaveValue('20');
});

test('unchecked multiple stays a single combobox with the fixed chevron', async ({ page }) => {
  await page.goto('/?case=select');
  const fixture = page.getByTestId('rogue-select');
  const control = fixture.getByRole('combobox', { name: 'Unchecked' });
  await expect(control).toHaveValue('');
  expect(
    await control.evaluate((element) => {
      const select = element as HTMLSelectElement;
      const style = getComputedStyle(select);
      return {
        multiple: select.multiple,
        selected: select.selectedOptions.length,
        appearance: style.appearance,
        padding: style.paddingRight,
      };
    }),
  ).toEqual({ multiple: false, selected: 1, appearance: 'none', padding: '40px' });
  const icon = fixture.locator('svg');
  await expect(icon).toHaveAttribute('aria-hidden', 'true');
  expect(
    await icon.evaluate((element) => {
      const style = getComputedStyle(element);
      return { position: style.position, pointerEvents: style.pointerEvents, right: style.right };
    }),
  ).toEqual({ position: 'absolute', pointerEvents: 'none', right: '12px' });
  await control.selectOption('pro');
  await expect(control).toHaveValue('pro');
  expect(
    await control.evaluate((element) => (element as HTMLSelectElement).selectedOptions.length),
  ).toBe(1);
});
