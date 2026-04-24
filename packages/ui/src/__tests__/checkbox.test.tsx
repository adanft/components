import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from '../index';

describe('Checkbox', () => {
  it('renders input with type="checkbox"', () => {
    render(<Checkbox aria-label="Accept terms" onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('renders with label and wires htmlFor correctly', () => {
    render(<Checkbox label="Accept terms" id="terms" onChange={() => {}} />);

    const checkbox = screen.getByLabelText('Accept terms');
    const label = screen.getByText('Accept terms').closest('label');

    expect(checkbox).toHaveAttribute('id', 'terms');
    expect(label).toBeInTheDocument();
  });

  it('renders without label element when label prop is omitted', () => {
    const { container } = render(<Checkbox aria-label="Accept terms" onChange={() => {}} />);

    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('auto-generates id and shares it between label and input', () => {
    render(<Checkbox label="Remember me" onChange={() => {}} />);

    const checkbox = screen.getByLabelText('Remember me');
    const label = screen.getByText('Remember me').closest('label');

    expect(checkbox).toHaveAttribute('id');
    expect(label).toBeInTheDocument();
  });

  it('uses custom id for both label and input', () => {
    render(<Checkbox label="Remember me" id="remember" onChange={() => {}} />);

    const checkbox = screen.getByLabelText('Remember me');
    const label = screen.getByText('Remember me').closest('label');

    expect(checkbox).toHaveAttribute('id', 'remember');
    expect(label).toBeInTheDocument();
  });

  it('passes disabled prop through to input', () => {
    render(<Checkbox aria-label="Disabled option" disabled onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Disabled option' });

    expect(checkbox).toBeDisabled();
  });

  it('passes checked prop through to input', () => {
    render(<Checkbox aria-label="Checked option" checked onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Checked option' });

    expect(checkbox).toBeChecked();
  });

  it('fires onChange when clicked', () => {
    const onChange = vi.fn();

    render(<Checkbox aria-label="Subscribe" onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Subscribe' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('passes extra props like aria-label and data-testid to input', () => {
    render(<Checkbox aria-label="Custom checkbox" data-testid="my-checkbox" onChange={() => {}} />);

    const checkbox = screen.getByTestId('my-checkbox');

    expect(checkbox).toHaveAttribute('aria-label', 'Custom checkbox');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('labelPosition="right" (default) renders wrapper with flex-row class', () => {
    const { container } = render(
      <Checkbox label="Right label" labelPosition="right" onChange={() => {}} />,
    );

    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('labelPosition="left" renders wrapper with flex-row-reverse class', () => {
    const { container } = render(
      <Checkbox label="Left label" labelPosition="left" onChange={() => {}} />,
    );

    expect(container.firstChild).toHaveClass('flex-row-reverse');
  });

  it('labelPosition="top" renders wrapper with flex-col-reverse class', () => {
    const { container } = render(
      <Checkbox label="Top label" labelPosition="top" onChange={() => {}} />,
    );

    expect(container.firstChild).toHaveClass('flex-col-reverse');
  });

  it('labelPosition="bottom" renders wrapper with flex-col class', () => {
    const { container } = render(
      <Checkbox label="Bottom label" labelPosition="bottom" onChange={() => {}} />,
    );

    expect(container.firstChild).toHaveClass('flex-col');
  });
});
