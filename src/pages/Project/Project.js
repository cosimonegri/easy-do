import React from "react";
import Main from "layouts/Main";
import { Task } from "components/Task";
import { useData } from "hooks/useData";

export const Project = ({ project }) => {
  const { tasks } = useData();

  const taskElements = tasks
    .filter((task) => task["project"] === project["name"])
    .map((task) => {
      return (
        <div key={task["id"]}>
          <Task task={task} />
          <hr className="divider" />
        </div>
      );
    });

  return (
    <Main>
      <header className="page-header">
        <h3>{project["name"]}</h3>
      </header>
      <div className="page-content">{taskElements}</div>
    </Main>
  );
};
