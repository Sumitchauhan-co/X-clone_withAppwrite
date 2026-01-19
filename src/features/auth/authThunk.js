import { createAsyncThunk } from "@reduxjs/toolkit";
import * as auth from "../../services/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      await auth.login({ email, password });
      const user = await auth.getUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }, thunkAPI) => {
    try {
      await auth.signup({ email, password, name });
      await auth.login({ email, password }); // IMPORTANT
      const user = await auth.getUser();
      return user;
    } catch (error) {
      if (error.code === 409) {
        return thunkAPI.rejectWithValue(
          "User already exists. Please login instead."
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    try {
      const user = await auth.getUser();
      return user;
    } catch {
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await auth.logout();
  return null;
});
