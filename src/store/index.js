import { configureStore } from "@reduxjs/toolkit";

import loginslice from "./LoginSlice";
import articleslice from "./ArticleSlice";

const store = configureStore({
  reducer: { login: loginslice.reducer, article: articleslice.reducer },
});

export default store;
