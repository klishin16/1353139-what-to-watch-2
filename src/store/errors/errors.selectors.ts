import { State } from '../../types';

export const getError = (state: Pick<State, 'errors'>) => state.errors.error;
