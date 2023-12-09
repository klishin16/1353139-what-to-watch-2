import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth.slice.ts';
import { errorsSlice } from './errors.slice.ts';
import { moviesSlice } from './movies.slice.ts';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  errors: errorsSlice.reducer,
  movies: moviesSlice.reducer
});
