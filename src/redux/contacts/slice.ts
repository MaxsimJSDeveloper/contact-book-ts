import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addContact,
  // deleteContact,
  // editContact,
  fetchContacts,
} from "./operations";
import { ContactsState } from "../../types/general";

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchContacts.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.error =
            (action.payload as { message?: string })?.message ||
            "Contacts not found";
          state.isLoading = false;
        }
      )
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload.data;
      })
      .addCase(addContact.rejected, (state, action: PayloadAction<unknown>) => {
        state.error =
          (action.payload as { message?: string })?.message ||
          "Contacts not add";
        state.isLoading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      });
    // .addCase(deleteContact.rejected, handleRejected)
    // .addCase(deleteContact.pending, handlePending)
    // .addCase(deleteContact.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   const index = state.items.findIndex(
    //     (contact) => contact.id === action.payload.id
    //   );
    //   state.items.splice(index, 1);
    // })
    // .addCase(editContact.rejected, handleRejected)
    // .addCase(editContact.pending, handlePending)
    // .addCase(editContact.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   const index = state.items.findIndex(
    //     (contact) => contact.id === action.payload.id
    //   );
    //   state.items[index] = action.payload;
    // });
  },
});

export const contactsReducer = contactsSlice.reducer;
