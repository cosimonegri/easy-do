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
  orderBy,
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
  inviteFromTemplate,
  membershipFromTemplate,
} from "utils/helpers";

const DataContext = React.createContext();

const useData = () => {
  return useContext(DataContext);
};

//ORGANIZE USE EFFECTS IN FUNCTIONS WITH A PROPER NAME
const DataProvider = ({ children }) => {
  const [myTasks, setMyTasks] = useState([]);
  const [sharedTasks, setSharedTasks] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [invites, setInvites] = useState([]);

  const [hasSavedUserData, setHasSavedUserData] = useState(false);

  const initialIsDownloading = {
    myTasks: false,
    sharedTasks: false,
    myProjects: false,
    memberships: false,
    invites: false,
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
  const { currentUser } = useAuth();

  const addTask = async (title, projectId) => {
    const newTask = taskFromTemplate(title, projectId, currentUser.uid);

    try {
      let docSnap = await addDoc(collection(db, "tasks"), newTask);
      console.log("Added a task with ID", docSnap.id, "to the database.");
    } catch (error) {
      console.log("Could not add the task in the database.");
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      console.log("Deleted the task from the database.");
    } catch (error) {
      console.log("Could not delete the task from the database.");
      console.log(error);
    }
  };

  const addProject = async (title) => {
    const newProject = projectFromTemplate(title, currentUser.uid);

    try {
      let docSnap = await addDoc(collection(db, "projects"), newProject);
      console.log("Added a project with ID", docSnap.id, "to the database.");
    } catch (error) {
      console.log("Could not add the project in the database.");
      console.log(error);
    }
  };

  const deleteProject = async (projectId, asOwner) => {
    try {
      if (asOwner) {
        const tasksToDeleteQuery = query(
          collection(db, "tasks"),
          where("projectId", "==", projectId),
          where("userId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(tasksToDeleteQuery);
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        console.log("Deleted the tasks of that project from the database.");
      }

      try {
        await deleteDoc(doc(db, "projects", projectId));
        console.log("Deleted the project from the database.");
      } catch (error) {
        console.log("Could not delete the project from the database.");
        console.log(error);
      }
    } catch (error) {
      console.log(
        "Could not delete the tasks of that project from the database."
      );
      console.log(error);
    }
  };

  const addInvite = async (toUserEmail, projectId) => {
    const newInvite = inviteFromTemplate(
      projectId,
      currentUser.uid,
      toUserEmail
    );

    try {
      await setDoc(
        doc(db, "projects", projectId, "invitations", toUserEmail),
        newInvite
      );
      console.log("Added an invite to", toUserEmail, "to the database.");
    } catch (error) {
      console.log("Could not add the invite in the database.");
      console.log(error);
    }
  };

  const acceptInvite = async (projectId) => {
    const newMembership = membershipFromTemplate(
      projectId,
      currentUser,
      "member"
    );

    try {
      await setDoc(
        doc(db, "projects", projectId, "memberships", currentUser.email),
        newMembership
      );
      console.log("Invite accepted successfully.");

      try {
        await deleteDoc(
          doc(db, "projects", projectId, "invitations", currentUser.email)
        );
        console.log("Deleted the invite from the database.");
      } catch (error) {
        console.log("Could not delete the invite from the database.");
        console.log(error);
      }
    } catch (error) {
      console.log("Could not accept the invite.");
      console.log(error);
    }
  };

  const declineInvite = async (projectId) => {
    try {
      await deleteDoc(
        doc(db, "projects", projectId, "invitations", currentUser.email)
      );
      console.log("Deleted the invite from the database.");
    } catch (error) {
      console.log("Could not delete the invite from the database.");
      console.log(error);
    }
  };

  // ADD MEMBERSHIP e DELETE MEMBERSHIP

  // SET DATABASE PERSISTENCE
  useEffect(() => {
    //HANDLE ERRORS GRAPHICALLY (se browser non supportato, mandare a fanculo)
    try {
      enableIndexedDbPersistence(db);
      console.log("Database persistence setted successfully.");
    } catch (err) {
      if (err.code === "failed-precondition") {
        console.log(
          //!!!!
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

  // SAVE USER DATA
  useEffect(async () => {
    if (currentUser) {
      const userData = userDataFromTemplate(currentUser);

      try {
        await setDoc(doc(db, "users", currentUser.email), userData, {
          merge: true,
        });
        console.log("User data updated in the database");
        setHasSavedUserData(true);
      } catch (error) {
        console.log("Could not add user data in the database");
        console.log(error);
      }
    }
  }, [currentUser]);

  // SET LISTENER FOR MY TASKS CHANGES
  useEffect(() => {
    let unsubscribe;

    if (currentUser) {
      dispatch({ type: "startDownload", payload: "myTasks" });

      const tasksQuery = query(
        collection(db, "tasks"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "asc")
      );

      // YOU HAVE TO HANDLE ERRORS
      unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
        setMyTasks(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });

      console.log("Got my tasks");
      dispatch({ type: "endDownload", payload: "myTasks" });
    }

    return unsubscribe;
  }, [currentUser]);

  //SET LISTENER FOR MY PROJECTS CHANGES
  useEffect(() => {
    let unsubscribe;

    if (currentUser) {
      dispatch({ type: "startDownload", payload: "myProjects" });

      const projectsQuery = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid)
        // orderBy("createdAt", "asc")
      );

      // YOU HAVE TO HANDLE ERRORS
      unsubscribe = onSnapshot(projectsQuery, (querySnapshot) => {
        setMyProjects(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });

      console.log("Got projects");
      dispatch({ type: "endDownload", payload: "myProjects" });
    }

    return unsubscribe;
  }, [currentUser]);

  //SET LISTENER FOR MEMBERSHIPS CHANGES
  useEffect(() => {
    let unsubscribe;

    if (currentUser) {
      dispatch({ type: "startDownload", payload: "memberships" });

      const membershipsQuery = query(
        collectionGroup(db, "memberships"),
        where("userId", "==", currentUser.uid)
      );

      // YOU HAVE TO HANDLE ERRORS
      unsubscribe = onSnapshot(membershipsQuery, (querySnapshot) => {
        setMemberships(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data() };
          })
        );
      });

      console.log("Got memberships");
      dispatch({ type: "endDownload", payload: "memberships" });
    }

    return unsubscribe;
  }, [currentUser]);

  //SET LISTENER FOR INVITES CHANGES
  useEffect(() => {
    let unsubscribe;

    if (currentUser) {
      dispatch({ type: "startDownload", payload: "invites" });

      const invitesQuery = query(
        collectionGroup(db, "invitations"),
        where("toUserEmail", "==", currentUser.email)
      );

      // YOU HAVE TO HANDLE ERRORS
      unsubscribe = onSnapshot(invitesQuery, (querySnapshot) => {
        setInvites(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data() };
          })
        );
      });

      console.log("Got invites");
      dispatch({ type: "endDownload", payload: "invites" });
    }

    return unsubscribe;
  }, [currentUser]);

  // SET LISTENER FOR TASKS (FROM OTHER PEOPLE IN SAME PROJECTS) CHANGES
  useEffect(() => {
    let unsubscribe;

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
        // orderBy("createdAt", "asc")
      );

      // YOU HAVE TO HANDLE ERRORS
      unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
        setSharedTasks(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });

      console.log("Got shared tasks");
      dispatch({ type: "endDownload", payload: "sharedTasks" });
    }

    return unsubscribe;
  }, [currentUser, memberships, myProjects]);

  const value = {
    myTasks,
    sharedTasks,
    myProjects,
    memberships,
    invites,
    addTask,
    deleteTask,
    addProject,
    deleteProject,
    addInvite,
    acceptInvite,
    declineInvite,
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
