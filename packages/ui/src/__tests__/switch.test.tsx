import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from '../index';

function SwitchHarness() {
  const [checked, setChecked] = useState(false);

  return <Switch checked={checked} label="Dark mode" onCheckedChange={setChecked} />;
}

describe('Switch', () => {
  it('renders as a switch role', () => {
    render(<Switch checked={false} aria-label="Airplane mode" onCheckedChange={() => undefined} />);

    expect(screen.getByRole('switch', { name: 'Airplane mode' })).toHaveAttribute(
      'type',
      'checkbox',
    );
  });

  it('wires label text to the control', () => {
    render(<Switch checked={false} label="Notifications" onCheckedChange={() => undefined} />);

    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('calls onCheckedChange with the next checked state', () => {
    const onCheckedChange = vi.fn();

    render(<Switch checked={false} aria-label="Dark mode" onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole('switch', { name: 'Dark mode' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('supports controlled state updates', () => {
    render(<SwitchHarness />);

    const control = screen.getByRole('switch', { name: 'Dark mode' });
    expect(control).not.toBeChecked();

    fireEvent.click(control);

    expect(screen.getByRole('switch', { name: 'Dark mode' })).toBeChecked();
  });

  it('passes disabled through to the control', () => {
    render(
      <Switch
        checked={false}
        aria-label="Disabled switch"
        disabled
        onCheckedChange={() => undefined}
      />,
    );

    expect(screen.getByRole('switch', { name: 'Disabled switch' })).toBeDisabled();
  });

  it('labelPosition="left" renders wrapper with flex-row-reverse class', () => {
    const { container } = render(
      <Switch
        checked={false}
        label="Left label"
        labelPosition="left"
        onCheckedChange={() => undefined}
      />,
    );

    expect(container.firstChild).toHaveClass('flex-row-reverse');
  });

  it('labelPosition="top" renders wrapper with flex-col-reverse class', () => {
    const { container } = render(
      <Switch
        checked={false}
        label="Top label"
        labelPosition="top"
        onCheckedChange={() => undefined}
      />,
    );

    expect(container.firstChild).toHaveClass('flex-col-reverse');
  });

  it('labelPosition="bottom" renders wrapper with flex-col class', () => {
    const { container } = render(
      <Switch
        checked={false}
        label="Bottom label"
        labelPosition="bottom"
        onCheckedChange={() => undefined}
      />,
    );

    expect(container.firstChild).toHaveClass('flex-col');
  });
});
