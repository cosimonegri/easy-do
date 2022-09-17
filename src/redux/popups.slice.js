import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTaskPopup: false,
  showProjectPopup: false,
  showSharePopup: false,
  isCreating: false,
  isUpdating: false,
};

export const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    openTaskPopup: (state) => {
      state.showTaskPopup = true;
    },
    closeTaskPopup: (state) => {
      state.showTaskPopup = false;
      state.isCreating = false;
      state.isUpdating = false;
    },

    openProjectPopup: (state) => {
      state.showProjectPopup = true;
    },
    closeProjectPopup: (state) => {
      state.showProjectPopup = false;
      state.isCreating = false;
      state.isUpdating = false;
    },

    openSharePopup: (state) => {
      state.showSharePopup = true;
    },
    closeSharePopup: (state) => {
      state.showSharePopup = false;
      state.isCreating = false;
      state.isUpdating = false;
    },

    setIsCreating: (state) => {
      state.isCreating = true;
    },
    setIsUpdating: (state) => {
      state.isUpdating = true;
    },
  },
});

export const {
  openTaskPopup,
  closeTaskPopup,
  openProjectPopup,
  closeProjectPopup,
  openSharePopup,
  closeSharePopup,
  setIsCreating,
  setIsUpdating,
} = popupsSlice.actions;

export default popupsSlice.reducer;
