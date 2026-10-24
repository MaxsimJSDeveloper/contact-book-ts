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
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  filter: {
    contactType?: "home" | "personal";
    isFavorite?: boolean;
  };
  sort: {
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  isLoading: boolean;
  error: string | null;
}

export type ContactType = "home" | "personal";

export interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  isFavorite?: boolean;
  contactType: ContactType;
  userId?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewContact {
  name: string;
  phoneNumber: string;
  contactType: ContactType;
  isFavorite?: boolean;
  email?: string;
  photo?: string;
}

export interface FetchContactsResponse {
  data: Contact[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
