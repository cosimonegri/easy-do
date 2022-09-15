import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "utils/firebase";
import { sortTasksByDate } from "utils/helpers/sort.helpers";

const getInitialTask = () => {
  // Document name = taskId
  return {
    title: "",
    dueDate: new Date(),
    completed: false,
    projectId: "",
    projectTitle: "",
    userId: "",
    createdAt: null,
  };
};

const getFinalTask = (task) => {
  return {
    ...task,
    createdAt: serverTimestamp(),
  };
};

const initialState = {
  tasksWithoutProject: [],
  tasksWithProject: [],
  newTask: getInitialTask(),
};

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (_, thunkAPI) => {
    let newTask = thunkAPI.getState().tasks.newTask;
    newTask = getFinalTask(newTask);
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    return docRef.id;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await deleteDoc(doc(db, `tasks/${taskId}`));
    return taskId;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksWithoutProject: (state, action) => {
      sortTasksByDate(action.payload);
      state.tasksWithoutProject = action.payload;
    },
    setTasksWithProject: (state, action) => {
      sortTasksByDate(action.payload);
      state.tasksWithProject = action.payload;
    },
    clearTask: (state) => {
      state.newTask = getInitialTask();
    },
    setTaskTitle: (state, action) => {
      state.newTask.title = action.payload;
    },
    setTaskDueDate: (state, action) => {
      state.newTask.dueDate = action.payload;
    },
    setTaskProject: (state, action) => {
      const { id, title } = action.payload;
      state.newTask.projectId = id;
      state.newTask.projectTitle = title;
    },
    setTaskUserId: (state, action) => {
      state.newTask.userId = action.payload;
    },
    clearAllTasksWithProject: (state) => {
      state.tasksWithProject = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (_, action) => {
      console.log(`Added task ${action.payload}`);
    });
    builder.addCase(addTask.rejected, (_, action) => {
      console.log("Could not add task.");
      console.log(action.error.message);
    });

    builder.addCase(deleteTask.fulfilled, (_, action) => {
      console.log(`Deleted task ${action.payload}`);
    });
    builder.addCase(deleteTask.rejected, (_, action) => {
      console.log(`Could not delete task ${action.payload}`);
      console.log(action.error.message);
    });
  },
});

export const {
  setTasksWithoutProject,
  setTasksWithProject,
  clearTask,
  setTaskTitle,
  setTaskDueDate,
  setTaskProject,
  setTaskUserId,
  clearAllTasksWithProject,
} = tasksSlice.actions;

export default tasksSlice.reducer;
