import React from "react";
import Main from "layouts/Main";
import { text } from "utils/constants";

export const Upcoming = () => {
  return (
    <Main>
      <div className="page-header">
        <h1>Upcoming</h1>
      </div>
      <div className="page-content">
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </Main>
  );
};
