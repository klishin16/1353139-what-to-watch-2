import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { AddReviewForm } from './add-review-form.tsx';

describe('Component Add review form', () => {
  it('Should render correctly', () => {
    const componentWithHistory = withHistory(<AddReviewForm movieId={'test'} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByText(/Rating/i).length).toBe(10);
  });
});
