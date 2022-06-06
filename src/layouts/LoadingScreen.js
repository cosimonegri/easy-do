import React from "react";

export const LoadingScreen = () => {
  return (
    <h1
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      Retrieving user data...
    </h1>
  );
};
