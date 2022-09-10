import React from "react";

import { grey3 } from "utils/constants";
import styles from "layouts/TopBar/profilebutton.module.css";

const imgRadius = 18;

const ProfileButton = ({ onClickFunction, currentUser, isLoggingOut }) => {
  return (
    <button
      id={styles["circle-btn"]}
      style={{ backgroundColor: grey3 }}
      type="button"
      onClick={onClickFunction}
      disabled={isLoggingOut}
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
  );
};

export default ProfileButton;
