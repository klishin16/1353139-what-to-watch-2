import { createReducer } from '@reduxjs/toolkit';
import { IGenre, IMovie } from '../types';
import { changeGenre, getMovies, loadAllMovies, setLoading, showMoreMovies } from './action.ts';
import { MOVIES_BY_PAGE } from '../constants.ts';

interface IState {
  genre: IGenre;
  allMovies: IMovie[];
  movies: IMovie[];
  totalMovies: number;
  loadedMovies: number;
  isLoading: boolean;
}

const initialState: IState = {
  genre: { id: -1, title: 'All genres' },
  allMovies: [],
  movies: [],
  totalMovies: 0,
  loadedMovies: 0,
  isLoading: true,
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
    });
});

export {reducer};
