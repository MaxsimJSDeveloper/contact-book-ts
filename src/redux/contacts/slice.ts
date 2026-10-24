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
  page: 1,
  perPage: 6,
  totalPages: 1,
  totalItems: 0,
  filter: {
    contactType: undefined,
    isFavorite: undefined,
  },
  sort: {
    sortBy: "name",
    sortOrder: "asc",
  },
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContactTypeFilter(
      state,
      action: PayloadAction<"home" | "personal" | undefined>,
    ) {
      state.filter.contactType = action.payload;
    },
    setIsFavoriteFilter(state, action: PayloadAction<boolean | undefined>) {
      state.filter.isFavorite = action.payload;
    },
    setSortParams(
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>,
    ) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<FetchContactsResponse>) => {
          state.contacts = action.payload.data;
          state.page = action.payload.page;
          state.perPage = action.payload.perPage;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
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

export const { setContactTypeFilter, setIsFavoriteFilter, setSortParams } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
