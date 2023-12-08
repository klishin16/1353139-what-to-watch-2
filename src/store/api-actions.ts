import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, IAuthPayload, IMovie, IUser, State } from '../types';
import { AxiosInstance } from 'axios';
import { EAPIRoute, EAuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../constants.ts';
import { loadAllMovies, setAuthorizationStatus, setError, setLoading, setUser } from './action.ts';
import { dropToken, saveToken } from '../services/token.ts';

export const fetchAllMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchAllMovies', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<IMovie[]>(EAPIRoute.MOVIES);
  dispatch(loadAllMovies(data));
  dispatch(setLoading(false));
});


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data: user } = await api.get<IUser>(EAPIRoute.LOGIN);
      dispatch(setUser(user));
      dispatch(setAuthorizationStatus(EAuthorizationStatus.AUTH));
    } catch {
      dispatch(setAuthorizationStatus(EAuthorizationStatus.NOAUTH));
    }
  },
);

export const loginAction = createAsyncThunk<void, IAuthPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<IUser>(EAPIRoute.LOGIN, {email, password});
    saveToken(user.token);
    dispatch(setUser(user));
    dispatch(setAuthorizationStatus(EAuthorizationStatus.AUTH));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(EAPIRoute.LOGOUT);
    dropToken();
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(EAuthorizationStatus.NOAUTH));
  },
);

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
