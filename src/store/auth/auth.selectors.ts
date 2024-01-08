import { State } from '../../types';
import { AuthorizationStatus } from '../../constants.ts';

export const getAuthorizationState = (state: Pick<State, 'auth'>) => state.auth;
export const getAuthorizationStatus = (state: Pick<State, 'auth'>): AuthorizationStatus => state.auth.authorizationStatus;

export const getUser = (state: Pick<State, 'auth'>) => state.auth.user;
