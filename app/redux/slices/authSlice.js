"use client";

import { createSlice } from '@reduxjs/toolkit';

// Load saved authentication state from localStorage or sessionStorage
const savedAuthState = localStorage.getItem('authState') || sessionStorage.getItem('authState');
const initialState = savedAuthState ? JSON.parse(savedAuthState) : {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save state to localStorage and sessionStorage
      localStorage.setItem('authState', JSON.stringify(state));
      sessionStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      
      localStorage.removeItem('authState');
      sessionStorage.removeItem('authState');
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, loginFailure } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
