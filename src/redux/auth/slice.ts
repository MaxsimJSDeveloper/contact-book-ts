import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logIn,
  refreshUser,
  register,
  RegisterResponse,
  UserRefresh,
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
          state.isLoggedIn = true;
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
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<UserRefresh>) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.error = null;
        }
      )
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
