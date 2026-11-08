import { fetchUser } from "@/redux/user/operations";
import { UserState } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";

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
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;
