import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './loader.tsx';

describe('Component Loader', () => {
  it('Should render correctly', () => {
    const expectedTestId = 'loading-spinner';

    render(<Loader />);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
