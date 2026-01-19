import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inHomeIsActive: "for you",
  inExploreIsActive: "for you",
  inNotificationIsActive: "all",
  inFollowIsActive: "who to follow",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHomeActive: (state, action) => {
      state.inHomeIsActive = action.payload;
    },
    setExploreActive: (state, action) => {
      state.inExploreIsActive = action.payload;
    },
    setNotificationActive: (state, action) => {
      state.inNotificationIsActive = action.payload;
    },
    setFollowActive: (state, action) => {
      state.inFollowIsActive = action.payload;
    },
  },
});

export const category = (state) => {
  const categoryMap = {
    "for you": "general",
    trending: "technology",
    news: "nation",
    sports: "sports",
    entertainment: "entertainment",
  };
  return categoryMap[state.ui.inExploreIsActive] ?? "general";
};

export const {
  setHomeActive,
  setExploreActive,
  setNotificationActive,
  setFollowActive,
} = uiSlice.actions;

export default uiSlice.reducer;
