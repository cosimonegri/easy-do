import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

import { clearNewTask, setNewTaskProjectId } from "redux/tasks.slice";
import { clearNewProject } from "redux/projects.slice";
import {
  openTaskPopup,
  openProjectPopup,
  setIsCreating,
} from "redux/popups.slice";

import AddButton from "layouts/SideBar/AddButton";
import LogoutButton from "layouts/SideBar/LogoutButton";
import PageButton from "layouts/SideBar/PageButton";

import homeIcon from "images/home.png";
import homeBlueIcon from "images/home-blue.png";
import clockIcon from "images/clock.png";
import clockBlueIcon from "images/clock-blue.png";
import folderIcon from "images/folder.png";
import folderBlueIcon from "images/folder-blue.png";
import bellIcon from "images/bell.png";
import bellBlueIcon from "images/bell-blue.png";

import { grey2 } from "utils/constants/constants";
import { getProjectTitleFromId } from "utils/helpers/helpers";

import styles from "layouts/SideBar/sidebar.module.css";

const pageButtonsData = [
  ["home", homeIcon, homeBlueIcon],
  ["scheduled", clockIcon, clockBlueIcon],
  ["projects", folderIcon, folderBlueIcon],
  ["invitations", bellIcon, bellBlueIcon],
];

export const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const updateProjectIfInProjectPage = () => {
    const urlWords = window.location.href.split("/");
    const potentialProjectId = urlWords[urlWords.length - 1];
    const potentialProjectTitle = getProjectTitleFromId(
      potentialProjectId,
      projects,
      memberships
    );
    // if there is a project with that id
    if (potentialProjectTitle) {
      dispatch(setNewTaskProjectId(potentialProjectId));
    }
  };

  const handleOpenTaskPopup = () => {
    dispatch(clearNewTask());
    updateProjectIfInProjectPage();
    dispatch(openTaskPopup());
    dispatch(setIsCreating());
  };

  const handleOpenProjectPopup = () => {
    dispatch(clearNewProject());
    dispatch(openProjectPopup());
    dispatch(setIsCreating());
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Failed to log out");
      setIsLoggingOut(false);
    }
  };

  const showTooltip = (tooltipId) => {
    document.getElementById(tooltipId).style.visibility = "visible";
  };

  const hideTooltip = (tooltipId) => {
    document.getElementById(tooltipId).style.visibility = "hidden";
  };

  const getPageButtons = () => {
    return pageButtonsData.map(([pageName, icon, blueIcon], index) => {
      return (
        <PageButton
          key={index}
          index={index}
          pageName={pageName}
          icon={icon}
          blueIcon={blueIcon}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
        />
      );
    });
  };

  return (
    <div id={styles["sidebar-outer"]}>
      <div id={styles["sidebar-inner"]} style={{ backgroundColor: "white" }}>
        <span>
          <AddButton text={"Task"} onClickFunction={handleOpenTaskPopup} />
          <AddButton
            text={"Project"}
            onClickFunction={handleOpenProjectPopup}
          />
        </span>

        <nav id={styles["nav"]}>{getPageButtons()}</nav>

        <LogoutButton
          onClickFunction={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </div>

      <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
    </div>
  );
};
