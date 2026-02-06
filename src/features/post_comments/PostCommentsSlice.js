import { createSlice } from "@reduxjs/toolkit";
import { fetchComments, addComment, deleteComment } from "./PostCommentsThunk";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      console.log(action.payload);

      state.comments.unshift(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (c) => c.$id !== action.payload.commentId,
      );
    });
  },
});

export default commentsSlice.reducer;
