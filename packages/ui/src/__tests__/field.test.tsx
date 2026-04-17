import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Field, RadioGroup, Select } from '../index';

describe('Field', () => {
  it('wires label, description, and error to a text input', () => {
    render(
      <Field id="email" invalid required>
        <Field.Label>Email</Field.Label>
        <Field.Control asChild>
          <input type="email" />
        </Field.Control>
        <Field.Description>We never share your email.</Field.Description>
        <Field.Error>Email is required.</Field.Error>
      </Field>,
    );

    const input = screen.getByLabelText('Email *');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-description email-error');
    expect(input).toHaveAttribute('aria-errormessage', 'email-error');
  });

  it('works with the native Select wrapper through Field.Control', () => {
    render(
      <Field id="plan">
        <Field.Label>Plan</Field.Label>
        <Field.Control asChild>
          <Select defaultValue="starter">
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
          </Select>
        </Field.Control>
        <Field.Description>Choose a plan.</Field.Description>
      </Field>,
    );

    expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveAttribute(
      'aria-describedby',
      'plan-description',
    );
  });

  it('does not set aria-describedby when no description or error exists', () => {
    render(
      <Field id="nickname">
        <Field.Label>Nickname</Field.Label>
        <Field.Control asChild>
          <input type="text" />
        </Field.Control>
      </Field>,
    );

    expect(screen.getByLabelText('Nickname')).not.toHaveAttribute('aria-describedby');
  });

  it('supports grouped controls with Field.Set and Field.Legend', () => {
    const { container } = render(
      <Field.Set invalid required>
        <Field.Legend>Plan</Field.Legend>
        <Field.Description>Choose one option.</Field.Description>
        <RadioGroup value="starter" onValueChange={() => undefined}>
          <RadioGroup.Item value="starter" label="Starter" />
          <RadioGroup.Item value="pro" label="Pro" />
        </RadioGroup>
        <Field.Error>You must choose a plan.</Field.Error>
      </Field.Set>,
    );

    const fieldset = container.querySelector('fieldset');

    expect(screen.getByText(/Plan/)).toBeInTheDocument();
    expect(fieldset).toHaveAttribute('aria-describedby');
    expect(screen.getByText('You must choose a plan.')).toHaveAttribute('id');
  });
});
