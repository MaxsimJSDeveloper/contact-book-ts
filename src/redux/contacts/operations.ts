import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/contactsApi";
import { Contact, NewContact } from "../../types/general";
import { handleAxiosError } from "../../utils/handleAxiosError";

export interface FetchContactsResp {
  data: Contact[];
}

export const fetchContacts = createAsyncThunk<Contact[]>(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/contacts");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleAxiosError(error, "Contacts not found"),
      );
    }
  },
);

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
