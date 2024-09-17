import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectToken = (state: RootState) => state.auth.token;
