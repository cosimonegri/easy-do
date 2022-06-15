import React from "react";
import ReactDOM from "react-dom";
import { Container } from "react-bootstrap";

import styles from "layouts/Modal/modal.module.css";

export const Modal = ({ handleClosing, children }) => {
  return ReactDOM.createPortal(
    <>
      <div id={styles.overlay} onClick={handleClosing} />
      <div id={styles.popup}>{children}</div>
    </>,
    document.getElementById("portal")
  );
};
