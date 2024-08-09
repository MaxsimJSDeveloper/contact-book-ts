export interface User {
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}
