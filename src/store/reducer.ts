import { createReducer } from '@reduxjs/toolkit';
import { IGenre, IMovie, IUser } from '../types';
import {
  changeGenre,
  getMovies,
  loadAllMovies,
  setAuthorizationStatus,
  setError,
  setLoading, setUser,
  showMoreMovies
} from './action.ts';
import { EAuthorizationStatus, MOVIES_BY_PAGE } from '../constants.ts';

interface IState {
  genre: IGenre;
  allMovies: IMovie[];
  movies: IMovie[];
  totalMovies: number;
  loadedMovies: number;
  isLoading: boolean;
  authorizationStatus: EAuthorizationStatus;
  user: IUser | null;
  error: string | null;
}

const initialState: IState = {
  genre: { id: -1, title: 'All genres' },
  allMovies: [],
  movies: [],
  totalMovies: 0,
  loadedMovies: 0,
  isLoading: true,
  authorizationStatus: EAuthorizationStatus.UNKNOWN,
  user: null,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getMovies, (state) => {
      state.movies = state.genre.title === 'All genres' ? state.allMovies : state.allMovies.filter((movie) => movie.genre === state.genre.title);
      state.totalMovies = state.movies.length;
      state.loadedMovies = Math.min(state.totalMovies, MOVIES_BY_PAGE);
    })
    .addCase(showMoreMovies, (state) => {
      state.loadedMovies += MOVIES_BY_PAGE;
    })
    .addCase(loadAllMovies, (state, action) => {
      state.allMovies = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
