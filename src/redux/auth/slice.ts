import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  logIn,
  LoginResponse,
  logoutUser,
  RefreshResponse,
  refreshUser,
  register,
} from "@/redux/auth/operations";
import { AuthState } from "@/types/general";

const initialState: AuthState = {
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
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(logIn
          .fulfilled, refreshUser.fulfilled),
        (state, action: PayloadAction<LoginResponse | RefreshResponse>) => {
          state.token = action.payload.accessToken;
          state.isLoggedIn = true;
        },
      )
      .addMatcher(
        isAnyOf(refreshUser.fulfilled, refreshUser.rejected),
        (state) => {
          state.isRefreshing = false;
        },
      )
      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          refreshUser.pending,
          logoutUser.pending,
        ),
        (state) => {
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          refreshUser.rejected,
          logoutUser.rejected,
        ),
        (state, action: PayloadAction<unknown>) => {
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : (action.payload as { message?: string })?.message ||
                "Authentication failed";
        },
      );
  },
});

export const authReducer = authSlice.reducer;
