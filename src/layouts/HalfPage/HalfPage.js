import React from "react";

import styles from "layouts/HalfPage/halfpage.module.css";

export const HalfPage = ({ side, children }) => {
  if (side === "left") {
    return <div className={styles["left-half"]}>{children}</div>;
  } else if (side === "right") {
    return <div className={styles["right-half"]}>{children}</div>;
  } else {
    throw new Error("Invalid side");
  }
};
