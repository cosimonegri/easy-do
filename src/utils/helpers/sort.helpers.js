export const sortTasksByDate = (tasks) => {
  tasks.sort((task1, task2) => {
    const date1 = task1.dueDate.toDate();
    const date2 = task2.dueDate.toDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  });
};

export const sortProjectsByTitle = (projects) => {
  projects.sort((project1, project2) => {
    const title1 = project1.title;
    const title2 = project2.title;
    return title1 === title2 ? 0 : title1 > title2 ? 1 : -1;
  });
};

export const sortMembershipsByTitle = (memberships) => {
  memberships.sort((membership1, membership2) => {
    const title1 = membership1.projectTitle;
    const title2 = membership2.projectTitle;
    return title1 === title2 ? 0 : title1 > title2 ? 1 : -1;
  });
};
