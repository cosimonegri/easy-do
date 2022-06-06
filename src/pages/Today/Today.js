import React from "react";
import Main from "layouts/Main";
import { text } from "utils/constants";

export const Today = () => {
  return (
    <Main>
      <div className="page-header">
        <h1>Today</h1>
      </div>
      <div className="page-content">
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </Main>
  );
};
