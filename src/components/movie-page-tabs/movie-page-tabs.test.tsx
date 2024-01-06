import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoviePageTabs } from './movie-page-tabs.tsx';
import { makeFakeDetailMovie, makeFakeReviews } from '../../utils/mocks.ts';
import { IReviewStatistics } from '../../types';

describe('Component Movies page tabs', () => {
  it('Should render correctly', () => {
    const expectedCount = 3;
    const tabsContainerTestId = 'tabs-container';
    const tabTestId = 'tab';

    const movie = makeFakeDetailMovie();
    const reviews = makeFakeReviews();
    const reviewsStatistics: IReviewStatistics = {
      totalReviews: 5,
      averageRating: 7.0
    };

    render(<MoviePageTabs movie={movie} reviews={reviews} reviewsStatistics={reviewsStatistics} />);

    const tabs = screen.getAllByTestId(tabTestId);
    expect(screen.getByTestId(tabsContainerTestId)).toBeInTheDocument();
    expect(tabs.length).toBe(expectedCount);
  });
});
