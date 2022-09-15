import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import HalfPage from "layouts/HalfPage";
import PageTitle from "components/PageTitle";
import SingleProject from "pages/Projects/SingleProject";

import styles from "pages/Projects/projects.module.css";

export const Projects = () => {
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const getYourProjectElements = () => {
    return projects.map((project) => {
      return (
        <SingleProject
          key={project.id}
          projectId={project.id}
          projectTitle={project.title}
          iAmOwner={true}
        />
      );
    });
  };

  const getSharedProjectElements = () => {
    return memberships.map((membership) => {
      return (
        <SingleProject
          key={membership.projectId}
          projectId={membership.projectId}
          projectTitle={membership.projectTitle}
          iAmOwner={false}
        />
      );
    });
  };

  return (
    <Main>
      <div id={styles.wrapper}>
        <HalfPage side={"left"}>
          <PageTitle title={"Your Projects"} />
          <div className={styles["page-content"]}>
            {getYourProjectElements()}
          </div>
        </HalfPage>

        <HalfPage side={"right"}>
          <PageTitle title={"Shared Projects"} />
          <div className={styles["page-content"]}>
            {getSharedProjectElements()}
          </div>
        </HalfPage>
      </div>
    </Main>
  );
};
