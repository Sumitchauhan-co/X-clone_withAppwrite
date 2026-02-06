import { createAsyncThunk } from "@reduxjs/toolkit";
import * as postsAPI from "../../services/posts";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await postsAPI.getPosts();
      return res.documents;
    } catch (e) {
      console.error("ADD POST ERROR:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addPost = createAsyncThunk(
  "posts/add",
  async ({ content, imageFile, mediaType }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const user = auth.user;

      let imageData = {};

      // console.log(imageFile);

      if (imageFile instanceof File) {
        imageData = await postsAPI.uploadPostImage(imageFile);
      }

      // console.log("THUNK imageData :", imageData);

      const payload = {
        userId: user.$id,
        username: user.name,
        content,
        ...imageData,
        mediaType,
      };

      // console.log(payload);

      return await postsAPI.createPost(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
