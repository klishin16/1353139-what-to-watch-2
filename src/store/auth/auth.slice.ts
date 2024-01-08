import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../constants.ts';
import { User } from '../../types';


export interface AuthSliceState {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: AuthSliceState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
});

export const { setAuthorizationStatus, setUser } = authSlice.actions;
