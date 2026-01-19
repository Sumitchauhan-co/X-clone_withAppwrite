import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, restoreSession, signupUser } from "./authThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const pending = (state) => {
  state.loading = true;
  state.error = null;
};

const rejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || "something went wrong";
};

const fulfilled = (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload;
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, fulfilled)
      .addCase(loginUser.rejected, rejected)

      // SIGNUP
      .addCase(signupUser.pending, pending)
      .addCase(signupUser.fulfilled, fulfilled)
      .addCase(signupUser.rejected, rejected)

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // RESTORE SESSION
      .addCase(restoreSession.pending, pending)
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logoutSuccess } = authslice.actions;

export default authslice.reducer;
