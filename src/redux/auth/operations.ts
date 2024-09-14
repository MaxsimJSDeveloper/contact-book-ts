import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export interface RegisterResponse {
  status: number;
  message: string;
  data: {
    name: string;
    email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface RefreshResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

axios.defaults.baseURL = "https://swagger-contacts.onrender.com/";

export const setAuthHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const register = createAsyncThunk<RegisterResponse>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", credentials);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk<LoginResponse>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(res.data.data.accessToken);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const refreshUser = createAsyncThunk<RefreshResponse>(
  "auth/refresh",
  async () => {
    const res = await axios.post("/auth/refresh", null, {
      withCredentials: true,
    });
    setAuthHeader(res.data.data.accessToken);
    return res.data.data;
  },
  {
    condition(_, { getState }) {
      const state = getState() as RootState;
      return state.auth.token !== null && !state.auth.isRefreshing;
    },
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const res = await axios.post("/auth/logout", null, {
    withCredentials: true,
  });
  return res.data.data;
});
