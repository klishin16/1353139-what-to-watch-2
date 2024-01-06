import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, IAuthPayload, IMovie, IMovieChangeFavoriteStatusPayload, IUser, IState } from '../../types';
import { AxiosInstance } from 'axios';
import { EAPIRoute, EAuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../../constants.ts';
import { dropToken, saveToken } from '../../services/token.ts';
import { setAuthorizationStatus, setUser } from '../auth/auth.slice.ts';
import { setAllMovies, setFavoriteMovies, setLoading } from '../movies/movies.slice.ts';
import { setError } from '../errors/errors.slice.ts';

export const fetchAllMoviesAction = createAsyncThunk<IMovie[], undefined, {
  dispatch: AppDispatch;
  state: IState;
  extra: AxiosInstance;
}>('fetchAllMovies', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<IMovie[]>(EAPIRoute.MOVIES);
  dispatch(setAllMovies(data));
  dispatch(setLoading(false));
  return data;
});

export const fetchFavoriteMoviesAction = createAsyncThunk<IMovie[], undefined, {
  dispatch: AppDispatch;
  state: IState;
  extra: AxiosInstance;
}>('fetchFavoriteMovies', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<IMovie[]>(EAPIRoute.FAVORITE_MOVIES);
  dispatch(setFavoriteMovies(data));
  return data;
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: IState;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, {dispatch, extra: api }) => {
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
  state: IState;
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
  state: IState;
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
  'clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const changeMovieFavoriteStatusAction = createAsyncThunk<IMovieChangeFavoriteStatusPayload, IMovieChangeFavoriteStatusPayload, {
  dispatch: AppDispatch;
  state: IState;
  extra: AxiosInstance;
}>('changeMovieFavoriteStatus', async ({ movie, status }, { extra: api }) => {
  await api.post(`${EAPIRoute.FAVORITE_MOVIES }/${ movie.id }/${Number(status)}`);
  return { movie, status };
});
