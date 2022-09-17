import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Textarea from "components/Textarea";

import {
  addProject,
  updateProject,
  setNewProjectTitle,
  setNewProjectUserId,
} from "redux/projects.slice";
import { closeProjectPopup } from "redux/popups.slice";
import { useAuth } from "contexts/auth-context";

import { MAX_PROJECTS } from "utils/constants/constants";
import { isProjectValid } from "utils/helpers/valid.helpers";
import { getToastStyle } from "utils/helpers/helpers";

import styles from "components/projectpopup.module.css";

const ProjectPopup = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);
  const newProject = useSelector((state) => state.projects.newProject);

  const show = useSelector((state) => state.popups.showProjectPopup);
  const isCreating = useSelector((state) => state.popups.isCreating);
  const isUpdating = useSelector((state) => state.popups.isUpdating);

  const changeTitle = (event) => {
    dispatch(setNewProjectTitle(event.target.value));
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    if (!isProjectValid(newProject)) {
      return;
    }
    if (projects.length + memberships.length >= MAX_PROJECTS) {
      toast.dismiss();
      toast.error(
        `You've reached the limit of ${MAX_PROJECTS} projects.`,
        getToastStyle()
      );
      return;
    }
    if (isCreating) {
      dispatch(addProject());
      dispatch(closeProjectPopup());
    } else if (isUpdating) {
      dispatch(updateProject());
      dispatch(closeProjectPopup());
    } else {
      throw new Error("Action not specified (create or update.");
    }
  };

  useEffect(() => {
    dispatch(setNewProjectUserId(currentUser.uid));

    const textarea = document.getElementById("focus-textarea");
    if (textarea) {
      textarea.focus();
      textarea.selectionStart = textarea.value.length;
    }
  }, [show]);

  return (
    <Modal show={show} onHide={() => dispatch(closeProjectPopup())}>
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
            onClick={() => dispatch(closeProjectPopup())}
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
            {isCreating ? "Add Project" : isUpdating ? "Update Project" : ""}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectPopup;
