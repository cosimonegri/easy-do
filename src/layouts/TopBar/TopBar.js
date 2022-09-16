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

import { grey1, grey2 } from "utils/constants/constants";
import styles from "layouts/TopBar/topbar.module.css";

export const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(""); //! make toast

  const handleLogout = async (e) => {
    e.preventDefault();
    // setError("");
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      // setError("Failed to log out");
      console.log("failed to log out");
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

      <header id={styles["header-outer"]}>
        <div id={styles["header-inner"]} style={{ backgroundColor: grey1 }}>
          <span id={styles["left-header"]}>
            <AddButton text={"Add Task"} onClickFunction={openAddTaskPopup} />
            <AddButton
              text={"Add Project"}
              onClickFunction={openAddProjectPopup}
            />
          </span>

          <span id={styles["right-header"]}>
            <LogoutButton
              onClickFunction={handleLogout}
              isLoggingOut={isLoggingOut}
            />
          </span>
        </div>
        <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
      </header>
    </>
  );
};
