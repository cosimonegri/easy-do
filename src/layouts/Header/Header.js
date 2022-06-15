import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

import AddTaskPopup from "components/AddTaskPopup";
import AddProjectPopup from "components/AddProjectPopup";
import addIcon from "images/add.png";
import searchIcon from "images/search.png";

import { grey1, grey2, grey3 } from "utils/constants";
import styles from "layouts/Header/header.module.css";

const imgRadius = 18;
const iconSize = 24;

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

export const Header = () => {
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

  const handleSearch = () => {
    console.log("Open search popup");
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
            <img src={searchIcon} width={iconSize} height={iconSize} alt="" />
            <form id={styles["search-form"]}>
              <input
                id={styles["search-box"]}
                type="search"
                onClick={handleSearch}
                placeholder="Search..."
                // style={{ color: "grey" }} /// SISTEMARE IL COLORE (levarlo dal css)
              />
            </form>
          </span>

          <span id={styles["right-header"]}>
            <button type="button" onClick={handleAddTaskPopupOpen}>
              <img src={addIcon} width={iconSize} height={iconSize} alt="" />
            </button>

            <button type="button" onClick={handleAddProjectPopupOpen}>
              <img src={addIcon} width={iconSize} height={iconSize} alt="" />
            </button>

            <button
              id={styles["circle-btn"]}
              type="button"
              onClick={handleLogOut}
              disabled={isLoggingOut}
              style={{ backgroundColor: grey3 }}
            >
              {currentUser.photoURL && (
                <img
                  src={currentUser.photoURL}
                  width={2 * imgRadius}
                  height={2 * imgRadius}
                  alt=" "
                  style={{ borderRadius: imgRadius.toString() + "px" }}
                />
              )}
            </button>
          </span>
        </div>
        <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
      </header>
    </>
  );
};
