import { IState } from '../../types';

export const getError = (state: Pick<IState, 'errors'>) => state.errors.error;
