import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  collectionGroup,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "utils/firebase";

const getInitialProject = () => {
  return {
    title: "",
    userId: null,
    createdAt: null,
  };
};

const updateProject = (project, userId) => {
  return {
    ...project,
    userId: userId,
    createdAt: serverTimestamp(),
  };
};

const initialState = {
  projects: [],
  newProject: getInitialProject(),
};

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (userId, thunkAPI) => {
    let newProject = thunkAPI.getState().projects.newProject;
    newProject = updateProject(newProject, userId);
    const docRef = await addDoc(collection(db, "projects"), newProject);
    return docRef.id;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    const tasksToDelete = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );
    const snapshot = await getDocs(tasksToDelete);
    console.log(snapshot);
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    //! delete also invitations and memberships

    await deleteDoc(doc(db, `projects/${projectId}`));
    return projectId;
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setProjectTitle: (state, action) => {
      state.newProject.title = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.newProject = getInitialProject();
      console.log(`Added project ${action.payload}`);
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.newProject = getInitialProject();
      console.log("Could not add project.");
      console.log(action.error.message);
    });
    builder.addCase(deleteProject.fulfilled, (_, action) => {
      console.log(`Deleted project ${action.payload}`);
    });
    builder.addCase(deleteProject.rejected, (_, action) => {
      console.log(`Could not delete project ${action.payload}`);
      console.log(action.error.message);
    });
  },
});

export const { setProjects, setProjectTitle } = projectsSlice.actions;

export default projectsSlice.reducer;
