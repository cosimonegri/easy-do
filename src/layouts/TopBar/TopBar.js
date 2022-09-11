import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

import AddTaskPopup from "components/AddTaskPopup";
import AddProjectPopup from "components/AddProjectPopup";
import AddButton from "layouts/TopBar/AddButton";
import LogoutButton from "layouts/TopBar/LogoutButton";

import { grey1, grey2 } from "utils/constants";
import styles from "layouts/TopBar/topbar.module.css";

export const TopBar = () => {
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(""); //! make toast

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
      console.log("failed to log out");
      setIsLoggingOut(false);
    }
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
            <AddButton
              text={"Add Task"}
              onClickFunction={() => setShowAddTaskPopup(true)}
            />
            <AddButton
              text={"Add Project"}
              onClickFunction={() => setShowAddProjectPopup(true)}
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
