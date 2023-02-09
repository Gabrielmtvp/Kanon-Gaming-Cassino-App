import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';

interface IUser {
  name: string;
  email: string;
  coins: number;
}

interface IUserState {
  user: IUser;
  token: string;
  coins: number;
}

// Define the initial state using that type
const initialState = {
  user: {
    name: '',
    email: '',
    coins: 0,
  },
  token: '',
} as IUserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.userData.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user.name = '';
      state.user.email = '';
      state.user.coins = 0;
      state.token = '';
    },
    setDecreaseCoins: (state) => {
      state.user.coins = --state.user.coins;
    },
    setCalculateCoins: (state, action) => {
      state.user.coins += action.payload;
    },
  },
});

export const { setLogin, setLogout, setDecreaseCoins, setCalculateCoins } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
