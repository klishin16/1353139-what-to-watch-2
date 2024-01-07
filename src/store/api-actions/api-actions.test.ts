import { beforeEach, describe, expect } from 'vitest';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, AuthPayload, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  changeMovieFavoriteStatusAction,
  checkAuthAction,
  fetchAllMoviesAction,
  fetchFavoriteMoviesAction,
  loginAction,
  logoutAction
} from './api-actions.ts';
import { EAPIRoute } from '../../constants.ts';
import { extractActionsTypes, makeFakeMovie, makeFakeMovies } from '../../utils/mocks.ts';
import { setAuthorizationStatus, setUser } from '../auth/auth.slice.ts';
import * as tokenStorage from '../../services/token';
import { setAllMovies, setFavoriteMovies, setLoading } from '../movies/movies.slice.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({auth: {}});
  });

  describe('Check auth action', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(EAPIRoute.LOGIN).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        setUser.type,
        setAuthorizationStatus.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 400', async () => {
      mockAxiosAdapter.onGet(EAPIRoute.LOGIN).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        setAuthorizationStatus.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  describe('Login action', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthPayload = {email: 'test@test.ru', password: '123456'};
      const fakeServerReplay = {token: 'secret'};
      mockAxiosAdapter.onPost(EAPIRoute.LOGIN).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        setUser.type,
        setAuthorizationStatus.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthPayload = {email: 'test@test.ru', password: '123456'};
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(EAPIRoute.LOGIN).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(EAPIRoute.LOGOUT).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        setUser.type,
        setAuthorizationStatus.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(EAPIRoute.LOGOUT).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchAllMoviesAction', () => {
    it('should dispatch "fetchAllMoviesAction.pending", "fetchAllMoviesAction.fulfilled" when server response 200', async() => {
      const movies = makeFakeMovies();
      mockAxiosAdapter.onGet(EAPIRoute.MOVIES).reply(200, movies);

      await store.dispatch(fetchAllMoviesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAllMoviesAction.pending.type,
        setAllMovies.type,
        setLoading.type,
        fetchAllMoviesAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavoriteMoviesAction', () => {
    it('should dispatch "fetchFavoriteMoviesAction.pending", "fetchFavoriteMoviesAction.fulfilled" when server response 200', async() => {
      const movies = makeFakeMovies();
      mockAxiosAdapter.onGet(EAPIRoute.FAVORITE_MOVIES).reply(200, movies);

      await store.dispatch(fetchFavoriteMoviesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteMoviesAction.pending.type,
        setFavoriteMovies.type,
        fetchFavoriteMoviesAction.fulfilled.type,
      ]);
    });
  });

  describe('changeMovieFavoriteStatusAction', () => {
    it('should dispatch "changeMovieFavoriteStatusAction.pending", "changeMovieFavoriteStatusAction.fulfilled" when server response 200', async() => {
      const movie = makeFakeMovie();
      mockAxiosAdapter.onPost(`${EAPIRoute.FAVORITE_MOVIES}/${movie.id}/${Number(true)}`).reply(200, movie);

      await store.dispatch(changeMovieFavoriteStatusAction({ movie, status: true }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeMovieFavoriteStatusAction.pending.type,
        changeMovieFavoriteStatusAction.fulfilled.type,
      ]);
    });
  });
});
