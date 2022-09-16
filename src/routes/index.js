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
import Invitations from "pages/Invitations";
import ProjectPage from "pages/ProjectPage";

export const RoutesList = () => {
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const getProjectPages = () => {
    const projectPages = [];

    for (let project of projects) {
      projectPages.push(
        <Route
          key={project.id}
          path={"/app/projects/" + project.id}
          element={
            <RequireAuth>
              <ProjectPage
                projectId={project.id}
                projectTitle={project.title}
              />
            </RequireAuth>
          }
        />
      );
    }
    for (let membership of memberships) {
      projectPages.push(
        <Route
          key={membership.projectId}
          path={"/app/projects/" + membership.projectId}
          element={
            <RequireAuth>
              <ProjectPage
                projectId={membership.projectId}
                projectTitle={membership.projectTitle}
              />
            </RequireAuth>
          }
        />
      );
    }

    return projectPages;
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
      <Route
        path="/app/invitations"
        element={
          <RequireAuth>
            <Invitations />
          </RequireAuth>
        }
      />

      {getProjectPages()}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
