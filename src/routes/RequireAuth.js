import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

export const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth(); // if currentUser !== null, user logged in

  return currentUser && currentUser.emailVerified ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
