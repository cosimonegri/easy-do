import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, DropdownButton, Button } from "react-bootstrap";

import Textarea from "components/Textarea";
import ChooseDateDropdown from "components/TaskPopup/ChooseDateDropdown";
import ChooseProjectDropdown from "components/TaskPopup/ChooseProjectDropdown";

import {
  addTask,
  updateTask,
  setNewTaskTitle,
  setNewTaskUserId,
} from "redux/tasks.slice";
import { closeTaskPopup } from "redux/popups.slice";
import { useAuth } from "contexts/auth-context";

import { isTaskValid } from "utils/helpers/valid.helpers";
import { getPrettyDateString } from "utils/helpers/date.helpers";
import { getProjectTitleFromId } from "utils/helpers/helpers";

import styles from "components/TaskPopup/taskpopup.module.css";

export const TaskPopup = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const newTask = useSelector((state) => state.tasks.newTask);
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const show = useSelector((state) => state.popups.showTaskPopup);
  const isCreating = useSelector((state) => state.popups.isCreating);
  const isUpdating = useSelector((state) => state.popups.isUpdating);

  const changeTitle = (event) => {
    dispatch(setNewTaskTitle(event.target.value));
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    if (!isTaskValid(newTask)) {
      return;
    }
    if (isCreating) {
      dispatch(addTask());
      dispatch(closeTaskPopup());
    } else if (isUpdating) {
      dispatch(updateTask());
      dispatch(closeTaskPopup());
    } else {
      throw new Error("Action not specified (create or update.");
    }
  };

  const handlePopupClose = () => {
    const dateDropdown = document.getElementById("choose-date-dropdown");
    const projectDropdown = document.getElementById("choose-project-dropdown");
    if (
      dateDropdown.ariaExpanded === "false" &&
      projectDropdown.ariaExpanded === "false"
    ) {
      dispatch(closeTaskPopup());
    }
  };

  const getTaskProjectTitle = () => {
    const projectTitle = getProjectTitleFromId(
      newTask.projectId,
      projects,
      memberships
    );
    if (projectTitle) {
      return projectTitle;
    } else {
      return "No Project";
    }
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(setNewTaskUserId(currentUser.uid));
    }

    const textarea = document.getElementById("focus-textarea");
    if (textarea) {
      textarea.focus();
      textarea.selectionStart = textarea.value.length;
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handlePopupClose} id="add-task-popup">
      <Modal.Body>
        <Textarea
          text={newTask.title}
          onChangeFunction={changeTitle}
          onSubmitFunction={handleSubmitTask}
          placeholder="Task description"
          rows={3}
        />

        <div id={styles["buttons-row"]}>
          <span id={styles["left-buttons"]}>
            <DropdownButton
              id={"choose-date-dropdown"}
              title={getPrettyDateString(newTask.dueDate)}
              size="sm"
              variant="outline-secondary"
            >
              <ChooseDateDropdown />
            </DropdownButton>

            <DropdownButton
              id={"choose-project-dropdown"}
              className={styles["choose-project-dropdown"]}
              title={getTaskProjectTitle()}
              size="sm"
              variant="outline-secondary"
            >
              <ChooseProjectDropdown />
            </DropdownButton>
          </span>

          <span id={styles["right-buttons"]}>
            <Button
              id={styles["cancel-btn"]}
              type="button"
              onClick={() => dispatch(closeTaskPopup())}
              variant="outline-secondary"
            >
              Cancel
            </Button>

            <button
              id={styles["submit-btn"]}
              type="submit"
              onClick={handleSubmitTask}
              disabled={!isTaskValid(newTask)}
            >
              {isCreating ? "Add Task" : isUpdating ? "Update Task" : ""}
            </button>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
