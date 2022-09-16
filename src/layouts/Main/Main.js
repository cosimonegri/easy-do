import React from "react";
import SideBar from "layouts/SideBar";

import styles from "layouts/Main/main.module.css";

export const Main = ({ children }) => {
  return (
    <>
      <SideBar />

      <div id={styles.main}>{children}</div>
    </>
  );
};
