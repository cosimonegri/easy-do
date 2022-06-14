import React from "react";
import ReactDOM from "react-dom";

import styles from "layouts/Modal/modal.module.css";

export const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <>
      <div id={styles["overlay"]} />
      <div id={styles["popup"]}>{children}</div>
    </>,
    document.getElementById("portal")
  );
};
