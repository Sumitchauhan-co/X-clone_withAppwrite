import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice"
import authReducer from "../features/auth/authSlice"
import postsReducer from "../features/posts/postSlice"

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});

export default store;