import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice.ts';
import { errorsSlice } from './errors/errors.slice.ts';
import { moviesSlice } from './movies/movies.slice.ts';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  errors: errorsSlice.reducer,
  movies: moviesSlice.reducer
});
