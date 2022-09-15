import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "redux/tasks.slice";
import projectsReducer from "redux/projects.slice";
import membershipsReducer from "redux/memberships.slice";
import invitationsReducer from "redux/invitations.slice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    invitations: invitationsReducer,
    memberships: membershipsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
