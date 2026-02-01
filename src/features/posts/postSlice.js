import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, addPost } from "./postThunk";

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
        console.log("REDUX payload:", a.payload);
      })
      .addCase(addPost.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default postsSlice.reducer;
