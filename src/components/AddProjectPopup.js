import React, { useState, useEffect, useContext } from "react";
import { Popup } from "reactjs-popup";
import { BsFillCircleFill } from "react-icons/bs";

import { useAuth } from "contexts/auth-context";
import { useData } from "contexts/data-context";
import { addProject } from "utils/helpers";
import { colorsList, projectsColorMap } from "utils/constants";

export const AddProjectPopup = ({ close }) => {
  const { currentUser } = useAuth();
  const { projects, setProjects } = useData();
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState("Charcoal");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (
      projectName &&
      !projects.map((project) => project["name"]).includes(projectName)
    ) {
      addProject(
        currentUser.uid,
        projects,
        setProjects,
        projectName,
        projectColor
      );
    }
    close();
  };

  const handleEnter = (e) => {
    // when Enter pressed, not new line but submit
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitProject(e);
    }
  };

  return (
    <div className="add-project-popup-wrapper">
      <header className="add-project-popup-header">
        <h4 style={{ paddingLeft: "24px" }}>Add project</h4>
      </header>
      <hr className="add-project-popup-divider" style={{ top: "56px" }} />

      <div className="add-project-popup-content">
        <form autoComplete="off">
          <p className="add-project-popup-label">Name</p>
          <input
            type="text"
            className="add-project-popup-input"
            id="projectName"
            name="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyPress={handleEnter}
            autoFocus
          />
          <p className="add-project-popup-label">Color</p>
        </form>

        <Popup
          trigger={
            <button type="button" className="add-project-popup-color-btn">
              <BsFillCircleFill
                size={10}
                color={projectsColorMap[projectColor]}
                style={{ marginRight: "10px", marginLeft: "6px" }}
              />
              {projectColor}
            </button>
          }
          position={"bottom center"}
          nested
        >
          {(close) => (
            <ChooseColorPopup close={close} setProjectColor={setProjectColor} />
          )}
        </Popup>
      </div>

      <hr className="add-project-popup-divider" />
      <div className="add-project-popup-footer">
        <button
          type="button"
          className="add-project-popup-cancel-btn"
          onClick={close}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="add-project-popup-submit-btn"
          onClick={handleSubmitProject}
        >
          Add
        </button>
      </div>
    </div>
  );
};

const ChooseColorPopup = ({ close, setProjectColor }) => {
  const handleSubmitColor = (color) => {
    setProjectColor(color);
    close();
  };

  const colorsButtons = colorsList.map((colorObj) => {
    return (
      <div key={colorObj["id"]}>
        <button
          type="button"
          style={{ width: "100%", textAlign: "left" }}
          onClick={() => handleSubmitColor(colorObj["name"])}
        >
          <BsFillCircleFill
            size={10}
            color={colorObj["color"]}
            style={{ marginRight: "10px" }}
          />
          {colorObj["name"]}
        </button>
      </div>
    );
  });

  return (
    <div style={{ height: "200px", overflow: "auto" }}>{colorsButtons}</div>
  );
};
