import { createAsyncThunk } from "@reduxjs/toolkit";
import * as postAPI from "../../services/posts";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await postAPI.getPosts();
      return res.documents;
    } catch (e) {
      console.error("ADD POST ERROR:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addPost = createAsyncThunk(
  "posts/add",
  async ({ content, imageFile }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const user = auth.user;

      let imageData = {};

      console.log(imageFile);

      if (imageFile instanceof File) {
        imageData = await postAPI.uploadPostImage(imageFile);
      }

      console.log("THUNK imageData :", imageData);

      const payload = {
        userId: user.$id,
        username: user.name,
        content,
        ...imageData,
      };

      console.log(payload);

      return await postAPI.createPost(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
