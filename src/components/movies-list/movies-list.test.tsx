import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeMovies } from '../../utils/mocks.ts';
import { MoviesList } from './movies-list.tsx';
import { withHistory } from '../../utils/mock-component.tsx';

describe('Component Movies list', () => {
  it('Should render correctly', () => {
    const expectedCount = 5;
    const moviesListContainerTestId = 'movies-list';
    const movieCardTestId = 'movie-card';
    const movies = makeFakeMovies(expectedCount);
    const preparedComponent = withHistory(<MoviesList movies={movies} />);

    render(preparedComponent);

    const moviesCards = screen.getAllByTestId(movieCardTestId);
    expect(screen.getByTestId(moviesListContainerTestId)).toBeInTheDocument();
    expect(moviesCards.length).toBe(expectedCount);
  });
});
