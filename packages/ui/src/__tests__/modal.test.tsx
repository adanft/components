import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StrictMode, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from '../index';

function renderModal({
  open = true,
  onClose = vi.fn(),
}: {
  open?: boolean;
  onClose?: () => void;
} = {}) {
  return {
    onClose,
    ...render(
      <Modal open={open} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Dialog heading</Modal.Title>
          <p>Body content</p>
        </Modal.Panel>
      </Modal>,
    ),
  };
}

function FocusRestorationFixture({ revision = 0 }: { revision?: number }) {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOuterOpen(true)}>
        First launcher
      </button>
      <button type="button" onClick={() => setOuterOpen(true)}>
        Second launcher
      </button>
      <Modal open={outerOpen} onClose={() => setOuterOpen(false)}>
        <Modal.Panel aria-label="Outer focus" data-testid="outer-focus-panel">
          <span>Revision {revision}</span>
          <button type="button" onClick={() => setInnerOpen(true)}>
            Inner launcher
          </button>
          <Modal open={innerOpen} onClose={() => setInnerOpen(false)}>
            <Modal.Panel aria-label="Inner focus" data-testid="inner-focus-panel">
              <button type="button" onClick={() => setInnerOpen(false)}>
                Controlled inner close
              </button>
            </Modal.Panel>
          </Modal>
        </Modal.Panel>
      </Modal>
    </>
  );
}

async function openFromLauncher(name: string) {
  const launcher = screen.getByRole('button', { name });
  launcher.focus();
  expect(launcher).toHaveFocus();
  fireEvent.click(launcher);
  await waitFor(() => expect(screen.getByTestId('outer-focus-panel')).toHaveFocus());
  return launcher;
}

async function openInnerModal() {
  const launcher = screen.getByRole('button', { name: 'Inner launcher' });
  launcher.focus();
  expect(launcher).toHaveFocus();
  fireEvent.click(launcher);
  await waitFor(() => expect(screen.getByTestId('inner-focus-panel')).toHaveFocus());
  return launcher;
}

function escapeFocusedElement() {
  expect(document.activeElement).not.toBe(document.body);
  fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' });
}

describe('Modal', () => {
  it.each([
    { closeMethod: 'Escape', strictMode: false },
    { closeMethod: 'controlled', strictMode: false },
    { closeMethod: 'Escape', strictMode: true },
    { closeMethod: 'controlled', strictMode: true },
  ])(
    'restores nested then original launcher focus after $closeMethod inner close (StrictMode: $strictMode)',
    async ({ closeMethod, strictMode }) => {
      render(
        strictMode ? (
          <StrictMode>
            <FocusRestorationFixture />
          </StrictMode>
        ) : (
          <FocusRestorationFixture />
        ),
      );
      const outerLauncher = await openFromLauncher('First launcher');
      const innerLauncher = await openInnerModal();

      if (closeMethod === 'Escape') {
        escapeFocusedElement();
      } else {
        const close = screen.getByRole('button', { name: 'Controlled inner close' });
        close.focus();
        fireEvent.click(close);
      }

      await waitFor(() => expect(innerLauncher).toHaveFocus());
      expect(screen.queryByTestId('inner-focus-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('outer-focus-panel')).toBeInTheDocument();
      escapeFocusedElement();
      await waitFor(() => expect(outerLauncher).toHaveFocus());
      expect(screen.queryByTestId('outer-focus-panel')).not.toBeInTheDocument();
    },
  );
  it.each([false, true])(
    'keeps the original target on rerender and refreshes it on reopen (StrictMode: %s)',
    async (strictMode) => {
      function fixture(revision: number) {
        const content = <FocusRestorationFixture revision={revision} />;
        return strictMode ? <StrictMode>{content}</StrictMode> : content;
      }

      const { rerender } = render(fixture(0));
      const firstLauncher = await openFromLauncher('First launcher');
      const innerLauncher = screen.getByRole('button', { name: 'Inner launcher' });
      innerLauncher.focus();
      expect(innerLauncher).toHaveFocus();
      rerender(fixture(1));
      expect(screen.getByText('Revision 1')).toBeInTheDocument();
      expect(innerLauncher).toHaveFocus();
      escapeFocusedElement();
      await waitFor(() => expect(firstLauncher).toHaveFocus());

      const secondLauncher = await openFromLauncher('Second launcher');
      escapeFocusedElement();
      await waitFor(() => expect(secondLauncher).toHaveFocus());
      expect(firstLauncher).not.toHaveFocus();
    },
  );

  it('renders nothing when open is false', () => {
    renderModal({ open: false });

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
  });

  it('renders portal content when open is true', () => {
    renderModal({ open: true });

    expect(screen.getByTestId('panel')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('calls onClose when clicking Backdrop', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.click(screen.getByTestId('backdrop'));

    expect(onClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps closing Backdrop when consumer onClick is provided', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" onClick={onClick} />
        <Modal.Panel>
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('backdrop'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close Backdrop when consumer onClick prevents default', () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop
          data-testid="backdrop"
          onClick={(event) => {
            event.preventDefault();
          }}
        />
        <Modal.Panel>
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('backdrop'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('isolates nested portal Escape and lets the outer modal close after the inner unmounts', () => {
    const calls: string[] = [];
    const onInnerClose = vi.fn(() => calls.push('inner close'));
    const onOuterClose = vi.fn();
    const onOuterKeyDown = vi.fn();
    const onInnerKeyDown = vi.fn(() => calls.push('inner keydown'));

    function nestedModals(innerOpen: boolean) {
      return (
        <Modal open={true} onClose={onOuterClose}>
          <Modal.Panel aria-label="Outer" data-testid="outer-panel" onKeyDown={onOuterKeyDown}>
            <Modal open={innerOpen} onClose={onInnerClose}>
              <Modal.Panel aria-label="Inner" data-testid="inner-panel" onKeyDown={onInnerKeyDown}>
                <button type="button">Inner action</button>
              </Modal.Panel>
            </Modal>
          </Modal.Panel>
        </Modal>
      );
    }

    const { rerender } = render(nestedModals(true));
    const outerPanel = screen.getByTestId('outer-panel');
    const innerPanel = screen.getByTestId('inner-panel');

    expect(outerPanel).not.toContainElement(innerPanel);
    expect(outerPanel.closest('[data-modal-portal]')).not.toBe(
      innerPanel.closest('[data-modal-portal]'),
    );

    fireEvent.keyDown(screen.getByRole('button', { name: 'Inner action', hidden: true }), {
      key: 'Escape',
    });

    expect(onInnerKeyDown).toHaveBeenCalledTimes(1);
    expect(onInnerClose).toHaveBeenCalledTimes(1);
    expect(calls).toEqual(['inner keydown', 'inner close']);
    expect(onOuterClose).not.toHaveBeenCalled();
    expect(onOuterKeyDown).not.toHaveBeenCalled();

    rerender(nestedModals(false));
    expect(screen.queryByTestId('inner-panel')).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId('outer-panel'), { key: 'Escape' });

    expect(onOuterKeyDown).toHaveBeenCalledTimes(1);
    expect(onOuterClose).toHaveBeenCalledTimes(1);
    expect(onInnerClose).toHaveBeenCalledTimes(1);
  });

  it('composes consumer keydown before close and preserves non-Escape propagation', () => {
    const calls: string[] = [];
    const onClose = vi.fn(() => calls.push('close'));
    const onParentKeyDown = vi.fn();
    const onKeyDown = vi.fn(() => calls.push('consumer'));

    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Panel aria-label="Parent composition" onKeyDown={onParentKeyDown}>
          <Modal open={true} onClose={onClose}>
            <Modal.Panel aria-label="Composition" data-testid="panel" onKeyDown={onKeyDown} />
          </Modal>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(calls).toEqual(['consumer']);

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Escape' });

    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(calls).toEqual(['consumer', 'consumer', 'close']);
  });

  it('preserves canceled Escape propagation without closing either nested modal', () => {
    const onClose = vi.fn();
    const onOuterClose = vi.fn();
    const onOuterKeyDown = vi.fn();
    const onConsumerKeyDown = vi.fn();

    render(
      <Modal open={true} onClose={onOuterClose}>
        <Modal.Panel aria-label="Outer" onKeyDown={onOuterKeyDown}>
          <Modal open={true} onClose={onClose}>
            <Modal.Panel
              data-testid="panel"
              onKeyDown={(event) => {
                onConsumerKeyDown();
                if (event.key === 'Escape') {
                  event.preventDefault();
                }
              }}>
              <Modal.Title>Dialog heading</Modal.Title>
            </Modal.Panel>
          </Modal>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Escape' });

    expect(onConsumerKeyDown).toHaveBeenCalledTimes(1);
    expect(onOuterKeyDown).toHaveBeenCalledTimes(1);
    expect(onOuterKeyDown.mock.calls[0][0].defaultPrevented).toBe(true);
    expect(onClose).not.toHaveBeenCalled();
    expect(onOuterClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape from a focused child', () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop />
        <Modal.Panel>
          <Modal.Title>Escape child</Modal.Title>
          <button type="button">Close from child</button>
        </Modal.Panel>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('button', { name: 'Close from child' }), { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when clicking inside Panel', () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    fireEvent.click(screen.getByTestId('panel'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('sets role="dialog" and aria-modal="true" on Panel', () => {
    renderModal();

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveAttribute('role', 'dialog');
    expect(panel).toHaveAttribute('aria-modal', 'true');
  });

  it('protects Panel structural dialog attributes from consumer props', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Backdrop />
        <Modal.Panel role="region" aria-modal={false} tabIndex={0} data-testid="panel">
          <Modal.Title>Dialog heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveAttribute('role', 'dialog');
    expect(panel).toHaveAttribute('aria-modal', 'true');
    expect(panel).toHaveAttribute('tabIndex', '-1');
  });

  it('Panel has aria-labelledby that matches Title id', () => {
    renderModal();

    const panel = screen.getByTestId('panel');
    const title = screen.getByText('Dialog heading');

    expect(panel).toHaveAttribute('aria-labelledby');
    expect(title).toHaveAttribute('id', panel.getAttribute('aria-labelledby'));
  });

  it('allows Panel to use aria-label without Modal.Title', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Backdrop />
        <Modal.Panel aria-label="Settings" data-testid="panel">
          <p>Settings content</p>
        </Modal.Panel>
      </Modal>,
    );

    const panel = screen.getByRole('dialog', { name: 'Settings' });

    expect(panel).toHaveAttribute('aria-label', 'Settings');
    expect(panel).not.toHaveAttribute('aria-labelledby');
  });

  it('allows Panel to use consumer-provided aria-labelledby', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Backdrop />
        <Modal.Panel aria-labelledby="custom-title" data-testid="panel">
          <h2 id="custom-title">Custom title</h2>
          <p>Dialog content</p>
        </Modal.Panel>
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Custom title' })).toHaveAttribute(
      'aria-labelledby',
      'custom-title',
    );
  });

  it('Title renders as h2', () => {
    renderModal();

    const title = screen.getByText('Dialog heading');

    expect(title.tagName).toBe('H2');
  });

  it('moves focus to Panel on open', async () => {
    renderModal({ open: true });

    await waitFor(() => expect(screen.getByTestId('panel')).toHaveFocus());
  });

  it('restores focus to previously focused element on close', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    const onClose = vi.fn();

    const { rerender } = render(
      <Modal open={true} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    await waitFor(() => expect(screen.getByTestId('panel')).toHaveFocus());

    rerender(
      <Modal open={false} onClose={onClose}>
        <Modal.Backdrop data-testid="backdrop" />
        <Modal.Panel data-testid="panel">
          <Modal.Title>Heading</Modal.Title>
        </Modal.Panel>
      </Modal>,
    );

    await waitFor(() => expect(trigger).toHaveFocus());

    document.body.removeChild(trigger);
  });

  describe('Focus Trap', () => {
    it('isolates outside content while the modal is open', async () => {
      const outside = document.createElement('button');
      outside.textContent = 'Outside';
      document.body.appendChild(outside);

      const { rerender } = render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Trap test</Modal.Title>
            <button type="button" data-testid="btn-a">
              A
            </button>
            <button type="button" data-testid="btn-b">
              B
            </button>
            <button type="button" data-testid="btn-c">
              C
            </button>
          </Modal.Panel>
        </Modal>,
      );

      const panel = screen.getByTestId('panel');

      await waitFor(() => expect(panel).toHaveFocus());
      fireEvent.keyDown(panel, { key: 'Tab', shiftKey: false });

      expect(outside).toHaveAttribute('aria-hidden', 'true');
      expect(outside).not.toHaveFocus();

      rerender(
        <Modal open={false} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Trap test</Modal.Title>
          </Modal.Panel>
        </Modal>,
      );

      await waitFor(() => expect(outside).not.toHaveAttribute('aria-hidden'));

      document.body.removeChild(outside);
    });

    it('Tab with no focusable elements inside does not throw', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>No interactives</Modal.Title>
            <p>Just text, nothing focusable.</p>
          </Modal.Panel>
        </Modal>,
      );

      const panel = screen.getByTestId('panel');
      panel.focus();

      expect(() => {
        fireEvent.keyDown(panel, { key: 'Tab', shiftKey: false });
      }).not.toThrow();

      expect(screen.getByTestId('panel')).toBeInTheDocument();
    });
  });

  describe('Initial Focus', () => {
    it('focuses the [data-autofocus] element when the modal opens', async () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Autofocus test</Modal.Title>
            <button type="button">Secondary</button>
            <button type="button" data-autofocus data-testid="primary">
              Primary action
            </button>
          </Modal.Panel>
        </Modal>,
      );

      await waitFor(() => expect(screen.getByTestId('primary')).toHaveFocus());
    });

    it('falls back to focusing the panel when no [data-autofocus] is present', async () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Backdrop />
          <Modal.Panel data-testid="panel">
            <Modal.Title>Fallback focus test</Modal.Title>
            <p>No interactive elements with autofocus.</p>
          </Modal.Panel>
        </Modal>,
      );

      await waitFor(() => expect(screen.getByTestId('panel')).toHaveFocus());
    });
  });

  describe('Scroll lock', () => {
    it('keeps document scroll locked until every open modal closes', () => {
      const previousOverflow = document.documentElement.style.overflow;

      const { rerender } = render(
        <>
          <Modal open={true} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>First modal</Modal.Title>
            </Modal.Panel>
          </Modal>
          <Modal open={true} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Second modal</Modal.Title>
            </Modal.Panel>
          </Modal>
        </>,
      );

      expect(document.documentElement.style.overflow).toBe('hidden');

      rerender(
        <>
          <Modal open={false} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>First modal</Modal.Title>
            </Modal.Panel>
          </Modal>
          <Modal open={true} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Second modal</Modal.Title>
            </Modal.Panel>
          </Modal>
        </>,
      );

      expect(document.documentElement.style.overflow).toBe('hidden');

      rerender(
        <>
          <Modal open={false} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>First modal</Modal.Title>
            </Modal.Panel>
          </Modal>
          <Modal open={false} onClose={vi.fn()}>
            <Modal.Backdrop />
            <Modal.Panel>
              <Modal.Title>Second modal</Modal.Title>
            </Modal.Panel>
          </Modal>
        </>,
      );

      expect(document.documentElement.style.overflow).toBe(previousOverflow);
    });
  });
});
