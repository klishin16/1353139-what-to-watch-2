import { describe, expect } from 'vitest';
import { IGenre, IMovie } from '../../types';
import * as faker from 'faker';
import {
  changeGenre,
  IMoviesSliceState,
  moviesSlice,
  setAllMovies,
  setFavoriteMovies,
  setLoading
} from './movies.slice.ts';
import { makeFakeMovie, makeFakeMovies } from '../../utils/mocks.ts';
import { changeMovieFavoriteStatusAction, fetchAllMoviesAction } from '../api-actions/api-actions.ts';

describe('Movies slice', () => {
  const baseState: IMoviesSliceState = {
    movies: [],
    favoriteMovies: null,
    allMovies: [],
    totalMovies: 0,
    loadedMovies: 0,
    isLoading: true,
    genres: [],
    selectedGenre: {
      id: -1,
      title: 'All genres'
    }
  };

  it('should return initial state with emply action', () => {
    const emptyAction = { type: '' };
    const initialState: IMoviesSliceState = { ...baseState };

    const result = moviesSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: IMoviesSliceState = { ...baseState };

    const result = moviesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change gender', () => {
    const genre: IGenre = {
      id: 1,
      title: faker.name.title()
    };
    const initialState: IMoviesSliceState = { ...baseState };
    const expectedState: IMoviesSliceState = {
      ...baseState,
      selectedGenre: genre
    };

    const result = moviesSlice.reducer(initialState, changeGenre(genre));

    expect(result).toEqual(expectedState);
  });

  it('should set all movies', () => {
    const movies = makeFakeMovies();
    const initialState: IMoviesSliceState = { ...baseState };

    const expectedState: IMoviesSliceState = {
      ...baseState,
      allMovies: movies
    };

    const result = moviesSlice.reducer(initialState, setAllMovies(movies));

    expect(result).toEqual(expectedState);
  });

  it('should set loading', () => {
    const initialState: IMoviesSliceState = { ...baseState };

    const expectedState: IMoviesSliceState = {
      ...baseState,
      isLoading: false
    };

    const result = moviesSlice.reducer(initialState, setLoading(false));

    expect(result).toEqual(expectedState);
  });

  it('should set favorite movies', () => {
    const movies = makeFakeMovies();
    const initialState: IMoviesSliceState = { ...baseState };

    const expectedState: IMoviesSliceState = {
      ...baseState,
      favoriteMovies: movies
    };

    const result = moviesSlice.reducer(initialState, setFavoriteMovies(movies));

    expect(result).toEqual(expectedState);
  });

  it('should set genres when movies loaded', () => {
    const movies: IMovie[] = [
      {
        ...makeFakeMovie(),
        genre: 'Comedy'
      },
      {
        ...makeFakeMovie(),
        genre: 'Fantasy'
      }
    ];
    const initialState: IMoviesSliceState = { ...baseState };
    const expectedState: IMoviesSliceState = {
      ...baseState,
      genres: [{ id: -1, title: 'All genres' }, { id: 0, title: 'Comedy' }, { id: 1, title: 'Fantasy' }]
    };

    const result = moviesSlice.reducer(initialState, fetchAllMoviesAction.fulfilled(movies, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set genres when movies loaded', () => {
    const movie = makeFakeMovie();
    const initialState: IMoviesSliceState = { ...baseState };
    const expectedState: IMoviesSliceState = {
      ...baseState,
      favoriteMovies: [movie]
    };

    const result = moviesSlice.reducer(initialState, changeMovieFavoriteStatusAction.fulfilled({ movie, status: true }, '', { movie, status: true }));

    expect(result).toEqual(expectedState);
  });
});
