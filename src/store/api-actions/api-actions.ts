import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthPayload, Movie, MovieChangeFavoriteStatusPayload, User, State } from '../../types';
import { AxiosInstance } from 'axios';
import { ApiRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../../constants.ts';
import { dropToken, saveToken } from '../../services/token.ts';
import { setAuthorizationStatus, setUser } from '../auth/auth.slice.ts';
import { setAllMovies, setFavoriteMovies, setLoading } from '../movies/movies.slice.ts';
import { setError } from '../errors/errors.slice.ts';

export const fetchAllMoviesAction = createAsyncThunk<Movie[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('movies/fetchAllMovies', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<Movie[]>(ApiRoute.Movies);
  dispatch(setAllMovies(data));
  dispatch(setLoading(false));
  return data;
});

export const fetchFavoriteMoviesAction = createAsyncThunk<Movie[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('movies/fetchFavoriteMovies', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<Movie[]>(ApiRoute.FavoriteMovies);
  dispatch(setFavoriteMovies(data));
  return data;
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, {dispatch, extra: api }) => {
    try {
      const { data: user } = await api.get<User>(ApiRoute.Login);
      dispatch(setUser(user));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(setUser(user));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'errors/clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const changeMovieFavoriteStatusAction = createAsyncThunk<MovieChangeFavoriteStatusPayload, MovieChangeFavoriteStatusPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('movies/changeMovieFavoriteStatus', async ({ movie, status }, { extra: api }) => {
  await api.post(`${ApiRoute.FavoriteMovies }/${ movie.id }/${Number(status)}`);
  return { movie, status };
});
