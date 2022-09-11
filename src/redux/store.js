import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "redux/tasks.slice";
import projectsReducer from "redux/projects.slice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
