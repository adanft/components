import { expect, test } from '@playwright/test';

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  for (const [size, travel] of [
    ['sm', 20],
    ['md', 24],
    ['lg', 28],
  ] as const) {
    test(`${size} preserves controls and respects ${reducedMotion} motion`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion });
      await page.goto('/?case=theme-switch');
      const fixture = page.getByTestId(`theme-switch-${size}`);
      const control = fixture.getByRole('switch');
      const label = fixture.locator('label');
      const thumb = label.locator('span').last();
      const icons = await label.locator('svg').evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          return {
            name: style.animationName,
            duration: style.animationDuration,
            iterations: style.animationIterationCount,
            timing: style.animationTimingFunction,
          };
        }),
      );
      expect(icons).toHaveLength(2);
      if (reducedMotion === 'reduce') {
        expect.soft(icons.map((icon) => icon.name)).toEqual(['none', 'none']);
      } else {
        expect(icons).toEqual([
          { name: 'spin', duration: '15s', iterations: 'infinite', timing: 'linear' },
          { name: 'tilt', duration: '5s', iterations: 'infinite', timing: 'linear' },
        ]);
      }
      const transition = await thumb.evaluate((element) => {
        const style = getComputedStyle(element);
        return { property: style.transitionProperty, duration: style.transitionDuration };
      });
      if (reducedMotion === 'reduce') {
        expect.soft(transition.property === 'none' || transition.duration === '0s').toBe(true);
      } else {
        expect(transition.property).toContain('translate');
        expect(transition.duration).toBe('0.4s');
      }

      const thumbOffset = () =>
        thumb.evaluate((element) => {
          const parent = element.parentElement;
          if (!parent) throw new Error('Missing switch label');
          return element.getBoundingClientRect().left - parent.getBoundingClientRect().left;
        });
      await expect(control).not.toBeChecked();
      await expect(control).toHaveAttribute('aria-checked', 'false');
      await expect(fixture.locator('output')).toHaveText('unchecked');
      await expect.poll(thumbOffset).toBe(2);

      await control.focus();
      await expect(control).toBeFocused();
      await page.keyboard.press('Space');
      await expect(control).toBeChecked();
      await expect(control).toHaveAttribute('aria-checked', 'true');
      await expect(fixture.locator('output')).toHaveText('checked');
      await expect.poll(thumbOffset).toBe(2 + travel);

      await label.click();
      await expect(control).not.toBeChecked();
      await expect(control).toHaveAttribute('aria-checked', 'false');
      await expect(fixture.locator('output')).toHaveText('unchecked');
      await expect.poll(thumbOffset).toBe(2);
    });
  }
}
