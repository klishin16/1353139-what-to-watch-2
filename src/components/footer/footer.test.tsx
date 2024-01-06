import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer.tsx';
import { withHistory } from '../../utils/mock-component.tsx';

describe('Component Footer', () => {
  it('Should render correctly', () => {
    const expectedText = '© 2019 What to watch Ltd.';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
