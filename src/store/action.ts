import {createAction} from '@reduxjs/toolkit';
import { IGenre } from '../types';

export const changeGenre = createAction<IGenre>('changeGenre');
export const getMovies = createAction('getMovies');

export const showMoreMovies = createAction('showMoreMovies');
