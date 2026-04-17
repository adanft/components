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

  it('notifies open state changes from trigger click and outside dismiss', () => {
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
});
