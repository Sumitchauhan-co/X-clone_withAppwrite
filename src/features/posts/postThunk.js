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
  async ({ content }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const { user } = auth;

      const doc = await postAPI.createPost({
        userId: user.$id,
        username: user.name, // signup name
        content,
      });

      return doc;
    } catch (e) {
      console.error("ADD POST ERROR:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
