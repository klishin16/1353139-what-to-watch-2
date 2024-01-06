import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IErrorsSliceState {
  error: string | null;
}

const initialState: IErrorsSliceState = {
  error: null
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setError } = errorsSlice.actions;
