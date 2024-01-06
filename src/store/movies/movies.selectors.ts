import { IState } from '../../types';

export const getMoviesIsLoading = (state: Pick<IState, 'movies'>) => state.movies.isLoading;

export const getFavoriteMovies = (state: Pick<IState, 'movies'>) => state.movies.favoriteMovies;

export const getMoviesState = (state: Pick<IState, 'movies'>) => state.movies;
