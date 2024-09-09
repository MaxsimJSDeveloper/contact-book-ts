import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";

export interface RegisterResponse {
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  accessToken: string;
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
  { rejectValue: string }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post<RegisterResponse>(
      "/auth/register",
      credentials
    );
    setAuthHeader(res.data.token);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
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
      const res = await axios.post<UserRefresh>("/auth/refresh");
      return res.data.data;
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

export const logIn = createAsyncThunk<LoginResponse>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      setAuthHeader(res.data.data.accessToken);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
