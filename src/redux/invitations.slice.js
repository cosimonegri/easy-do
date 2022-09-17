import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

import { db } from "utils/firebase";

const getInitialInvitation = () => {
  // Document name = toEmail
  return {
    projectId: "",
    projectTitle: "",
    toEmail: "",
    fromEmail: "",
  };
};

const getFinalInvitation = (invitation) => {
  return {
    ...invitation,
    createdAt: serverTimestamp(),
  };
};

const initialState = {
  invitationsReceived: [],
  newInvitation: getInitialInvitation(),
  success: "",
  error: "",
};

export const addInvitation = createAsyncThunk(
  "invitations/addInvitation",
  async (_, thunkAPI) => {
    let newInvitation = thunkAPI.getState().invitations.newInvitation;
    newInvitation = getFinalInvitation(newInvitation);
    const projectId = newInvitation.projectId;
    const toEmail = newInvitation.toEmail;
    await setDoc(
      doc(db, `projects/${projectId}/invitations/${toEmail}`),
      newInvitation
    );
    return toEmail;
  }
);

export const deleteInvitation = createAsyncThunk(
  "invitations/deleteInvitation",
  async ({ projectId, toEmail }) => {
    await deleteDoc(doc(db, `projects/${projectId}/invitations/${toEmail}`));
    return toEmail;
  }
);

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    setInvitationsReceived: (state, action) => {
      state.invitationsReceived = action.payload;
    },
    clearInvitation: (state) => {
      state.newInvitation = getInitialInvitation();
    },
    setInvitationToEmail: (state, action) => {
      state.newInvitation.toEmail = action.payload;
    },
    setInvitationProject: (state, action) => {
      const { id, title } = action.payload;
      state.newInvitation.projectId = id;
      state.newInvitation.projectTitle = title;
    },
    setInvitationFromEmail: (state, action) => {
      state.newInvitation.fromEmail = action.payload;
    },
    resetInvitationSuccess: (state) => {
      state.success = "";
    },
    resetInvitationError: (state) => {
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addInvitation.fulfilled, (state, action) => {
      console.log(`Added invitation to ${action.payload}`);
      state.success = `Invitation sent to ${action.payload}`;
    });
    builder.addCase(addInvitation.rejected, (state, action) => {
      console.log("Could not add invitation.");
      console.log(action.error.message);
      state.error = "User not found or already invited.";
    });

    builder.addCase(deleteInvitation.fulfilled, (_, action) => {
      console.log(`Deleted invitation to ${action.payload}`);
    });
    builder.addCase(deleteInvitation.rejected, (_, action) => {
      console.log(`Could not delete invitation to ${action.payload}`);
      console.log(action.error.message);
    });
  },
});

export const {
  setInvitationsReceived,
  clearInvitation,
  setInvitationToEmail,
  setInvitationProject,
  setInvitationFromEmail,
  resetInvitationSuccess,
  resetInvitationError,
} = invitationsSlice.actions;

export default invitationsSlice.reducer;
