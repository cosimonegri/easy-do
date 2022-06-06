import React from "react";
import Main from "layouts/Main";
import { text } from "utils/constants";

export const Tomorrow = () => {
  return (
    <Main>
      <div className="page-header">
        <h1>Tomorrow</h1>
      </div>
      <div className="page-content">
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </Main>
  );
};
