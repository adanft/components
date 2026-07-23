// @vitest-environment node

import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../index';

describe('Modal SSR', () => {
  it('renders no portal content when open on the server', () => {
    const markup = renderToString(
      <Modal open onClose={vi.fn()}>
        Server-rendered modal
      </Modal>,
    );

    expect(markup).toBe('');
  });
});
