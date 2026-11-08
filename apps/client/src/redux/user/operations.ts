import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/contactsApi";
import { handleAxiosError } from "@/utils";

export interface FetchUserResponse {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchUser = createAsyncThunk<FetchUserResponse>(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/user");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAxiosError(error, "Failed to fetch user"),
      );
    }
  },
);
