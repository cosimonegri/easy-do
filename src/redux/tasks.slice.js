import {
  createSlice,
  createAsyncThunk,
  rejectWithValue,
} from "@reduxjs/toolkit";
import {
  collection,
  collectionGroup,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "utils/firebase";

const getInitialTask = () => {
  return {
    title: "",
    dueDate: new Date(),
    completed: false,
    projectId: "",
    projectTitle: "",
    userId: null,
    createdAt: null,
  };
};

const updateTask = (task, userId) => {
  return {
    ...task,
    userId: userId,
    createdAt: serverTimestamp(),
  };
};

const initialState = {
  tasks: [],
  newTask: getInitialTask(),
};

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (userId, thunkAPI) => {
    let newTask = thunkAPI.getState().tasks.newTask;
    newTask = updateTask(newTask, userId);
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
    setTasks: (state, action) => {
      state.tasks = action.payload;
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
  },

  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      console.log(`Added task ${action.payload}`);
    });
    builder.addCase(addTask.rejected, (state, action) => {
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
  setTasks,
  clearTask,
  setTaskTitle,
  setTaskDueDate,
  setTaskProject,
} = tasksSlice.actions;

export default tasksSlice.reducer;
