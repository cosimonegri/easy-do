import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  deleteProject,
  setNewProject,
  setUpdateProjectId,
} from "redux/projects.slice";
import { openProjectPopup, setIsUpdating } from "redux/popups.slice";

import HoverIcon from "components/HoverIcon";

import rightIcon from "images/right.png";
import rightBlueIcon from "images/right-blue.png";
import pencilIcon from "images/pencil.png";
import pencilBlueIcon from "images/pencil-blue.png";
import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import styles from "pages/Projects/singleproject.module.css";

const SingleProject = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateProject = () => {
    const projectId = project.id;
    const projectWithoutId = { ...project };
    delete projectWithoutId.id;

    dispatch(setNewProject(projectWithoutId));
    dispatch(setUpdateProjectId(projectId));
    dispatch(openProjectPopup());
    dispatch(setIsUpdating());
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject(project.id));
  };

  return (
    <div className={styles["project-container"]}>
      <span className={styles["left-content"]}>
        <HoverIcon
          icon={rightIcon}
          hoverIcon={rightBlueIcon}
          onClickFunction={() => navigate("/app/projects/" + project.id)}
        />

        <span className={styles.text}>{project.title}</span>
      </span>

      <span className={styles["right-content"]}>
        <HoverIcon
          icon={pencilIcon}
          hoverIcon={pencilBlueIcon}
          onClickFunction={handleUpdateProject}
        />
        <HoverIcon
          icon={binIcon}
          hoverIcon={binRedIcon}
          onClickFunction={handleDeleteProject}
        />
      </span>
    </div>
  );
};

export default SingleProject;
