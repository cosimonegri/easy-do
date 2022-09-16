import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import Textarea from "components/Textarea";

import { addProject, setProjectTitle } from "redux/projects.slice";

import { isProjectValid } from "utils/helpers/valid.helpers";
import styles from "components/addprojectpopup.module.css";

const AddProjectPopup = ({ show, close }) => {
  const dispatch = useDispatch();
  const newProject = useSelector((state) => state.projects.newProject);

  const changeTitle = (event) => {
    dispatch(setProjectTitle(event.target.value));
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    if (isProjectValid(newProject)) {
      dispatch(addProject());
      close();
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Body>
        <Textarea
          text={newProject.title}
          onChangeFunction={changeTitle}
          onSubmitFunction={handleSubmitProject}
          placeholder="Project title"
          rows={2}
        />

        <div id={styles["buttons-row"]}>
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
            onClick={handleSubmitProject}
            disabled={!isProjectValid(newProject)}
          >
            Add Project
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddProjectPopup;
