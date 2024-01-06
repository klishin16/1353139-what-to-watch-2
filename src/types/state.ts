import {store} from '../store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api.ts';

export type IState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<IState, ReturnType<typeof createAPI>, Action>;
