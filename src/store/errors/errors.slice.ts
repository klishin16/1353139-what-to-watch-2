import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorsSliceState {
  error: string | null;
}

const initialState: ErrorsSliceState = {
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
