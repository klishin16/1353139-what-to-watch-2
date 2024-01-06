import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component.tsx';
import { ErrorMessage } from './error-message.tsx';

describe('Component Error message', () => {
  it('Should render correctly', () => {
    const expectedText = 'some error text';
    const { withStoreComponent } = withStore(<ErrorMessage />, { errors: { error: expectedText } });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
