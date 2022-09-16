import { TOAST_TIME } from "utils/constants/constants";

export const userDataFromTemplate = (currentUser) => {
  return {
    name: currentUser.displayName,
    userId: currentUser.uid,
    emailVerified: currentUser.emailVerified,
    photoUrl: currentUser.photoURL,
    createdAt: currentUser.metadata.createdAt,
  };
};

export const getDbPath = (collectionName, documentName, parentProjectName) => {
  if (["tasks", "projects", "users"].includes(collectionName)) {
    if (documentName === undefined) {
      return collectionName;
    }
    return `${collectionName}/${documentName}`;
  }

  if (["invitations", "memberships"].includes(collectionName)) {
    return `projects/${parentProjectName}/${collectionName}/${documentName}`;
  }

  throw new Error("Invalid arguments.");
};

export const getProjectTitleFromId = (projectId, projects, memberships) => {
  for (let project of projects) {
    if (project.id === projectId) {
      return project.title;
    }
  }
  for (let membership of memberships) {
    if (membership.projectId === projectId) {
      return membership.projectTitle;
    }
  }
  return null;
};

export const getToastStyle = () => {
  return {
    autoClose: TOAST_TIME,
    position: "bottom-center",
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
  };
};
