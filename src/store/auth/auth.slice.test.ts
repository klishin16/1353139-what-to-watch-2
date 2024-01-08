import { describe, expect } from 'vitest';
import { authSlice, AuthSliceState, setAuthorizationStatus, setUser } from './auth.slice.ts';
import { AuthorizationStatus } from '../../constants.ts';
import { User } from '../../types';
import * as faker from 'faker';

describe('Auth slice', () => {
  it('should return initial state with emply action', () => {
    const emptyAction = { type: '' };
    const initialState: AuthSliceState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user: null
    };

    const result = authSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: AuthSliceState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user: null
    };

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set authorization status', () => {
    const initialState: AuthSliceState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user: null
    };
    const expectedState: AuthSliceState = {
      authorizationStatus: AuthorizationStatus.AUTH,
      user: null
    };

    const result = authSlice.reducer(initialState, setAuthorizationStatus(AuthorizationStatus.AUTH));

    expect(result).toEqual(expectedState);
  });

  it('should set user', () => {
    const user: User = {
      id: 1,
      email: faker.internet.email(),
      token: 'abc',
      avatarUrl: faker.internet.avatar()
    };
    const initialState: AuthSliceState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user: null
    };
    const expectedState: AuthSliceState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user
    };

    const result = authSlice.reducer(initialState, setUser(user));

    expect(result).toEqual(expectedState);
  });
});
