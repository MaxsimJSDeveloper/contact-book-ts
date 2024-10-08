import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact, NewContact } from "../../types/general";

export interface FetchContactsResp {
  data: Contact[];
}

export const fetchContacts = createAsyncThunk<FetchContactsResp>(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk<Contact, NewContact>(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", newContact);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const editContact = createAsyncThunk(
//   "contacts/editContact",
//   async ({ id, name, number }, thunkAPI) => {
//     try {
//       const response = await axios.patch(`/contacts/${id}`, { name, number });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
