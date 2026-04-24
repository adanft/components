import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Popover } from '../index';

describe('Popover', () => {
  it('renders content when controlled state is open', () => {
    render(
      <Popover open={true} onOpenChange={() => undefined}>
        <Popover.Trigger>
          <button type="button">Open profile</button>
        </Popover.Trigger>
        <Popover.Content data-testid="popover-content">Popover body</Popover.Content>
      </Popover>,
    );

    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('calls onOpenChange(true) when the trigger is clicked', () => {
    const onOpenChange = vi.fn();

    render(
      <Popover open={false} onOpenChange={onOpenChange}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
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
        <Popover.Content>Popover body</Popover.Content>
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
        <Popover.Content>Popover body</Popover.Content>
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
  });

  it('calls onOpenChange(false) when Escape is pressed', () => {
    const onOpenChange = vi.fn();

    render(
      <Popover open={true} onOpenChange={onOpenChange}>
        <Popover.Trigger>
          <button type="button">Toggle popover</button>
        </Popover.Trigger>
        <Popover.Content>Popover body</Popover.Content>
      </Popover>,
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
