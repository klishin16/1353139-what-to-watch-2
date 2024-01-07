import {store} from '../store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
