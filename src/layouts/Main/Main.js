import React, { useState } from "react";
import TopBar from "layouts/TopBar";
import SideBar from "layouts/SideBar";

import styles from "layouts/Main/main.module.css";

export const Main = ({ children }) => {
  return (
    <>
      <TopBar />
      <SideBar />

      <div id={styles.main}>{children}</div>
    </>
  );
};
