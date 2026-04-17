import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

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
    render(
      <Select aria-label="Plan" defaultValue="starter">
        <option value="starter">Starter</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveValue('starter');
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

  it('passes disabled through to the native control', () => {
    render(
      <Select aria-label="Disabled plan" disabled defaultValue="starter">
        <option value="starter">Starter</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Disabled plan' })).toBeDisabled();
  });
});
