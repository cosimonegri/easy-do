import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { useData } from "contexts/data-context";
import { addProjectPopup } from "components/AddProjectPopup";

import addIcon from "images/add.png";
import searchIcon from "images/search.png";

import { grey1, grey2, grey3 } from "utils/constants";
import styles from "layouts/Header/header.module.css";

export const Header = () => {
  const { currentUser, logout } = useAuth();
  const { addTask } = useData();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const imgRadius = 18;
  const iconSize = 24;

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

  const handleAddTask = () => {
    addTask("Task", ""); // errors handles in the function
  };

  const handleSearch = () => {
    console.log("Open search popup");
  };

  return (
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
          <button type="button" onClick={handleAddTask}>
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
  );
};
