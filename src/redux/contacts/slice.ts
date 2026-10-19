import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "@/redux/contacts";
import { Contact, ContactsState, FetchContactsResponse } from "@/types/general";

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
        fetchContacts.fulfilled,
        (state, action: PayloadAction<FetchContactsResponse>) => {
          state.contacts = action.payload.data;
        },
      )
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.contacts.push(action.payload);
        },
      )
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.contacts = state.contacts.filter(
            (c) => c._id !== action.payload,
          );
        },
      )
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          const index = state.contacts.findIndex(
            (c) => c._id === action.payload._id,
          );
          if (index !== -1) {
            state.contacts[index] = action.payload;
          }
        },
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled,
          updateContact.fulfilled,
        ),
        (state) => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected,
        ),
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : (action.payload as { message?: string })?.message ||
                "Something went wrong";
        },
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
