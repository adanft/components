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
  <InputField id="email" label="Email" labelClassName="text-danger" />
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
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('px-2.5');
    expect(input).toHaveClass('placeholder:text-sm');
    expect(input).toHaveClass('focus-visible:border-brand');
    expect(label).toHaveClass('group-focus-within:text-brand');
    expect(label.parentElement).not.toHaveClass('grow');
  });

  it('applies custom classes only to the container wrapper', () => {
    render(<InputField label="City" id="city" className="mt-4" />);

    const input = screen.getByLabelText('City');
    const label = screen.getByText('City');

    expect(label.parentElement).toHaveClass('mt-4');
    expect(input).not.toHaveClass('mt-4');
    expect(label).not.toHaveClass('mt-4');
  });

  it('shows red border and label when error is true', () => {
    render(<InputField label="Email" id="email" error />);

    const input = screen.getByLabelText('Email');
    const label = screen.getByText('Email');

    expect(input).toHaveClass('border-danger');
    expect(input).toHaveClass('focus-visible:border-danger');
    expect(input).toHaveClass('focus-visible:outline-danger');
    expect(input).not.toHaveClass('focus-visible:border-brand');
    expect(label).toHaveClass('text-danger');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows red border and error message when error is a string', () => {
    render(<InputField label="Email" id="email" error="Required field" />);

    const input = screen.getByLabelText('Email');
    const errorMessage = screen.getByRole('alert');

    expect(input).toHaveClass('border-danger');
    expect(input).toHaveClass('focus-visible:border-danger');
    expect(input).toHaveClass('focus-visible:outline-danger');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(errorMessage).toHaveTextContent('Required field');
    expect(errorMessage).toHaveAttribute('id', 'email-error');
    expect(errorMessage).toHaveClass('text-danger');
  });

  it('shows normal state when error is false', () => {
    render(<InputField label="Email" id="email" error={false} />);

    const input = screen.getByLabelText('Email');

    expect(input).not.toHaveClass('border-danger');
    expect(input).toHaveClass('focus-visible:border-brand');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows normal state when error prop is omitted', () => {
    render(<InputField label="Email" id="email" />);

    const input = screen.getByLabelText('Email');
    const label = screen.getByText('Email');

    expect(label).toHaveClass('group-focus-within:text-brand');
    expect(label).not.toHaveClass('text-danger');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('treats empty string error as no error', () => {
    render(<InputField label="Email" id="email" error="" />);

    const input = screen.getByLabelText('Email');

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).not.toHaveClass('border-danger');
    expect(input).toHaveClass('focus-visible:border-brand');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
