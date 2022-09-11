import React from "react";
import { useSelector } from "react-redux";

import Project from "components/Project";
import Main from "layouts/Main";
import styles from "pages/Projects/projects.module.css";

export const Projects = () => {
  const projects = useSelector((state) => state.projects.projects);

  let projectElements = projects.map((project) => {
    return <Project project={project} key={project.id} />;
  });

  return (
    <Main>
      <div id={styles["page-header"]}>
        <h1>Projects</h1>
      </div>
      <div id={styles["page-content"]}>{projectElements}</div>
    </Main>
  );
};
