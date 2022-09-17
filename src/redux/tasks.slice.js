import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
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
    projectId: "",
    userId: "", // the owner of the task
  };
};

const getTaskWithCreationDate = (task) => {
  return {
    ...task,
    createdAt: serverTimestamp(),
  };
};

const initialState = {
  tasksWithoutProject: [],
  tasksWithProject: [],
  newTask: getInitialTask(),
  updateTaskId: null, // id of the task that is being updated
};

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (_, thunkAPI) => {
    let newTask = thunkAPI.getState().tasks.newTask;
    newTask = getTaskWithCreationDate(newTask);
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    return docRef.id;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (_, thunkAPI) => {
    let newTask = thunkAPI.getState().tasks.newTask;
    let taskId = thunkAPI.getState().tasks.updateTaskId;
    await updateDoc(doc(db, `tasks/${taskId}`), newTask);
    return taskId;
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
    clearAllTasksWithProject: (state) => {
      state.tasksWithProject = [];
    },

    setNewTask: (state, action) => {
      state.newTask = { ...action.payload };
    },
    clearNewTask: (state) => {
      state.newTask = getInitialTask();
    },

    setNewTaskTitle: (state, action) => {
      state.newTask.title = action.payload;
    },
    setNewTaskDueDate: (state, action) => {
      state.newTask.dueDate = action.payload;
    },
    setNewTaskProjectId: (state, action) => {
      state.newTask.projectId = action.payload;
    },
    setNewTaskUserId: (state, action) => {
      state.newTask.userId = action.payload;
    },

    setUpdateTaskId: (state, action) => {
      state.updateTaskId = action.payload;
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

    builder.addCase(updateTask.fulfilled, (_, action) => {
      console.log(`Updated task ${action.payload}`);
    });
    builder.addCase(updateTask.rejected, (_, action) => {
      console.log(`Could not update task ${action.payload}`);
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
  clearAllTasksWithProject,
  setNewTask,
  clearNewTask,
  setNewTaskTitle,
  setNewTaskDueDate,
  setNewTaskProjectId,
  setNewTaskUserId,
  setUpdateTaskId,
} = tasksSlice.actions;

export default tasksSlice.reducer;
