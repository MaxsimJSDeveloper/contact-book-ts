import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logIn,
  logoutUser,
  refreshUser,
  register,
  RegisterResponse,
  setAuthHeader,
} from "./operations";
import { AuthState } from "../../types/general";

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.user = action.payload;
          state.isLoggedIn = false;
          state.error = null;
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Registration failed";
        }
      )
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        setAuthHeader(null);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      });
  },
});

export const authReducer = authSlice.reducer;
