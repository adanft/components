import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Field, Input, Label, RadioGroup, Select } from '../index';

describe('Field', () => {
  it('groups explicit label, description, error, and text input props', () => {
    render(
      <Field invalid required>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          aria-invalid="true"
          aria-describedby="email-description email-error"
          aria-errormessage="email-error"
        />
        <Field.Description id="email-description">We never share your email.</Field.Description>
        <Field.Error id="email-error">Email is required.</Field.Error>
      </Field>,
    );

    const input = screen.getByLabelText('Email');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-description email-error');
    expect(input).toHaveAttribute('aria-errormessage', 'email-error');
    expect(screen.getByText('Email is required.')).toHaveAttribute('role', 'alert');
  });

  it('supports native Select associations through explicit native props', () => {
    render(
      <Field>
        <Label htmlFor="plan">Plan</Label>
        <Select id="plan" defaultValue="starter" aria-describedby="plan-description">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </Select>
        <Field.Description id="plan-description">Choose a plan.</Field.Description>
      </Field>,
    );

    expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveAttribute(
      'aria-describedby',
      'plan-description',
    );
  });

  it('does not set aria-describedby when no description or error exists', () => {
    render(
      <Field>
        <Label htmlFor="nickname">Nickname</Label>
        <Input id="nickname" />
      </Field>,
    );

    expect(screen.getByLabelText('Nickname')).not.toHaveAttribute('aria-describedby');
  });

  it('renders unique error messages from an errors collection', () => {
    render(
      <Field.Error
        errors={[
          { message: 'Email is required.' },
          { message: 'Email is required.' },
          { message: 'Email must be valid.' },
          undefined,
        ]}
      />,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Email must be valid.')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('does not render Field.Error without children or error messages', () => {
    const { container } = render(<Field.Error errors={[undefined, {}]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('supports grouped controls with Field.Set and Field.Legend', () => {
    const { container } = render(
      <Field.Set invalid required aria-describedby="plan-description plan-error">
        <Field.Legend>Plan</Field.Legend>
        <Field.Description id="plan-description">Choose one option.</Field.Description>
        <RadioGroup value="starter" onValueChange={() => undefined}>
          <RadioGroup.Item value="starter" label="Starter" />
          <RadioGroup.Item value="pro" label="Pro" />
        </RadioGroup>
        <Field.Error id="plan-error">You must choose a plan.</Field.Error>
      </Field.Set>,
    );

    const fieldset = container.querySelector('fieldset');

    expect(screen.getByText(/Plan/)).toBeInTheDocument();
    expect(fieldset).toHaveAttribute('aria-describedby', 'plan-description plan-error');
    expect(screen.getByText('You must choose a plan.')).toHaveAttribute('id', 'plan-error');
  });
});
