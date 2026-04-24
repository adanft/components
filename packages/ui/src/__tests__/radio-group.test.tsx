import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup } from '../index';

function RadioGroupHarness() {
  const [value, setValue] = useState('starter');

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <RadioGroup.Item value="starter" label="Starter" />
      <RadioGroup.Item value="pro" label="Pro" />
      <RadioGroup.Item value="enterprise" label="Enterprise" />
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('renders a radiogroup with radio items', () => {
    render(
      <RadioGroup value="starter" onValueChange={() => undefined}>
        <RadioGroup.Item value="starter" label="Starter" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Starter' })).toBeChecked();
  });

  it('calls onValueChange when another item is selected', () => {
    const onValueChange = vi.fn();

    render(
      <RadioGroup value="starter" onValueChange={onValueChange}>
        <RadioGroup.Item value="starter" label="Starter" />
        <RadioGroup.Item value="pro" label="Pro" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Pro' }));

    expect(onValueChange).toHaveBeenCalledWith('pro');
  });

  it('supports controlled updates', () => {
    render(<RadioGroupHarness />);

    expect(screen.getByRole('radio', { name: 'Starter' })).toBeChecked();

    fireEvent.click(screen.getByRole('radio', { name: 'Pro' }));

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  it('passes disabled state to items', () => {
    render(
      <RadioGroup value="starter" onValueChange={() => undefined} disabled>
        <RadioGroup.Item value="starter" label="Starter" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Starter' })).toBeDisabled();
  });

  it('supports labelPosition="left"', () => {
    const { container } = render(
      <RadioGroup value="starter" onValueChange={() => undefined} labelPosition="left">
        <RadioGroup.Item value="starter" label="Starter" />
      </RadioGroup>,
    );

    expect(container.querySelector('label')).toHaveClass('flex-row-reverse');
  });

  it('supports labelPosition="top"', () => {
    const { container } = render(
      <RadioGroup value="starter" onValueChange={() => undefined} labelPosition="top">
        <RadioGroup.Item value="starter" label="Starter" />
      </RadioGroup>,
    );

    expect(container.querySelector('label')).toHaveClass('flex-col-reverse');
  });

  it('supports labelPosition="bottom"', () => {
    const { container } = render(
      <RadioGroup value="starter" onValueChange={() => undefined} labelPosition="bottom">
        <RadioGroup.Item value="starter" label="Starter" />
      </RadioGroup>,
    );

    expect(container.querySelector('label')).toHaveClass('flex-col');
  });
});
