import { expect, test } from '@playwright/test';
import { renderedContrast } from './helpers/contrast';

test('contrast helper composites alpha and rejects unsupported effects', async ({ page }) => {
  await page.setContent(
    '<div style="background:white"><span style="background:rgb(0 0 0 / 50%);color:rgb(255 255 255 / 50%)">Text</span></div>',
  );
  const text = page.locator('span');
  const result = await text.evaluate(renderedContrast);
  expect(result.effectiveBackground).toEqual([0.5, 0.5, 0.5, 1]);
  const grayLuminance = (value: number) => ((value + 0.055) / 1.055) ** 2.4;
  expect(result.ratio).toBeCloseTo((grayLuminance(0.75) + 0.05) / (grayLuminance(0.5) + 0.05), 6);
  for (const effect of [
    'opacity:0.5',
    'background-image:linear-gradient(black,white)',
    'filter:blur(1px)',
    'text-shadow:1px 1px black',
  ]) {
    await text.evaluate((element, css) => element.setAttribute('style', css), effect);
    await expect(text.evaluate(renderedContrast)).rejects.toThrow('Unsupported contrast effect');
  }
  await page.setContent('<span>Text</span>');
  await expect(page.locator('span').evaluate(renderedContrast)).rejects.toThrow(
    'No opaque ancestor background',
  );
});

test('Button and Badge text contrast: 108 rendered samples', async ({ page }) => {
  await page.goto('/?case=text-contrast');
  const samples: { name: string; ratio: number; foreground: string; background: string }[] = [];
  for (const theme of ['light', 'dark']) {
    await page.evaluate(
      (dark) => document.documentElement.classList.toggle('dark', dark),
      theme === 'dark',
    );
    for (const host of ['background', 'surface']) {
      const controls = page.getByTestId(host).locator('[data-treatment]');
      await expect(controls).toHaveCount(16);
      for (const control of await controls.all()) {
        const treatment = await control.getAttribute('data-treatment');
        const badge = treatment?.startsWith('badge-');
        for (const state of badge ? ['normal'] : ['normal', 'hover']) {
          await page.bringToFront();
          await page.mouse.move(0, 0);
          await page.evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          );
          const normal = await control.evaluate(renderedContrast);
          if (state === 'hover') {
            await expect
              .poll(async () => {
                // Parallel headed tests can steal the active window; reassert pointer ownership.
                await page.bringToFront();
                await control.hover();
                return control.evaluate((element) => getComputedStyle(element).backgroundColor);
              })
              .not.toBe(normal.background);
          }
          // Settle any production transitions, then inspect actual rendered styles.
          await control.evaluate(async (element) => {
            await Promise.all(element.getAnimations().map((animation) => animation.finished));
          });
          const result = await control.evaluate(renderedContrast);
          if (state === 'hover') expect(result.background).not.toBe(normal.background);
          expect(result.fontSize).toBe(badge ? '12px' : '16px');
          expect(result.fontWeight).toBe(badge ? '500' : '600');
          expect(result.sanity.blackWhite).toBe(21);
          expect(result.sanity.equal).toBe(1);
          expect(result.sanity.alpha).toEqual([0.5, 0.5, 0.5, 1]);
          expect(result.sanity.cssAlpha).toBeCloseTo(0.5, 2);
          expect(result.sanity.oklabWhite).toEqual([1, 1, 1, 1]);
          expect(result.sanity.mixedGray[0]).toBeCloseTo(0.5, 2);
          samples.push({
            name: `${theme}/${host}/${treatment}/${state}`,
            ratio: result.ratio,
            foreground: result.foreground,
            background: result.background,
          });
        }
      }
    }
  }
  expect(samples).toHaveLength(108);
  const failures = samples.filter((sample) => sample.ratio < 4.5);
  console.log(
    JSON.stringify({
      samples,
      failures: failures.length,
      minimum: Math.min(...samples.map((sample) => sample.ratio)),
    }),
  );
  expect(failures, 'All ratios are unrounded; sample evidence printed above').toEqual([]);
});
