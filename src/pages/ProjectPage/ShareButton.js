import React from "react";

import { blue, grey1 } from "utils/constants";
import styles from "pages/ProjectPage/sharebutton.module.css";

const ShareButton = ({ onClickFunction }) => {
  return (
    <button
      className={styles["share-button"]}
      style={{ backgroundColor: blue, color: grey1 }}
      type="button"
      onClick={onClickFunction}
    >
      Share
    </button>
  );
};

export default ShareButton;
