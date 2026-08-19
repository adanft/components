import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '../index';

function SelectHarness() {
  const [value, setValue] = useState('pro');

  return (
    <Select
      aria-label="Choose plan"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}>
      <option value="starter">Starter</option>
      <option value="pro">Pro</option>
      <option value="team">Team</option>
    </Select>
  );
}

describe('Select', () => {
  it('renders as a native select control', () => {
    const { container } = render(
      <Select aria-label="Plan" defaultValue="starter">
        <option value="starter">Starter</option>
      </Select>,
    );

    const control = screen.getByRole('combobox', { name: 'Plan' });

    expect(control).toHaveValue('starter');
    expect(control).toHaveClass(
      'w-full',
      'appearance-none',
      'rounded-md',
      'border',
      'border-border',
      'bg-background',
      'px-3',
      'py-2',
      'pr-10',
      'text-foreground',
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('supports controlled updates', () => {
    render(<SelectHarness />);

    const control = screen.getByRole('combobox', { name: 'Choose plan' });

    expect(control).toHaveValue('pro');

    fireEvent.change(control, { target: { value: 'team' } });

    expect(screen.getByRole('combobox', { name: 'Choose plan' })).toHaveValue('team');
  });

  it('renders a placeholder option when provided', () => {
    const { container } = render(
      <Select aria-label="Plan" value="" onChange={() => undefined} placeholder="Choose a plan">
        <option value="starter">Starter</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveValue('');
    expect(container.querySelector('option[value=""]')).toBeDisabled();
  });

  it('uses and clears the placeholder in uncontrolled mode', () => {
    const onChange = vi.fn();

    render(
      <form data-testid="plan-form">
        <Select aria-label="Plan" onChange={onChange} placeholder="Choose a plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>
      </form>,
    );

    const control = screen.getByRole('combobox', { name: 'Plan' });

    expect(control).toHaveValue('');
    expect(control).toHaveAttribute('data-ui-select-placeholder', '');
    expect(
      document.querySelector('[data-ui-select-placeholder]:has(> option[value=""]:checked)'),
    ).toBe(control);

    fireEvent.change(control, { target: { value: 'starter' } });

    expect(control).toHaveValue('starter');
    expect(
      document.querySelector('[data-ui-select-placeholder]:has(> option[value=""]:checked)'),
    ).toBeNull();
    expect(onChange).toHaveBeenCalledTimes(1);

    (screen.getByTestId('plan-form') as HTMLFormElement).reset();

    expect(control).toHaveValue('');
    expect(
      document.querySelector('[data-ui-select-placeholder]:has(> option[value=""]:checked)'),
    ).toBe(control);
  });

  it('respects explicit uncontrolled and controlled values over the placeholder', () => {
    const { unmount } = render(
      <Select aria-label="Plan" defaultValue="pro" placeholder="Choose a plan">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
    );

    const control = screen.getByRole('combobox', { name: 'Plan' });

    expect(control).toHaveValue('pro');

    unmount();

    const { rerender } = render(
      <Select aria-label="Plan" onChange={() => undefined} placeholder="Choose a plan" value="">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
    );
    const controlled = screen.getByRole('combobox', { name: 'Plan' });
    expect(controlled).toHaveValue('');

    rerender(
      <Select
        aria-label="Plan"
        onChange={() => undefined}
        placeholder="Choose a plan"
        value="starter">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
    );
    expect(controlled).toHaveValue('starter');
  });

  it('does not style a legitimate empty option as a generated placeholder', () => {
    render(
      <Select aria-label="Plan" defaultValue="">
        <option value="">No plan</option>
        <option value="starter">Starter</option>
      </Select>,
    );

    const control = screen.getByRole('combobox', { name: 'Plan' });

    expect(control).toHaveValue('');
    expect(control).not.toHaveAttribute('data-ui-select-placeholder');
  });

  it('does not create a placeholder option for a multiple select', () => {
    const { container } = render(
      <Select aria-label="Plans" className="min-h-24" multiple placeholder="Choose plans">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
    );

    const control = screen.getByRole('listbox', { name: 'Plans' }) as HTMLSelectElement;

    expect(control.querySelector('option[value=""]')).toBeNull();
    expect(control.selectedOptions).toHaveLength(0);
    expect(control).toHaveClass('min-h-24');
    expect(control).not.toHaveClass('appearance-none', 'pr-10');
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('passes disabled through to the native control', () => {
    render(
      <Select aria-label="Disabled plan" disabled defaultValue="starter">
        <option value="starter">Starter</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Disabled plan' })).toBeDisabled();
  });
});
