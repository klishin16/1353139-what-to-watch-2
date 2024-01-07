import { describe, expect } from 'vitest';
import { errorsSlice, ErrorsSliceState, setError } from './errors.slice.ts';

describe('Errors slice', () => {
  it('should return initial state with emply action', () => {
    const emptyAction = { type: '' };
    const initialState: ErrorsSliceState = {
      error: null
    };

    const result = errorsSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: ErrorsSliceState = {
      error: null
    };

    const result = errorsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set error', () => {
    const error = 'Test error';
    const initialState: ErrorsSliceState = {
      error: null
    };
    const expectedState: ErrorsSliceState = {
      error
    };

    const result = errorsSlice.reducer(initialState, setError(error));

    expect(result).toEqual(expectedState);
  });

  it('should set error to null', () => {
    const error = null;
    const initialState: ErrorsSliceState = {
      error: 'Test error'
    };
    const expectedState: ErrorsSliceState = {
      error
    };

    const result = errorsSlice.reducer(initialState, setError(error));

    expect(result).toEqual(expectedState);
  });
});
