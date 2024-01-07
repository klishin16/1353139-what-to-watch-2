import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import AddReviewPage from './add-review.tsx';

describe('Page Add review', () => {
  it('Should render correctly', () => {
    const expectedLoaderTestId = 'loading-spinner';
    const { withStoreComponent } = withStore(<AddReviewPage />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(expectedLoaderTestId)).toBeInTheDocument();
  });
});
