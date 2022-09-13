import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { RequireAuth } from "routes/RequireAuth";
import { RequireLogout } from "routes/RequireLogout";
import Signup from "pages/Signup";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";

import Home from "pages/Home";
import Scheduled from "pages/Scheduled";
import Projects from "pages/Projects";
import ProjectPage from "pages/ProjectPage";
import Error404 from "pages/Error404";

export const RoutesList = () => {
  const projects = useSelector((state) => state.projects.projects);

  const getProjectPages = () => {
    return projects.map((project) => {
      return (
        <Route
          key={project.id}
          path={"/app/project/" + project.id}
          element={
            <RequireAuth>
              <ProjectPage project={project} />
            </RequireAuth>
          }
        />
      );
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/signup"
        element={
          <RequireLogout>
            <Signup />
          </RequireLogout>
        }
      />
      <Route
        path="/login"
        element={
          <RequireLogout>
            <Login />
          </RequireLogout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <RequireLogout>
            <ForgotPassword />
          </RequireLogout>
        }
      />
      <Route
        path="/app/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/app/scheduled"
        element={
          <RequireAuth>
            <Scheduled />
          </RequireAuth>
        }
      />
      <Route
        path="/app/projects"
        element={
          <RequireAuth>
            <Projects />
          </RequireAuth>
        }
      />

      {getProjectPages()}

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
