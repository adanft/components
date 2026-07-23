import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Popover } from '../index';

describe('Popover', () => {
  it('rejects dialog content without an accessible name', () => {
    expect(() =>
      render(
        <Popover open={true} onOpenChange={() => undefined}>
          <Popover.Trigger>
            <button type="button">Open profile</button>
          </Popover.Trigger>
          <Popover.Content>Popover body</Popover.Content>
        </Popover>,
      ),
    ).toThrow(
      '<Popover.Content> requires aria-label or aria-labelledby when Popover uses role="dialog".',
    );
  });

  it('renders content when controlled state is open', () => {
    render(
      <Popover open={true} onOpenChange={() => undefined}>
        <Popover.Trigger>
          <button type="button">Open profile</button>
        </Popover.Trigger>
        <Popover.Content aria-label="Profile details" data-testid="popover-content">
          Popover body
        </Popover.Content>
      </Popover>,
    );

    expect(screen.getByRole('dialog', { name: 'Profile details' })).toBeInTheDocument();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('uses aria-labelledby to name dialog content', () => {
    render(
      <>
        <h2 id="account-details">Account details</h2>
        <Popover open={true} onOpenChange={() => undefined}>
          <Popover.Trigger>
            <button type="button">Open account</button>
          </Popover.Trigger>
          <Popover.Content aria-labelledby="account-details">Popover body</Popover.Content>
        </Popover>
      </>,
    );

    expect(screen.getByRole('dialog', { name: 'Account details' })).toHaveAttribute(
      'aria-labelledby',
      'account-details',
    );
  });

  it('calls onOpenChange(true) when the trigger is clicked', () => {
    const onOpenChange = vi.fn();

    render(
      <Popover open={false} onOpenChange={onOpenChange}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content aria-label="Popover details">Popover body</Popover.Content>
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Toggle popover' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('adds expanded and popup state to the trigger', () => {
    render(
      <Popover open={true} onOpenChange={() => undefined}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content aria-label="Popover details">Popover body</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: 'Toggle popover' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('omits aria-haspopup when triggerHasPopup is false', () => {
    render(
      <Popover open={false} onOpenChange={() => undefined} triggerHasPopup={false}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content aria-label="Popover details">Popover body</Popover.Content>
      </Popover>,
    );

    expect(screen.getByRole('button', { name: 'Toggle popover' })).not.toHaveAttribute(
      'aria-haspopup',
    );
  });

  it('omits the content role when contentRole is null', () => {
    render(
      <Popover open={true} onOpenChange={() => undefined} contentRole={null}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content data-testid="popover-content">Popover body</Popover.Content>
      </Popover>,
    );

    expect(screen.getByTestId('popover-content')).not.toHaveAttribute('role');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle popover' })).not.toHaveAttribute(
      'aria-haspopup',
    );
  });

  it('does not announce a dialog when contentRole is null even if triggerHasPopup is true', () => {
    render(
      <Popover
        contentRole={null}
        open={false}
        onOpenChange={() => undefined}
        triggerHasPopup={true}>
        <Popover.Trigger>
          <button type="button">Toggle supplemental content</button>
        </Popover.Trigger>
        <Popover.Content>Supplemental content</Popover.Content>
      </Popover>,
    );

    expect(screen.getByRole('button', { name: 'Toggle supplemental content' })).not.toHaveAttribute(
      'aria-haspopup',
    );
  });

  it('calls onOpenChange(false) when Escape is pressed', () => {
    const onOpenChange = vi.fn();

    render(
      <Popover open={true} onOpenChange={onOpenChange}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content aria-label="Popover details">Popover body</Popover.Content>
      </Popover>,
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
