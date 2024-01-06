import { describe, expect, it } from 'vitest';
import { IErrorsSliceState } from './errors.slice.ts';
import { getError } from './errors.selectors.ts';

describe('Errors slice selectors', () => {
  const error = 'Test error';

  const errorsState: IErrorsSliceState = {
    error
  };

  it('should return error', () => {
    const result = getError({ errors: errorsState });

    expect(result).toBe(error);
  });
});
