import React from "react";
import { useAuth } from "contexts/auth-context";
import { useData } from "hooks/useData";

import { removeProject } from "utils/helpers";
import styles from "components/ProjectOptionsPopup/index.module.css";

export const Button = ({ project, buttonData }) => {
  const { currentUser } = useAuth();
  const { projects, setProjects } = useData();

  const handleClick = () => {
    if (buttonData["action"] === "delete")
      removeProject(currentUser.uid, projects, setProjects, project["id"]);
  };

  return (
    <button
      type="button"
      className={styles["option-btn"]}
      onClick={handleClick}
    >
      {buttonData["text"]}
    </button>
  );
};
