import React from "react";

import plusIcon from "images/plus.png";
import { blue, grey1 } from "utils/constants";
import styles from "layouts/TopBar/addbutton.module.css";

const iconSize = 20;

const AddButton = ({ text, onClickFunction }) => {
  return (
    <button
      className={styles["add-button"]}
      style={{ backgroundColor: blue, color: grey1 }}
      type="button"
      onClick={onClickFunction}
    >
      <span className={styles.content}>
        {text}
        <img
          src={plusIcon}
          width={iconSize}
          height={iconSize}
          alt=""
          className={styles.icon}
        />{" "}
      </span>
    </button>
  );
};

export default AddButton;
