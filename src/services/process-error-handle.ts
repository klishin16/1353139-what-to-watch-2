import {clearErrorAction} from '../store/api-actions/api-actions.ts';
import { setError } from '../store/errors/errors.slice.ts';
import { PayloadAction } from '@reduxjs/toolkit';

let store: { dispatch: (action: PayloadAction<string | null> | NonNullable<unknown>) => void };

export const injectStore = (_store: { dispatch: (action: PayloadAction<string | null> | NonNullable<unknown>) => void }) => {
  store = _store;
};

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
