import { describe, expect, it } from 'vitest';

import { createSourceClassRegex } from '../../scripts/validate-semantic-tokens.mjs';

describe('semantic token source class parser', () => {
  it.each([
    'text-dark px-2',
    'px-2 text-dark py-2',
    'px-2 text-dark',
  ])('detects a legacy class in %s', (classNames) => {
    expect(classNames.match(createSourceClassRegex())?.[1]).toBe('text-dark');
  });

  it.each([
    'text-muted px-2',
    'px-2 text-muted py-2',
    'px-2 text-muted',
  ])('accepts the semantic text-muted class in %s', (classNames) => {
    expect(classNames.match(createSourceClassRegex())).toBeNull();
  });
});
