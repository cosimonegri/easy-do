import React, { useState } from "react";
import Header from "layouts/Header";
import Sidebar from "layouts/Sidebar";

import styles from "layouts/Main/main.module.css";

export const Main = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />

      <div id={styles.main}>{children}</div>
    </>
  );
};
