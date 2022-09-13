import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import Task from "components/Task";

export const ProjectPage = ({ project }) => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const getTaskElements = () => {
    const taskElements = [];
    for (let task of tasks) {
      if (task.projectId === project.id) {
        taskElements.push(
          <Task key={task.id} task={task} dateInFooter={true} />
        );
      }
    }
    return taskElements;
  };

  return (
    <Main>
      <header className="page-header">
        <h3>{project.title}</h3>
      </header>
      <div className="page-content">{getTaskElements()}</div>
    </Main>
  );
};
