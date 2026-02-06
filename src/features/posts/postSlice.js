import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, addPost, deletePost } from "./postThunk";
import { toggleLike } from "../post_likes/PostLikesThunk";
import { addComment, deleteComment } from "../post_comments/PostCommentsThunk";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchPosts.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(fetchPosts.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchPosts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(addPost.pending, (s) => {
        s.loading = true;
      })
      .addCase(addPost.fulfilled, (s, a) => {
        s.loading = false;
        // s.list.unshift(a.payload);
        s.list.unshift({
          ...a.payload,
          ...a.meta.arg.imageData,
        });
        // console.log("REDUX payload:", a.payload);
      })
      .addCase(addPost.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
    b.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, newCount } = action.payload;

      const post = state.list.find((p) => p.$id === postId);

      if (post) {
        post.likesCount = newCount;
      }
    });
    b.addCase(addComment.fulfilled, (state, action) => {
      const post = state.list.find((p) => p.$id === action.payload.postId);

      if (post) {
        post.commentsCount += 1;
      }
    });
    b.addCase(deleteComment.fulfilled, (state, action) => {
      const post = state.list.find((p) => p.$id === action.payload.postId);

      if (post && post.commentsCount > 0) {
        post.commentsCount -= 1;
      }
    });
    b.addCase(deletePost.fulfilled, (state, action) => {
      const postId = action.payload;

      state.posts = state.posts.filter((post) => post.$id !== postId);
    });
  },
});

export default postsSlice.reducer;
