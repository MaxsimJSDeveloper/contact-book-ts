import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface User {
  name: string;
  email: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

axios.defaults.baseURL = "https://swagger-contacts.onrender.com/";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>("/auth/register", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post<RegisterResponse>(
      "/auth/register",
      credentials
    );
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
