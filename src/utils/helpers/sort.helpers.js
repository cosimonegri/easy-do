import { isDateBefore } from "utils/helpers/date.helpers";

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

export const mergeTasksSortedByDate = (taskList1, taskList2) => {
  const allTasks = [];
  let i = 0;
  let j = 0;

  while (i < taskList1.length && j < taskList2.length) {
    let date1 = taskList1[i].dueDate.toDate();
    let date2 = taskList2[j].dueDate.toDate();

    if (!isDateBefore(date2, date1)) {
      allTasks.push(taskList1[i]);
      i++;
    } else {
      allTasks.push(taskList2[j]);
      j++;
    }
  }

  while (i < taskList1.length) {
    allTasks.push(taskList1[i]);
    i++;
  }
  while (j < taskList2.length) {
    allTasks.push(taskList2[j]);
    j++;
  }

  return allTasks;
};
