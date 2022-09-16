export const isTaskValid = (task) => {
  //! levare dueDate per poter creare task senza data
  return task.dueDate && task.title && task.title.length <= 200;
};

export const isProjectValid = (project) => {
  return project.title && project.title.length <= 60;
};

export const isInvitationValid = (invitation) => {
  return invitation.toEmail;
};
