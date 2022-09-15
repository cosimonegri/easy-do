export const isTaskValid = (task) => {
  //! forse levare dueDate
  return task.dueDate && task.title && task.title.length <= 200;
};

export const isProjectValid = (project) => {
  return project.title && project.title.length <= 60;
};

export const isInvitationValid = (invitation) => {
  return invitation.toEmail; //! check that email exists
};
