import { State } from '../../types';
import { EAuthorizationStatus } from '../../constants.ts';

export const getAuthorizationState = (state: Pick<State, 'auth'>) => state.auth;
export const getAuthorizationStatus = (state: Pick<State, 'auth'>): EAuthorizationStatus => state.auth.authorizationStatus;

export const getUser = (state: Pick<State, 'auth'>) => state.auth.user;
