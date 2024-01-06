import { IState } from '../../types';
import { EAuthorizationStatus } from '../../constants.ts';

export const getAuthorizationState = (state: Pick<IState, 'auth'>) => state.auth;
export const getAuthorizationStatus = (state: Pick<IState, 'auth'>): EAuthorizationStatus => state.auth.authorizationStatus;

export const getUser = (state: Pick<IState, 'auth'>) => state.auth.user;
