import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logIn,
  LoginResponse,
  logoutUser,
  RefreshResponse,
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
          const { name, email } = action.payload;
          state.user = { name, email };
          state.isLoggedIn = false;
          state.error = null;
        }
      )
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.error =
          (action.payload as { message?: string })?.message ||
          "Registration failed";
      })
      .addCase(
        logIn.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.token = action.payload.accessToken;
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addCase(logIn.rejected, (state, action: PayloadAction<unknown>) => {
        state.error =
          (action.payload as { message?: string })?.message || "Login failed";
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<RefreshResponse>) => {
          state.token = action.payload.accessToken;
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.error = null;
        }
      )
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.error = "Refresh failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        setAuthHeader("");
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = "Logout failed";
      });
  },
});

export const authReducer = authSlice.reducer;
