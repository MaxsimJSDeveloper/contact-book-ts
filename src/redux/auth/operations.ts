import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Обновіть шлях до store, якщо потрібно
import axios, { AxiosError } from "axios";

interface User {
  name: string;
  email: string;
}

export interface RegisterResponse {
  user: User;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRefresh {
  id: string;
  name: string;
  email: string;
}

axios.defaults.baseURL = "https://swagger-contacts.onrender.com/";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>("/auth/register", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post<RegisterResponse>(
      "/auth/register",
      credentials,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk<
  UserRefresh,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get<UserRefresh>("auth/refresh");
      return res.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const persistedToken = state.auth.token;

      if (persistedToken === null) {
        return false;
      }

      return true;
    },
    dispatchConditionRejection: true,
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
