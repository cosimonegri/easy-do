import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProject } from "redux/projects.slice";

import HoverIcon from "components/HoverIcon";

import rightIcon from "images/right.png";
import rightBlueIcon from "images/right-blue.png";
import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import styles from "components/project.module.css";

const Project = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProject = () => {
    dispatch(deleteProject(project.id));
  };

  return (
    <div className={styles["project-container"]}>
      <span className={styles["left-content"]}>
        <HoverIcon
          icon={rightIcon}
          hoverIcon={rightBlueIcon}
          onClickFunction={() => navigate("/app/project/" + project.id)}
        />

        <span className={styles.text}>{project.title}</span>
      </span>

      <span className={styles["right-content"]}>
        <HoverIcon
          icon={binIcon}
          hoverIcon={binRedIcon}
          onClickFunction={handleDeleteProject}
        />
      </span>
    </div>
  );
};

export default Project;
