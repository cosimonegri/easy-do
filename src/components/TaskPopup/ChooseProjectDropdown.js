import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";

import { setNewTaskProjectId } from "redux/tasks.slice";

const ChooseProjectDropdown = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const changeProject = (project) => {
    if (project) {
      dispatch(setNewTaskProjectId(project.id));
    } else {
      dispatch(setNewTaskProjectId(""));
    }
  };

  const getElements = () => {
    const elements = [];

    // "No Project" element
    elements.push(
      <Dropdown.Item key={0} onClick={() => changeProject(null)}>
        No Project
      </Dropdown.Item>
    );

    // Divider
    if (projects.length > 0 || memberships.length > 0) {
      elements.push(<hr key={1} style={{ margin: "4px 0" }} />);
    }

    // Projects elements
    for (let project of projects) {
      elements.push(
        <Dropdown.Item key={project.id} onClick={() => changeProject(project)}>
          {project.title}
        </Dropdown.Item>
      );
    }

    // Membership elements
    for (let membership of memberships) {
      elements.push(
        <Dropdown.Item
          key={membership.projectId}
          onClick={() =>
            changeProject({
              id: membership.projectId,
              title: membership.projectTitle,
            })
          }
        >
          {membership.projectTitle}
        </Dropdown.Item>
      );
    }

    return elements;
  };

  return <>{getElements()}</>;
};

export default ChooseProjectDropdown;
