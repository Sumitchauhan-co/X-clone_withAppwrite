import { createSlice } from "@reduxjs/toolkit";
import { toggleLike, fetchUserLikes } from "./PostLikesThunk";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likedPostIds: [],
  },
  reducers: {
    setLikedPosts(state, action) {
      state.likedPostIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, liked } = action.payload;

      liked
        ? state.likedPostIds.push(postId)
        : (state.likedPostIds = state.likedPostIds.filter(
            (id) => id !== postId,
          ));
    });
    builder.addCase(fetchUserLikes.fulfilled, (state, action) => {
      state.likedPostIds = action.payload;
    });
  },
});

export const { setLikedPosts } = likesSlice.actions;
export default likesSlice.reducer;
