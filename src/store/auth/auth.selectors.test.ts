import { describe, expect, it } from 'vitest';
import { AuthSliceState } from './auth.slice.ts';
import { AuthorizationStatus } from '../../constants.ts';
import { getAuthorizationState, getAuthorizationStatus, getUser } from './auth.selectors.ts';

describe('Auth slice selectors', () => {
  const authState: AuthSliceState = {
    authorizationStatus: AuthorizationStatus.Auth,
    user: null
  };

  it('should return authorization state', () => {
    const result = getAuthorizationState({ auth: authState });

    expect(result).toBe(authState);
  });

  it('should return authorization status', () => {

    const result = getAuthorizationStatus({ auth: authState });

    expect(result).toBe(AuthorizationStatus.Auth);
  });


  it('should return user', () => {
    const result = getUser({ auth: authState });

    expect(result).toBe(null);
  });
});
