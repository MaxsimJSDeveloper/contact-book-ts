import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";
import { UserState } from "../../types/general";

const initialState: UserState = {
  user: { name: "", email: "" },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.error =
          (action.payload as { message?: string })?.message ||
          "Fetch user failed";
      });
  },
});

export const userReducer = userSlice.reducer;
