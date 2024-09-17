import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchUserResponse {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

axios.defaults.baseURL = "https://contact-book-backend-77nn.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000/";

export const fetchUser = createAsyncThunk<FetchUserResponse>(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/user");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
