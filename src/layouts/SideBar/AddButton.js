import React from "react";

import plusIcon from "images/plus.png";
import { grey1 } from "utils/constants/constants";
import styles from "layouts/SideBar/addbutton.module.css";

const iconSize = 20;

const AddButton = ({ text, onClickFunction }) => {
  return (
    <button
      className={styles["add-button"]}
      style={{ color: grey1 }}
      type="button"
      onClick={onClickFunction}
    >
      <span className={styles.content}>
        <img
          src={plusIcon}
          width={iconSize}
          height={iconSize}
          alt=""
          className={styles.icon}
        />
        {text}
      </span>
    </button>
  );
};

export default AddButton;
