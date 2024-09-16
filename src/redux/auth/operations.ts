import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { LoginUser, RegisterUser } from "../../types/general";

export interface RegisterResponse {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

axios.defaults.baseURL = "https://swagger-contacts.onrender.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

export const setAuthHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const register = createAsyncThunk<RegisterResponse, RegisterUser>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", credentials);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk<LoginResponse, LoginUser>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const refreshUser = createAsyncThunk<RefreshResponse>(
  "auth/refresh",
  async () => {
    const { data } = await axios.post("/auth/refresh", null, {
      withCredentials: true,
    });
    setAuthHeader(data.data.accessToken);
    return data.data;
  },
  {
    condition(_, { getState }) {
      const state = getState() as RootState;
      return state.auth.token !== null && !state.auth.isRefreshing;
    },
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const { data } = await axios.post("/auth/logout", null, {
    withCredentials: true,
  });
  return data.data;
});
