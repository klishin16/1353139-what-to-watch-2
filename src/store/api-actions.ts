import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, IMovie, State } from '../types';
import { AxiosInstance } from 'axios';
import { EAPIRoute } from '../constants.ts';
import { loadAllMovies, setLoading } from './action.ts';

export const fetchAllMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchAllMovies', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<IMovie[]>(EAPIRoute.Movies);
  dispatch(loadAllMovies(data));
  dispatch(setLoading(false));
});
