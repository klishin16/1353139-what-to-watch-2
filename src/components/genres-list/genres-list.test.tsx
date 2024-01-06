import { GenresList } from './genres-list.tsx';
import { withStore } from '../../utils/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import { makeFakeGenres } from '../../utils/mocks.ts';

describe('Component Genres list', () => {
  it('Should render correctly', () => {
    const genres = makeFakeGenres();
    const selectedGenre = genres[0];
    const expectedText = selectedGenre.title;
    const { withStoreComponent } = withStore(<GenresList />, { movies: { genres, selectedGenre, movies: [], favoriteMovies: null, allMovies: [], loadedMovies: 0, totalMovies: 0, isLoading: false } });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
