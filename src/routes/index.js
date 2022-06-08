import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { useData } from "contexts/data-context";

import { RequireAuth } from "routes/RequireAuth";
import { RequireLogout } from "routes/RequireLogout";
import Signup from "pages/Signup";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";

import Home from "pages/Home";
import Today from "pages/Today";
import Tomorrow from "pages/Tomorrow";
import Upcoming from "pages/Upcoming";
import Projects from "pages/Projects";
// import Project from "pages/Project";
import Error404 from "pages/Error404";

export const RoutesList = () => {
  const { projects, isRetrievingData } = useData();

  // const projectPages = projects.map((project) => {
  //   return (
  //     <Route
  //       key={project["id"]}
  //       path={"/app/project/" + project["id"]}
  //       element={
  //         <RequireAuth>
  //           {" "}
  //           <Project project={project} />{" "}
  //         </RequireAuth>
  //       }
  //     />
  //   );
  // });

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
        path="/app"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/app/today"
        element={
          <RequireAuth>
            <Today />
          </RequireAuth>
        }
      />
      <Route
        path="/app/tomorrow"
        element={
          <RequireAuth>
            <Tomorrow />
          </RequireAuth>
        }
      />
      <Route
        path="/app/upcoming"
        element={
          <RequireAuth>
            <Upcoming />
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

      {/* {projectPages} */}

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
