import { createReducer } from '@reduxjs/toolkit';
import { IGenre, IMovieDetail } from '../types';
import { changeGenre, getMovies, showMoreMovies } from './action.ts';
import { mockFilmsWithDetails } from '../mocks/films.ts';
import { MOVIES_BY_PAGE } from '../constants.ts';

interface IState {
  genre: IGenre;
  movies: IMovieDetail[];
  totalMovies: number;
  loadedMovies: number;
}

const initialState: IState = {
  genre: { id: -1, title: 'All genres' },
  movies: [],
  totalMovies: 0,
  loadedMovies: 0
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getMovies, (state) => {
      state.movies = state.genre.title === 'All genres' ? mockFilmsWithDetails : mockFilmsWithDetails.filter((film) => film.genre === state.genre.title);
      state.totalMovies = state.movies.length;
      state.loadedMovies = Math.min(state.totalMovies, MOVIES_BY_PAGE);
    })
    .addCase(showMoreMovies, (state) => {
      state.loadedMovies += MOVIES_BY_PAGE;
    });
});

export {reducer};
