import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllArticles } from "./lib/api";

export const getAllArticles2 = createAsyncThunk(
  "allTypes/getAllArticles",
  getAllArticles
);

const articleslice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    filteredArticles: [],
    searchInput: "",
    isLoading: false,
    errors: null,
    first: true,
    lastRes: [],
  },
  reducers: {
    searchArticles(state, action) {
      state.searchInput = action.payload;
      state.filteredArticles = state.articles.filter((article) => {
        return (
          article.abstract
            .toString()
            .toLowerCase()
            .match(state.searchInput.toString().toLowerCase()) ||
          article.lead_paragraph
            .toString()
            .toLowerCase()
            .match(action.payload.toString().toLowerCase())
        );
      });
    },
  },
  extraReducers: {
    [getAllArticles2.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllArticles2.fulfilled]: (state, { payload }) => {
      state.lastRes = payload;
      state.first = false;
      state.articles = [...state.articles, ...payload];
      state.isLoading = false;
      state.errors = ""
    },
    [getAllArticles2.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    },
  },
});

export const articleaction = articleslice.actions;

export default articleslice;
