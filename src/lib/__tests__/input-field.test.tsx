import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InputField } from '../index';
import type { InputFieldProps } from '../index';

const validInputFieldProps: InputFieldProps = {
  id: 'email',
  label: 'Email',
  className: 'mt-2',
};
void validInputFieldProps;
const invalidLabelClassElement = (
  // @ts-expect-error label class overrides are intentionally not supported.
  <InputField id="email" label="Email" labelClassName="text-red-500" />
);
void invalidLabelClassElement;

describe('InputField', () => {
  it('renders label and input with placeholder', () => {
    render(<InputField label="Email" id="email" placeholder="name@example.com" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
  });

  it('associates label with input by id', () => {
    render(<InputField label="Username" id="username" />);

    const input = screen.getByLabelText('Username');

    expect(input).toHaveAttribute('id', 'username');
  });

  it('passes through native input props', () => {
    render(
      <InputField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        name="password"
        required
        data-testid="password-input"
      />,
    );

    const input = screen.getByTestId('password-input');

    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('autocomplete', 'current-password');
    expect(input).toHaveAttribute('name', 'password');
    expect(input).toBeRequired();
  });

  it('applies default accessibility and visual classes', () => {
    render(<InputField label="First name" id="first-name" placeholder="Jane" />);

    const input = screen.getByLabelText('First name');
    const label = screen.getByText('First name');

    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('ui-radius-sm');
    expect(input).toHaveClass('placeholder:text-[14px]');
    expect(input).toHaveClass('focus-visible:outline-1');
    expect(label).toHaveClass('ui-group-focus-text-brand');
    expect(label.parentElement).toHaveClass('grow');
  });

  it('applies custom classes only to the container wrapper', () => {
    render(<InputField label="City" id="city" className="mt-4" />);

    const input = screen.getByLabelText('City');
    const label = screen.getByText('City');

    expect(label.parentElement).toHaveClass('mt-4');
    expect(input).not.toHaveClass('mt-4');
    expect(label).not.toHaveClass('mt-4');
  });
});
