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
