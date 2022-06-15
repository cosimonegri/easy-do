import React, { useState, useEffect, useContext, useReducer } from "react";
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
  onSnapshot,
  enableIndexedDbPersistence,
} from "firebase/firestore";

import { db } from "utils/firebase";
import { useAuth } from "contexts/auth-context";
import { LoadingScreen } from "layouts/LoadingScreen";

import {
  userDataFromTemplate,
  taskFromTemplate,
  projectFromTemplate,
  invitationFromTemplate,
  membershipFromTemplate,
  getDbPath,
} from "utils/helpers";

const DataContext = React.createContext();

const useData = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [myTasks, setMyTasks] = useState([]);
  const [sharedTasks, setSharedTasks] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [invitations, setInvitations] = useState([]);

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

  const addTask = (taskData) => {
    const newTask = taskFromTemplate(taskData, currentUser.uid);
    const path = getDbPath("tasks");
    return addDoc(collection(db, path), newTask);
  };

  const deleteTask = (taskId) => {
    const path = getDbPath("tasks", taskId);
    return deleteDoc(doc(db, path));
  };

  const deleteTasksOfProject = async (projectId) => {
    const tasksToDelete = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );
    const snapshot = await getDocs(tasksToDelete);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const addProject = (title) => {
    const newProject = projectFromTemplate(title, currentUser.uid);
    const path = getDbPath("projects");
    return addDoc(collection(db, path), newProject);
  };

  const deleteProject = (projectId) => {
    const path = getDbPath("projects", projectId);
    return deleteDoc(doc(db, path));
  };

  const addInvitation = (projectId, toUserEmail) => {
    const newInvitation = invitationFromTemplate(
      projectId,
      currentUser.uid,
      toUserEmail
    );
    const path = getDbPath("invitations", toUserEmail, projectId);
    return setDoc(doc(db, path), newInvitation);
  };

  const deleteInvitation = (projectId, toUserEmail) => {
    const path = getDbPath("invitations", toUserEmail, projectId);
    return deleteDoc(doc(db, path));
  };

  const deleteInvitationsOfProject = async (projectId) => {
    const invitationsToDelete = query(
      collection(db, "projects", projectId, "invitations")
    );
    const snapshot = await getDocs(invitationsToDelete);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const addMembership = (projectId) => {
    const newMembership = membershipFromTemplate(
      projectId,
      currentUser,
      "member"
    );
    const path = getDbPath("memberships", currentUser.email, projectId);
    return setDoc(doc(db, path), newMembership);
  };

  const deleteMembership = (projectId) => {
    const path = getDbPath("memberships", currentUser.email, projectId);
    return deleteDoc(doc(db, path));
  };

  const deleteMembershipsOfProject = async (projectId) => {
    const membershipsToDelete = query(
      collection(db, "projects", projectId, "memberships")
    );
    const snapshot = await getDocs(membershipsToDelete);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const handleSnapshotError = (listenerName) => {
    console.log(`Error in listener ${listenerName}`); //! Lanciare un errore?
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

  // LISTENER FOR MY TASKS
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "startDownload", payload: "myTasks" });

      const tasksQuery = query(
        collection(db, "tasks"),
        where("userId", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(
        tasksQuery,
        (snapshot) => {
          setMyTasks(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        },
        (error) => {
          handleSnapshotError("myTasks");
        }
      );

      console.log("Got my tasks");
      dispatch({ type: "endDownload", payload: "myTasks" });
      return unsubscribe;
    }
  }, [currentUser]);

  // LISTENER FOR MY PROJECTS
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
          setMyProjects(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        },
        (error) => {
          handleSnapshotError("myProjects");
        }
      );

      console.log("Got projects");
      dispatch({ type: "endDownload", payload: "myProjects" });
      return unsubscribe;
    }
  }, [currentUser]);

  // LISTENER FOR MEMBERSHIPS
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
          setMemberships(
            snapshot.docs.map((doc) => {
              return { ...doc.data() };
            })
          );
        },
        (error) => {
          handleSnapshotError("memberships");
        }
      );

      console.log("Got memberships");
      dispatch({ type: "endDownload", payload: "memberships" });
      return unsubscribe;
    }
  }, [currentUser]);

  // LISTENER FOR INVITATIONS
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "startDownload", payload: "invitations" });

      const invitationsQuery = query(
        collectionGroup(db, "invitations"),
        where("toUserEmail", "==", currentUser.email)
      );

      // YOU HAVE TO HANDLE ERRORS
      const unsubscribe = onSnapshot(
        invitationsQuery,
        (snapshot) => {
          setInvitations(
            snapshot.docs.map((doc) => {
              return { ...doc.data() };
            })
          );
        },
        (error) => {
          handleSnapshotError("invitations");
        }
      );

      console.log("Got invitations");
      dispatch({ type: "endDownload", payload: "invitations" });
      return unsubscribe;
    }
  }, [currentUser]);

  // LISTENER FOR TASKS (of other people in same projects)
  useEffect(() => {
    if (currentUser && (memberships.length > 0 || myProjects.length > 0)) {
      dispatch({ type: "startDownload", payload: "sharedTasks" });

      console.log(memberships);
      console.log(myProjects);

      const projectIds = [
        ...memberships.map((membership) => {
          return membership.projectId;
        }),
        ...myProjects.map((project) => {
          return project.id;
        }),
      ];
      console.log(projectIds);

      const tasksQuery = query(
        collection(db, "tasks"),
        where("projectId", "in", projectIds),
        where("userId", "!=", currentUser.uid)
      );

      // YOU HAVE TO HANDLE ERRORS
      const unsubscribe = onSnapshot(
        tasksQuery,
        (snapshot) => {
          setSharedTasks(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        },
        (error) => {
          handleSnapshotError("sharedTasks");
        }
      );

      console.log("Got shared tasks");
      dispatch({ type: "endDownload", payload: "sharedTasks" });
      return unsubscribe;
    }
  }, [currentUser, memberships, myProjects]);

  const value = {
    myTasks,
    sharedTasks,
    myProjects,
    memberships,
    invitations,
    addTask,
    deleteTask,
    deleteTasksOfProject,
    addProject,
    deleteProject,
    addInvitation,
    deleteInvitation,
    deleteInvitationsOfProject,
    addMembership,
    deleteMembership,
    deleteMembershipsOfProject,
  };

  return (
    <DataContext.Provider value={value}>
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

// ALTERNATIVE FOR QUERING TASKS //
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
