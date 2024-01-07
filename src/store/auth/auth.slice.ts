import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EAuthorizationStatus } from '../../constants.ts';
import { User } from '../../types';


export interface AuthSliceState {
  authorizationStatus: EAuthorizationStatus;
  user: User | null;
}

const initialState: AuthSliceState = {
  authorizationStatus: EAuthorizationStatus.UNKNOWN,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<EAuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
});

export const { setAuthorizationStatus, setUser } = authSlice.actions;
