import React from "react";
import { useDispatch } from "react-redux";

import { deleteProject } from "redux/projects.slice";
import styles from "components/project.module.css";

const Project = ({ project }) => {
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    dispatch(deleteProject(project.id));
  };

  return (
    <div className={styles["project-container"]}>
      <span className={styles["left-content"]}>{project.title}</span>
      <span className={styles["right-content"]}>
        <button type="button" onClick={handleDeleteProject}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default Project;
