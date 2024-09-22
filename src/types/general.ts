export interface User {
  name: string;
  email: string;
}

export interface UserState {
  user: User;
  error: string | null;
}

export interface AuthState {
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

export interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
}

export interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  isFavourite: boolean;
  contactType: string;
  userId: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}
