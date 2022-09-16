import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, DropdownButton, Button } from "react-bootstrap";

import Textarea from "components/Textarea";
import ChooseDateDropdown from "components/AddTaskPopup/ChooseDateDropdown";
import ChooseProjectDropdown from "components/AddTaskPopup/ChooseProjectDropdown";

import { addTask, setTaskTitle } from "redux/tasks.slice";

import { isTaskValid } from "utils/helpers/valid.helpers";
import { getPrettyDateString } from "utils/helpers/date.helpers";

import styles from "components/AddTaskPopup/addtaskpopup.module.css";

export const AddTaskPopup = ({ show, close }) => {
  const dispatch = useDispatch();
  const newTask = useSelector((state) => state.tasks.newTask);

  const changeTitle = (event) => {
    dispatch(setTaskTitle(event.target.value));
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    if (isTaskValid(newTask)) {
      dispatch(addTask());
      close();
    }
  };

  const handlePopupClose = () => {
    const dateDropdown = document.getElementById("choose-date-dropdown");
    const projectDropdown = document.getElementById("choose-project-dropdown");
    if (
      dateDropdown.ariaExpanded === "false" &&
      projectDropdown.ariaExpanded === "false"
    ) {
      close();
    }
  };

  return (
    <Modal show={show} onHide={handlePopupClose} id={"add-task-popup"}>
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
              title={newTask.projectTitle ? newTask.projectTitle : "No Project"}
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
              onClick={close}
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
              Add Task
            </button>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
