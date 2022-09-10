import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

import ProfileButton from "layouts/TopBar/ProfileButton";
import AddButton from "layouts/TopBar/AddButton";
import AddTaskPopup from "components/AddTaskPopup";
import AddProjectPopup from "components/AddProjectPopup";

import { grey1, grey2 } from "utils/constants";
import styles from "layouts/TopBar/topbar.module.css";

const initialTask = {
  title: "",
  projectId: "",
  projectTitle: "",
  dueDate: new Date(),
  completed: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "update":
      return {
        ...state,
        [payload.key]: payload.value,
      };
    case "clear":
      return { ...initialTask };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const TopBar = () => {
  const [newTask, dispatch] = useReducer(reducer, initialTask);
  const [newProjectTitle, setNewProjectTitle] = useState("");

  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
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

  const handleAddTaskPopupOpen = () => {
    dispatch({ type: "clear" });
    setShowAddTaskPopup(true);
  };

  const handleAddTaskPopupClose = () => {
    setShowAddTaskPopup(false);
  };

  const handleAddProjectPopupOpen = () => {
    setNewProjectTitle("");
    setShowAddProjectPopup(true);
  };

  const handleAddProjectPopupClose = () => {
    setShowAddProjectPopup(false);
  };

  return (
    <>
      <AddTaskPopup
        show={showAddTaskPopup}
        handleClose={handleAddTaskPopupClose}
        newTask={newTask}
        dispatch={dispatch}
      />

      <AddProjectPopup
        show={showAddProjectPopup}
        handleClose={handleAddProjectPopupClose}
        newProjectTitle={newProjectTitle}
        setNewProjectTitle={setNewProjectTitle}
      />

      <header id={styles["header-outer"]}>
        <div id={styles["header-inner"]} style={{ backgroundColor: grey1 }}>
          <span id={styles["left-header"]}>
            <AddButton
              text={"Add Task"}
              onClickFunction={handleAddTaskPopupOpen}
            />
            <AddButton
              text={"Add Project"}
              onClickFunction={handleAddProjectPopupOpen}
            />
          </span>

          <span id={styles["right-header"]}>
            <ProfileButton
              onClickFunction={handleLogOut}
              currentUser={currentUser}
              isLoggingOut={isLoggingOut}
            />
          </span>
        </div>
        <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
      </header>
    </>
  );
};
