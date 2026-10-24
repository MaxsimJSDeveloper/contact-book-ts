import { api } from "@/api/contactsApi";
import { RootState } from "@/redux/store";
import { Contact, FetchContactsResponse, NewContact } from "@/types/general";
import { handleAxiosError } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchContactsResp {
  data: Contact[];
}

export const fetchContacts = createAsyncThunk<
  FetchContactsResponse,
  | {
      page?: number;
      perPage?: number;
      contactType?: "home" | "personal";
      isFavorite?: boolean;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  | undefined
>("contacts/fetchAll", async (params, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    const targetPage = params?.page ?? state.contacts.page;
    const targetPerPage = params?.perPage ?? state.contacts.perPage;

    const targetType =
      params?.contactType !== undefined
        ? params.contactType
        : state.contacts.filter.contactType;

    const targetFav =
      params?.isFavorite !== undefined
        ? params.isFavorite
        : state.contacts.filter.isFavorite;

    const targetSortBy = params?.sortBy ?? state.contacts.sort.sortBy;
    const targetSortOrder = params?.sortOrder ?? state.contacts.sort.sortOrder;

    const query = new URLSearchParams({
      page: String(targetPage),
      perPage: String(targetPerPage),
      sortBy: targetSortBy,
      sortOrder: targetSortOrder,
    });

    if (targetType) query.append("contactType", targetType);
    if (typeof targetFav === "boolean")
      query.append("isFavorite", String(targetFav));

    const { data } = await api.get(`/contacts?${query.toString()}`);

    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      handleAxiosError(error, "Contacts not found"),
    );
  }
});

export const addContact = createAsyncThunk<Contact, NewContact>(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const { data } = await api.post("/contacts", newContact);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAxiosError(error, "Failed to add contact"),
      );
    }
  },
);

export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await api.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAxiosError(error, "Failed to delete contact"),
      );
    }
  },
);

export const updateContact = createAsyncThunk<
  Contact,
  { id: string; contactData: Partial<NewContact> }
>("contacts/updateContact", async ({ id, contactData }, thunkAPI) => {
  try {
    const { data } = await api.patch(`/contacts/${id}`, contactData);
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      handleAxiosError(error, "Failed to update contact"),
    );
  }
});
