import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postSlice";
import postLikesReducer from "../features/post_likes/PostLikesSlice";
import postCommentsReducer from "../features/post_comments/PostCommentsSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    posts: postsReducer,
    likes: postLikesReducer,
    comments: postCommentsReducer,
  },
});

export default store;
