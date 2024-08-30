import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      if (typeof action.payload !== 'object' || !action.payload.email || !action.payload.password) {
        throw new Error('Invalid login payload');
      }
      state.value = { ...action.payload, isLoggedIn: true };
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;