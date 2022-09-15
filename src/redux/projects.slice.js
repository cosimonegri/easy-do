import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "utils/firebase";
import { sortProjectsByTitle } from "utils/helpers/sort.helpers";

const getInitialProject = () => {
  // Document name = projectId
  return {
    title: "",
    userId: "", // of the owner of the project
    createdAt: null,
  };
};

const getFinalProject = (project) => {
  return {
    ...project,
    createdAt: serverTimestamp(),
  };
};

const initialState = {
  projects: [],
  newProject: getInitialProject(),
};

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (_, thunkAPI) => {
    let newProject = thunkAPI.getState().projects.newProject;
    newProject = getFinalProject(newProject);
    const docRef = await addDoc(collection(db, "projects"), newProject);
    return docRef.id;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    await deleteDoc(doc(db, `projects/${projectId}`));

    //! database.helper: deleteDocumentsInCollection
    //! delete also memberships
    // Delete all the tasks of the project
    const tasksToDelete = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );
    const taskSnapshot = await getDocs(tasksToDelete);
    taskSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Delete all the invitations to the project
    const invitationsToDelete = query(
      collection(db, "projects", projectId, "invitations")
    );
    const invitationSnapshot = await getDocs(invitationsToDelete);
    invitationSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Delete all the memberships of the project
    const membershipsToDelete = query(
      collection(db, "projects", projectId, "memberships")
    );
    const membershipSnapshot = await getDocs(membershipsToDelete);
    membershipSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return projectId;
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      sortProjectsByTitle(action.payload);
      state.projects = action.payload;
    },
    clearProject: (state) => {
      state.newProject = getInitialProject();
    },
    setProjectTitle: (state, action) => {
      state.newProject.title = action.payload;
    },
    setProjectUserId: (state, action) => {
      state.newProject.userId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addProject.fulfilled, (_, action) => {
      console.log(`Added project ${action.payload}`);
    });
    builder.addCase(addProject.rejected, (_, action) => {
      console.log("Could not add project.");
      console.log(action.error.message);
    });

    builder.addCase(deleteProject.fulfilled, (_, action) => {
      console.log(`Deleted project ${action.payload}`);
    });
    builder.addCase(deleteProject.rejected, (_, action) => {
      console.log(action);
      console.log(`Could not delete project ${action.payload}`);
      console.log(action.error.message);
    });
  },
});

export const { setProjects, clearProject, setProjectTitle, setProjectUserId } =
  projectsSlice.actions;

export default projectsSlice.reducer;
