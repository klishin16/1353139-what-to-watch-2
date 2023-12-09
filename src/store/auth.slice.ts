import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EAuthorizationStatus } from '../constants.ts';
import { IUser } from '../types';


interface IAuthSliceState {
  authorizationStatus: EAuthorizationStatus;
  user: IUser | null;
}

const initialState: IAuthSliceState = {
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
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    }
  },
});

export const { setAuthorizationStatus, setUser } = authSlice.actions;
