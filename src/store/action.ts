import {createAction} from '@reduxjs/toolkit';
import { IGenre, IMovie, IUser } from '../types';
import { EAuthorizationStatus } from '../constants.ts';

export const changeGenre = createAction<IGenre>('changeGenre');
export const getMovies = createAction('getMovies');

export const showMoreMovies = createAction('showMoreMovies');

export const loadAllMovies = createAction<IMovie[]>('loadAllMovies');

export const setLoading = createAction<boolean>('setLoading');

export const setAuthorizationStatus = createAction<EAuthorizationStatus>('setAuthorizationStatus');

export const setError = createAction<string | null>('setError');

export const setUser = createAction<IUser | null>('setUser');
