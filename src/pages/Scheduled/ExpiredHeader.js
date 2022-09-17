import React from "react";
import { red } from "utils/constants/constants";
import styles from "pages/Scheduled/expiredheader.module.css";

const ExpiredHeader = () => {
  return (
    <div id={styles.expired} style={{ color: red }}>
      Expired
    </div>
  );
};

export default ExpiredHeader;
