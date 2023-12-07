import {createAction} from '@reduxjs/toolkit';
import { IGenre, IMovie} from '../types';

export const changeGenre = createAction<IGenre>('changeGenre');
export const getMovies = createAction('getMovies');

export const showMoreMovies = createAction('showMoreMovies');

export const loadAllMovies = createAction<IMovie[]>('loadAllMovies');

export const setLoading = createAction<boolean>('setLoading');
