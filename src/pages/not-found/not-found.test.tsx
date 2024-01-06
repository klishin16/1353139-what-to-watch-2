import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component.tsx';
import NotFoundPage from './not-found.tsx';

describe('Page Not found', () => {
  it('Should render correctly', () => {
    const expectedText = '404. Page not found';
    const preparedComponent = withHistory(<NotFoundPage />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
