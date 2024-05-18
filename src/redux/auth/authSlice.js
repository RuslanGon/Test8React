import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
 
})

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = ''
}

export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkApi) => {
    try {
      const {data} = await instance.post("/users/signup", formData);
      setToken(data.token)
      console.log(data);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
); 


export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkApi) => {
    try {
      const {data} = await instance.post('/users/login', formData);
      setToken(data.token)
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
); 


export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState()
      const token = state.auth.token
      setToken(token)
      const {data} = await instance.get('/users/current');
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
); 


export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await instance.post("/users/logout");
      clearToken();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
); 


const INITIAL_STATE = {
 isSignedIn: false,
 userData: null,
 token: null,
 isLoading: false,
 isError: false
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: builder => builder
  .addCase(apiRegister.pending, (state) => {
    state.isLoading = true,
    state.isError = false
  })
  .addCase(apiRegister.fulfilled, (state, action) => {
    state.isLoading = false,
    state.isSignedIn = true,
    state.userData = action.payload.user,
    state.token = action.payload.token
  })
  .addCase(apiRegister.rejected, (state) => {
    state.isLoading = false,
    state.isError = true
  })



  .addCase(apiLogin.pending, (state) => {
    state.isLoading = true,
    state.isError = false
  })
  .addCase(apiLogin.fulfilled, (state, action) => {
    state.isLoading = false,
    state.isSignedIn = true,
    state.userData = action.payload.user,
    state.token = action.payload.token
  })
  .addCase(apiLogin.rejected, (state) => {
    state.isLoading = false,
    state.isError = true
  })



  .addCase(apiRefreshUser.pending, (state) => {
    state.isLoading = true,
    state.isError = false
  })
  .addCase(apiRefreshUser.fulfilled, (state, action) => {
    state.isLoading = false,
    state.isSignedIn = true,
    state.userData = action.payload
  })
  .addCase(apiRefreshUser.rejected, (state) => {
    state.isLoading = false,
    state.isError = true
  })



  .addCase(apiLogout.pending, (state) => {
    state.isLoading = true,
    state.isError = false
  })
  .addCase(apiLogout.fulfilled, (state) => {
    state.isLoading = false,
    state.isSignedIn = false,
    state.userData = null,
    state.token = null,
    state.isError = false
    // return INITIAL_STATE
  })
  .addCase(apiLogout.rejected, (state) => {
    state.isLoading = false,
    state.isError = true
  })
});




export const authReducer = authSlice.reducer;