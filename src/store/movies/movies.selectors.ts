import { State } from '../../types';

export const getMoviesIsLoading = (state: Pick<State, 'movies'>) => state.movies.isLoading;

export const getFavoriteMovies = (state: Pick<State, 'movies'>) => state.movies.favoriteMovies;

export const getMoviesState = (state: Pick<State, 'movies'>) => state.movies;
