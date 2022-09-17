import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteMembership } from "redux/memberships.slice";

import HoverIcon from "components/HoverIcon";

import rightIcon from "images/right.png";
import rightBlueIcon from "images/right-blue.png";
import exitIcon from "images/exit.png";
import exitRedIcon from "images/exit-red.png";

import styles from "pages/Projects/singlemembership.module.css";

const SingleProject = ({ membership }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLeaveProject = () => {
    dispatch(
      deleteMembership({
        projectId: membership.projectId,
        userEmail: membership.userEmail,
      })
    );
  };

  return (
    <div className={styles["project-container"]}>
      <span className={styles["left-content"]}>
        <HoverIcon
          icon={rightIcon}
          hoverIcon={rightBlueIcon}
          onClickFunction={() =>
            navigate("/app/projects/" + membership.projectId)
          }
        />

        <span className={styles.text}>{membership.projectTitle}</span>
      </span>

      <span className={styles["right-content"]}>
        <HoverIcon
          icon={exitIcon}
          hoverIcon={exitRedIcon}
          onClickFunction={handleLeaveProject}
        />
      </span>
    </div>
  );
};

export default SingleProject;
