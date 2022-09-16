import React from "react";

import { blue, grey1 } from "utils/constants/constants";
import styles from "layouts/SideBar/logoutbutton.module.css";

const LogoutButton = ({ onClickFunction, isLoggingOut }) => {
  return (
    <button
      id={styles["logout-button"]}
      style={{ backgroundColor: blue, color: grey1 }}
      type="button"
      onClick={onClickFunction}
      disabled={isLoggingOut}
    >
      <span className={styles.content}>Log Out</span>
    </button>
  );
};

export default LogoutButton;
