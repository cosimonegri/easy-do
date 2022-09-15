import React, { useState, useEffect, useContext, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  collection,
  collectionGroup,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  enableIndexedDbPersistence,
} from "firebase/firestore";

import { setTasksWithoutProject, setTasksWithProject } from "redux/tasks.slice";
import { setProjects } from "redux/projects.slice";
import { setMemberships } from "redux/memberships.slice";
import { setInvitationsReceived } from "redux/invitations.slice";

import { db } from "utils/firebase";
import { useAuth } from "contexts/auth-context";
import { LoadingScreen } from "layouts/LoadingScreen";

import { userDataFromTemplate, getDbPath } from "utils/helpers/helpers";

const DataContext = React.createContext();

const useData = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const newDispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const initialIsDownloading = {
    myTasks: false,
    sharedTasks: false,
    myProjects: false,
    memberships: false,
    invitations: false,
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "startDownload":
        return { ...state, [payload]: true };
      case "endDownload":
        return { ...state, [payload]: false };
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  };

  const [isDownloading, dispatch] = useReducer(reducer, initialIsDownloading);
  const [hasSavedUserData, setHasSavedUserData] = useState(false);
  const { currentUser } = useAuth();

  const deleteMembershipsOfProject = async (projectId) => {
    const membershipsToDelete = query(
      collection(db, "projects", projectId, "memberships")
    );
    const snapshot = await getDocs(membershipsToDelete);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  // SET DATABASE PERSISTENCE
  useEffect(() => {
    //HANDLE ERRORS GRAPHICALLY
    try {
      enableIndexedDbPersistence(db);
      console.log("Database persistence setted successfully.");
    } catch (err) {
      if (err.code === "failed-precondition") {
        console.log(
          //! Lanciare un errore?
          "Could not set database persistence: Multiple tabs open, persistence can only be enabled in one tab at a time."
        );
      } else if (err.code === "unimplemented") {
        throw new Error(
          "Could not set database persistence: The current browser does not support all of the features required to enable persistence."
        );
      } else {
        throw new Error("Could not set database persistence.");
      }
    }
  }, []);

  // SAVE USER DATA  //! move only in Signin component
  useEffect(async () => {
    if (currentUser) {
      const userData = userDataFromTemplate(currentUser);
      const path = getDbPath("users", currentUser.email);

      try {
        await setDoc(doc(db, path), userData, { merge: true });
        console.log("User data updated in the database");
        setHasSavedUserData(true);
      } catch (error) {
        console.log("Could not add user data in the database");
        console.log(error);
      }
    }
  }, [currentUser]);

  // LISTENER FOR TASKS WITHOUT PROJECT
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "startDownload", payload: "myTasks" });

      const tasksQuery = query(
        collection(db, "tasks"),
        where("userId", "==", currentUser.uid),
        where("projectId", "==", "")
      );

      const unsubscribe = onSnapshot(
        tasksQuery,
        (snapshot) => {
          const tasks = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          newDispatch(setTasksWithoutProject(tasks));
        },
        (error) => {
          console.log(error);
        }
      );

      dispatch({ type: "endDownload", payload: "myTasks" });
      return unsubscribe;
    }
  }, [currentUser]);

  // LISTENER FOR TASKS WITH PROJECT
  useEffect(() => {
    if (currentUser && (memberships.length > 0 || projects.length > 0)) {
      dispatch({ type: "startDownload", payload: "sharedTasks" });

      const projectIds = [
        ...projects.map((project) => {
          return project.id;
        }),
        ...memberships.map((membership) => {
          return membership.projectId;
        }),
      ];

      console.log("aggiornato");

      const tasksQuery = query(
        collection(db, "tasks"),
        where("projectId", "in", projectIds)
      );

      // SISTEMARE ERRORE
      const unsubscribe = onSnapshot(
        tasksQuery,
        (snapshot) => {
          const tasks = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          newDispatch(setTasksWithProject(tasks));
        },
        (error) => {
          console.log(error);
        }
      );

      dispatch({ type: "endDownload", payload: "sharedTasks" });
      return unsubscribe;
    }
  }, [currentUser, projects, memberships]);

  // PROJECTS LISTENER
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "startDownload", payload: "myProjects" });

      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(
        projectsQuery,
        (snapshot) => {
          const projects = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          newDispatch(setProjects(projects));
        },
        (error) => {
          console.log(error);
        }
      );

      dispatch({ type: "endDownload", payload: "myProjects" });
      return unsubscribe;
    }
  }, [currentUser]);

  // MEMBERSHIPS LISTENER
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "startDownload", payload: "memberships" });

      const membershipsQuery = query(
        collectionGroup(db, "memberships"),
        where("userId", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(
        membershipsQuery,
        (snapshot) => {
          const memberships = snapshot.docs.map((doc) => {
            return { ...doc.data() };
          });
          newDispatch(setMemberships(memberships));
        },
        (error) => {
          console.log(error);
        }
      );

      dispatch({ type: "endDownload", payload: "memberships" });
      return unsubscribe;
    }
  }, [currentUser]);

  // INVITATIONS LISTENER
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "startDownload", payload: "invitations" });

      const invitationsQuery = query(
        collectionGroup(db, "invitations"),
        where("toEmail", "==", currentUser.email)
      );

      const unsubscribe = onSnapshot(
        invitationsQuery,
        (snapshot) => {
          const invitations = snapshot.docs.map((doc) => {
            return { ...doc.data() };
          });
          newDispatch(setInvitationsReceived(invitations));
        },
        (error) => {
          console.log(error);
        }
      );

      dispatch({ type: "endDownload", payload: "invitations" });
      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <DataContext.Provider>
      {(!currentUser || hasSavedUserData) &&
      Object.values(isDownloading).every((item) => item === false) ? (
        children
      ) : (
        <LoadingScreen />
      )}
    </DataContext.Provider>
  );
};

export { DataProvider, useData, DataContext };

//! ALTERNATIVE FOR QUERING TASKS //
// let queriedTasks = [];
// unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
//   querySnapshot.docChanges().forEach((change) => {
//       if (change.type === "removed") {
//           queriedTasks = queriedTasks.filter(
//               (task) => task.id !== change.doc.id
//             );
//       console.log("Task deleted locally");
//     }
//     if (change.type === "added") {
//       queriedTasks = [
//         ...queriedTasks,
//         { ...change.doc.data(), id: change.doc.id },
//       ];
//       console.log("Task added locally");
//     }
//   });

//   setTasks(queriedTasks);
// });
