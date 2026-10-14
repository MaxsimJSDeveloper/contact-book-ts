import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoginUser, RegisterUser } from "../../types/general";
import { api, setAuthHeader } from "../../api/contactsApi";
import { handleAxiosError } from "../../utils/handleAxiosError";

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

export const register = createAsyncThunk<RegisterResponse, RegisterUser>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", credentials);
      return data.data;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(handleAxiosError(error, "Something went wrong"));
    }
  },
);

export const logIn = createAsyncThunk<LoginResponse, LoginUser>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, "Failed to login"));
    }
  },
);

export const refreshUser = createAsyncThunk<RefreshResponse>(
  "auth/refresh",
  async () => {
    const { data } = await api.post("/auth/refresh", null, {
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
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const { data } = await api.post("/auth/logout", null, {
    withCredentials: true,
  });
  return data.data;
});
