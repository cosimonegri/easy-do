import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "utils/firebase";

export const userDataFromTemplate = (currentUser) => {
  return {
    name: currentUser.displayName,
    userId: currentUser.uid,
    emailVerified: currentUser.emailVerified,
    photoUrl: currentUser.photoURL,
    createdAt: currentUser.metadata.createdAt,
  };
};

export const taskFromTemplate = (title, projectId, currentUserId) => {
  return {
    title: title,
    userId: currentUserId,
    projectId: projectId,
    completed: false,
    createdAt: serverTimestamp(),
  };
};

export const projectFromTemplate = (title, currentUserId) => {
  return {
    title: title,
    userId: currentUserId,
    createdAt: serverTimestamp(),
  };
};

export const inviteFromTemplate = (projectId, fromUserId, toUserEmail) => {
  return {
    projectId: projectId,
    fromUserId: fromUserId,
    toUserEmail: toUserEmail,
    createdAt: serverTimestamp(),
  };
};

export const membershipFromTemplate = (projectId, currentUser, role) => {
  return {
    projectId: projectId,
    userId: currentUser.uid,
    userEmail: currentUser.email,
    role: role,
    joinedAt: serverTimestamp(),
  };
};

export const addTask = async (
  uid,
  tasks,
  setTasks,
  text,
  project,
  category
) => {
  let id = new Date().getTime().toString();
  let newTask = { id: id, text: text, project: project, category: category };
  let newTasks = [...tasks, newTask];
  setTasks(newTasks);

  try {
    const docRef = doc(db, "usersData", uid);
    await updateDoc(docRef, {
      tasks: newTasks,
    });
    console.log("added a task with id: ", id);
  } catch (error) {
    console.log("task not added in the server");
  }
};

export const removeTask = async (uid, tasks, setTasks, id) => {
  let newTasks = tasks.filter((task) => task["id"] != id);
  setTasks(newTasks);

  try {
    const docRef = doc(db, "usersData", uid);
    await updateDoc(docRef, {
      tasks: newTasks,
    });
    console.log("removed task with id: ", id);
  } catch (error) {
    console.log("task not removed from the server");
  }
};

export const addProject = async (uid, projects, setProjects, name, color) => {
  let id = new Date().getTime().toString();
  let newProject = { id: id, name: name, color: color };
  let newProjects = [...projects, newProject];
  setProjects(newProjects);

  try {
    const docRef = doc(db, "usersData", uid);
    await updateDoc(docRef, {
      projects: newProjects,
    });
    console.log("added a project with id: ", id);
  } catch (error) {
    console.log("project not added in the server");
  }
};

export const removeProject = async (uid, projects, setProjects, id) => {
  let newProjects = projects.filter((project) => project["id"] != id);
  setProjects(newProjects);

  try {
    const docRef = doc(db, "usersData", uid);
    await updateDoc(docRef, {
      projects: newProjects,
    });
    console.log("removed project with id: ", id);
  } catch (error) {
    console.log("project not removed from the server");
  }
};

export const swapProjects = async (uid, projects, setProjects, from, to) => {
  let newProjects = projects;
  let temp = newProjects[from];
  newProjects.splice(from, 1);
  newProjects.splice(to, 0, temp);
  setProjects(newProjects);

  try {
    const docRef = doc(db, "usersData", uid);
    await updateDoc(docRef, {
      projects: newProjects,
    });
    console.log("moving project from position", from, "to position", to);
  } catch (error) {
    console.log("project not moved in the server");
  }
};
