import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

import { clearTask } from "redux/tasks.slice";
import { clearProject } from "redux/projects.slice";

import AddTaskPopup from "components/AddTaskPopup";
import AddProjectPopup from "components/AddProjectPopup";
import AddButton from "layouts/SideBar/AddButton";
import LogoutButton from "layouts/SideBar/LogoutButton";
import PageButton from "layouts/SideBar/PageButton";

import homeIcon from "images/home.png";
import homeBlueIcon from "images/home-blue.png";
import clockIcon from "images/clock.png";
import clockBlueIcon from "images/clock-blue.png";
import folderIcon from "images/folder.png";
import folderBlueIcon from "images/folder-blue.png";

import { grey2 } from "utils/constants";
import styles from "layouts/SideBar/sidebar.module.css";

export const SideBar = () => {
  const pageButtonsData = [
    ["home", homeIcon, homeBlueIcon],
    ["scheduled", clockIcon, clockBlueIcon],
    ["projects", folderIcon, folderBlueIcon],
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const openAddTaskPopup = () => {
    dispatch(clearTask());
    setShowAddTaskPopup(true);
  };

  const openAddProjectPopup = () => {
    dispatch(clearProject());
    setShowAddProjectPopup(true);
  };

  const showTooltip = (tooltipId) => {
    document.getElementById(tooltipId).style.visibility = "visible";
  };

  const hideTooltip = (tooltipId) => {
    document.getElementById(tooltipId).style.visibility = "hidden";
  };

  const pageButtons = pageButtonsData.map(
    ([pageName, icon, blueIcon], index) => {
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
    }
  );

  return (
    <>
      <AddTaskPopup
        show={showAddTaskPopup}
        handleClose={() => setShowAddTaskPopup(false)}
      />

      <AddProjectPopup
        show={showAddProjectPopup}
        handleClose={() => setShowAddProjectPopup(false)}
      />

      <div id={styles["sidebar-outer"]}>
        <div id={styles["sidebar-inner"]} style={{ backgroundColor: "white" }}>
          <span>
            <AddButton text={"Task"} onClickFunction={openAddTaskPopup} />
            <AddButton text={"Project"} onClickFunction={openAddProjectPopup} />
          </span>

          <nav id={styles["nav"]}>{pageButtons}</nav>

          <LogoutButton
            onClickFunction={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        </div>

        <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
      </div>
    </>
  );
};
