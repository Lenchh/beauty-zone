import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../common/interfaces/IUser';

interface authState {
  isAuthenticated: boolean;
  userInfo: IUser | null;
}

const initialState: authState = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logOutUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { setUser, logOutUser } = authSlice.actions;
export default authSlice.reducer;
