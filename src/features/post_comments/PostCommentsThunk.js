import { createAsyncThunk } from "@reduxjs/toolkit";
import * as commentsAPI from "../../services/postComments";
import * as postsAPI from "../../services/posts";

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (postId) => {
    const res = await commentsAPI.getPostComments(postId);
    console.log(res);

    return res;
  },
);

export const addComment = createAsyncThunk(
  "comments/add",
  async ({ postId, content }, { getState }) => {
    const state = getState();

    const userId = state.auth.user.$id;
    const username = state.auth.user.name;

    const res = await commentsAPI.createComment(
      postId,
      userId,
      username,
      content,
    );

    await postsAPI.incrementCommentCount(postId);

    console.log(res);

    return res;
  },
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ commentId, postId, commentsCount }) => {
    await commentsAPI.deleteComment(commentId);

    await postsAPI.updatePost(postId, {
      commentsCount: Math.max((commentsCount ?? 1) - 1, 0),
    });

    return { commentId, postId };
  },
);
