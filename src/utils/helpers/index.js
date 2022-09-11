import { serverTimestamp } from "firebase/firestore";

export const userDataFromTemplate = (currentUser) => {
  return {
    name: currentUser.displayName,
    userId: currentUser.uid,
    emailVerified: currentUser.emailVerified,
    photoUrl: currentUser.photoURL,
    createdAt: currentUser.metadata.createdAt,
  };
};

export const invitationFromTemplate = (projectId, fromUserId, toUserEmail) => {
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
