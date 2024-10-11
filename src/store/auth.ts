import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup() { },
    login() { },
    logout() { },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;