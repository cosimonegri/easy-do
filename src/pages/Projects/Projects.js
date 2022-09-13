import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import PageTitle from "components/PageTitle";
import Project from "components/Project";
import styles from "pages/Projects/projects.module.css";

export const Projects = () => {
  const projects = useSelector((state) => state.projects.projects);

  let projectElements = projects.map((project) => {
    return <Project project={project} key={project.id} />;
  });

  return (
    <Main>
      <PageTitle title={"Projects"} />
      <div id={styles["page-content"]}>{projectElements}</div>
    </Main>
  );
};
