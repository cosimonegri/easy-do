import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

import { db } from "utils/firebase";
import { sortMembershipsByTitle } from "utils/helpers/sort.helpers";

const getInitialMembership = () => {
  // Document name = userEmail
  return {
    projectId: "",
    projectTitle: "",
    userId: "",
    userEmail: "",
  };
};

const getFinalMembership = (membership) => {
  return {
    ...membership,
    joinedAt: serverTimestamp(),
  };
};

const initialState = {
  memberships: [],
  newMembership: getInitialMembership(),
};

export const addMembership = createAsyncThunk(
  "memberships/addMembership",
  async (_, thunkAPI) => {
    let newMembership = thunkAPI.getState().memberships.newMembership;
    newMembership = getFinalMembership(newMembership);
    const projectId = newMembership.projectId;
    const userEmail = newMembership.userEmail;
    await setDoc(
      doc(db, `projects/${projectId}/memberships/${userEmail}`),
      newMembership
    );
    return userEmail;
  }
);

export const deleteMembership = createAsyncThunk(
  "memberships/deleteMembership",
  async ({ projectId, userEmail }) => {
    await deleteDoc(doc(db, `projects/${projectId}/memberships/${userEmail}`));
    return userEmail;
  }
);

export const membershipsSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    setMemberships: (state, action) => {
      sortMembershipsByTitle(action.payload);
      state.memberships = action.payload;
    },
    clearMembership: (state) => {
      state.newMembership = getInitialMembership();
    },
    setMembershipProject: (state, action) => {
      const { id, title } = action.payload;
      state.newMembership.projectId = id;
      state.newMembership.projectTitle = title;
    },
    setMembershipUser: (state, action) => {
      const { userId, userEmail } = action.payload;
      state.newMembership.userId = userId;
      state.newMembership.userEmail = userEmail;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addMembership.fulfilled, (_, action) => {
      console.log(`Added membership for ${action.payload}`);
    });
    builder.addCase(addMembership.rejected, (_, action) => {
      console.log("Could not add membership.");
      console.log(action.error.message);
    });

    builder.addCase(deleteMembership.fulfilled, (_, action) => {
      console.log(`Deleted membership for ${action.payload}`);
    });
    builder.addCase(deleteMembership.rejected, (_, action) => {
      console.log(action);
      console.log(`Could not delete membership for ${action.payload}`);
      console.log(action.error.message);
    });
  },
});

export const {
  setMemberships,
  clearMembership,
  setMembershipProject,
  setMembershipUser,
} = membershipsSlice.actions;

export default membershipsSlice.reducer;
