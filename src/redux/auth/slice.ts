import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  refreshUser,
  register,
  RegisterResponse,
  UserRefresh,
} from "./operations";
import { AuthState } from "../../types/general";

const initialState: AuthState = {
  user: { name: null, email: null },
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
          state.user = action.payload.user;
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
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<UserRefresh>) => {
          state.user = {
            name: action.payload.name,
            email: action.payload.email,
          };
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.error = null;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
