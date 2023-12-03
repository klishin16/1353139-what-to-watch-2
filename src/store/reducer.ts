import { createReducer } from '@reduxjs/toolkit';
import { IGenre, IMovieDetail } from '../types';
import { changeGenre, getMovies } from './action.ts';
import { mockFilmsWithDetails } from '../mocks/films.ts';

interface IState {
  genre: IGenre;
  movies: IMovieDetail[];
}

const initialState: IState = {
  genre: { id: -1, title: 'All genres' },
  movies: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getMovies, (state) => {
      state.movies = state.genre.title === 'All genres' ? mockFilmsWithDetails : mockFilmsWithDetails.filter((film) => film.genre === state.genre.title);
    });
});

export {reducer};
