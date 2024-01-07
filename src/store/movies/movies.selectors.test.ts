import { MoviesSliceState } from './movies.slice.ts';
import { getFavoriteMovies, getMoviesIsLoading, getMoviesState } from './movies.selectors.ts';

describe('Movies slice selectors', () => {
  const moviesState: MoviesSliceState = {
    movies: [],
    favoriteMovies: [],
    allMovies: [],
    totalMovies: 0,
    loadedMovies: 0,
    isLoading: false,
    genres: [],
    selectedGenre: {
      id: -1,
      title: 'All'
    }
  };

  it('should return loading status', () => {
    const result = getMoviesIsLoading({ movies: moviesState });

    expect(result).toBe(false);
  });

  it('should return favorite movies', () => {

    const result = getFavoriteMovies({ movies: moviesState });

    expect(result).toStrictEqual([]);
  });


  it('should return movies state', () => {
    const result = getMoviesState({ movies: moviesState });

    expect(result).toBe(moviesState);
  });
});
