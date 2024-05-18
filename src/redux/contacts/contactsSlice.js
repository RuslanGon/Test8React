import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../auth/authSlice";

export const apiGetContacts = createAsyncThunk(
  "contacts/getAll",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/contacts");
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);


export const apiNewContact = createAsyncThunk(
  "contacts/addNew",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/contacts", formData);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);



export const apiRemoveContact = createAsyncThunk(
  "contacts/remowe",
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);


const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiGetContacts.pending, (state) => {
        state.isLoading = true, 
        state.isError = false;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state) => {
        state.isLoading = false,
        state.isError = true;
      })



      .addCase(apiNewContact.pending, (state) => {
        state.isLoading = true, 
        state.isError = false;
      })
      .addCase(apiNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload]
      })
      .addCase(apiNewContact.rejected, (state) => {
        state.isLoading = false,
        state.isError = true;
      })



      .addCase(apiRemoveContact.pending, (state) => {
        state.isLoading = true, 
        state.isError = false;
      })
      .addCase(apiRemoveContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id)
      })
      .addCase(apiRemoveContact.rejected, (state) => {
        state.isLoading = false,
        state.isError = true;
      }),

});

export const contactsReducer = contactsSlice.reducer;
