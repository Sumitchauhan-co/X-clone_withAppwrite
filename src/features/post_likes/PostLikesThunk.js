import { createAsyncThunk } from "@reduxjs/toolkit";
import * as likesAPI from "../../services/postLikes";
import * as postsAPI from "../../services/posts";

export const toggleLike = createAsyncThunk(
  "likes/toggle",
  async ({ postId }, { getState }) => {
    const state = getState();

    const userId = state.auth?.user?.$id;
    const likedPostIds = state.likes?.likedPostIds ?? [];

    const liked = likedPostIds.includes(postId);

    let newCount;

    if (liked) {
      await likesAPI.unlikePost(postId, userId);
      const res = await postsAPI.decrementLikeCount(postId);
      newCount = res.likesCount;
      return { postId, liked: false, newCount };
    } else {
      await likesAPI.likePost(postId, userId);
      const res = await postsAPI.incrementLikeCount(postId);
      newCount = res.likesCount;
      return { postId, liked: true, newCount };
    }
  },
);

export const fetchUserLikes = createAsyncThunk(
  "likes/fetchUserLikes",
  async (_, { getState }) => {
    // console.log("LIKES FROM API:", await likesAPI.getUserLikedPosts(userId));

    const userId = getState().auth?.user?.$id;

    if (!userId) return [];

    const likedPostIds = await likesAPI.getUserLikedPosts(userId);
    return likedPostIds;
  },
);
