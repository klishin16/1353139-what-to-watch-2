import { describe, expect } from 'vitest';
import { authSlice, IAuthSliceState, setAuthorizationStatus, setUser } from './auth.slice.ts';
import { EAuthorizationStatus } from '../../constants.ts';
import { IUser } from '../../types';
import * as faker from 'faker';

describe('Auth slice', () => {
  it('should return initial state with emply action', () => {
    const emptyAction = { type: '' };
    const initialState: IAuthSliceState = {
      authorizationStatus: EAuthorizationStatus.UNKNOWN,
      user: null
    };

    const result = authSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: IAuthSliceState = {
      authorizationStatus: EAuthorizationStatus.UNKNOWN,
      user: null
    };

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set authorization status', () => {
    const initialState: IAuthSliceState = {
      authorizationStatus: EAuthorizationStatus.UNKNOWN,
      user: null
    };
    const expectedState: IAuthSliceState = {
      authorizationStatus: EAuthorizationStatus.AUTH,
      user: null
    };

    const result = authSlice.reducer(initialState, setAuthorizationStatus(EAuthorizationStatus.AUTH));

    expect(result).toEqual(expectedState);
  });

  it('should set user', () => {
    const user: IUser = {
      id: 1,
      email: faker.internet.email(),
      token: 'abc',
      avatarUrl: faker.internet.avatar()
    };
    const initialState: IAuthSliceState = {
      authorizationStatus: EAuthorizationStatus.UNKNOWN,
      user: null
    };
    const expectedState: IAuthSliceState = {
      authorizationStatus: EAuthorizationStatus.UNKNOWN,
      user
    };

    const result = authSlice.reducer(initialState, setUser(user));

    expect(result).toEqual(expectedState);
  });
});
