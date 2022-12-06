import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { postLoginInput } from "./lib/api";

export const postLogin = createAsyncThunk(
  "allTypes/postLoginInput",
  postLoginInput
);

const loginslice = createSlice({
  name: "login",
  initialState: {
    isAuth: false,
    loginstatus: 0,
    isLoading: false,
    errors: "",
  },
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.loginstatus = 0;
      state.isLoading = false;
      state.errors="";  
    },
  },
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [postLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.loginstatus = 200;
    },
    [postLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
      state.loginstatus = 401;
    },
  },
});

export const loginaction = loginslice.actions;

export default loginslice;
