import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "layouts/loadingscreen.module.css";

export const LoadingScreen = () => {
  return (
    <div id={styles.loading}>
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  );
};
