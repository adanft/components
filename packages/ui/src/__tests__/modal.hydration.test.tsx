import { act, screen } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../index';

describe('Modal hydration', () => {
  it('hydrates an open modal without a recoverable mismatch', async () => {
    const container = document.createElement('div');
    const onClose = vi.fn();
    const onRecoverableError = vi.fn();
    const modal = (
      <Modal open onClose={onClose}>
        <Modal.Panel aria-label="Hydrated modal">Modal content</Modal.Panel>
      </Modal>
    );

    expect(renderToString(modal)).toBe('');
    document.body.append(container);

    const root = hydrateRoot(container, modal, { onRecoverableError });
    await act(async () => {});

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: 'Hydrated modal' })).toBeInTheDocument();

    act(() => root.unmount());
    container.remove();
  });
});
