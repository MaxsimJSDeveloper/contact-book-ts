export interface User {
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: string;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
