import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProject } from "redux/projects.slice";
import { deleteMembership } from "redux/memberships.slice";
import { useAuth } from "contexts/auth-context";

import HoverIcon from "components/HoverIcon";

import rightIcon from "images/right.png";
import rightBlueIcon from "images/right-blue.png";
import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import styles from "pages/Projects/singleproject.module.css";

const SingleProject = ({ projectId, projectTitle, iAmOwner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleDeleteOrLeaveProject = () => {
    if (iAmOwner) {
      dispatch(deleteProject(projectId));
    } else {
      dispatch(
        deleteMembership({ projectId: projectId, userEmail: currentUser.email })
      );
    }
  };

  return (
    <div className={styles["project-container"]}>
      <span className={styles["left-content"]}>
        <HoverIcon
          icon={rightIcon}
          hoverIcon={rightBlueIcon}
          onClickFunction={() => navigate("/app/projects/" + projectId)}
        />

        <span className={styles.text}>{projectTitle}</span>
      </span>

      <span className={styles["right-content"]}>
        <HoverIcon
          icon={binIcon}
          hoverIcon={binRedIcon}
          onClickFunction={handleDeleteOrLeaveProject}
        />
      </span>
    </div>
  );
};

export default SingleProject;
