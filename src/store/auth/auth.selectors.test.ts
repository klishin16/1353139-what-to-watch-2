import { describe, expect, it } from 'vitest';
import { IAuthSliceState } from './auth.slice.ts';
import { EAuthorizationStatus } from '../../constants.ts';
import { getAuthorizationState, getAuthorizationStatus, getUser } from './auth.selectors.ts';

describe('Auth slice selectors', () => {
  const authState: IAuthSliceState = {
    authorizationStatus: EAuthorizationStatus.AUTH,
    user: null
  };

  it('should return authorization state', () => {
    const result = getAuthorizationState({ auth: authState });

    expect(result).toBe(authState);
  });

  it('should return authorization status', () => {

    const result = getAuthorizationStatus({ auth: authState });

    expect(result).toBe(EAuthorizationStatus.AUTH);
  });


  it('should return user', () => {
    const result = getUser({ auth: authState });

    expect(result).toBe(null);
  });
});
