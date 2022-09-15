import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

import { addProject, setProjectTitle } from "redux/projects.slice";

import { isProjectValid } from "utils/helpers/valid.helpers";

const AddProjectPopup = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const newProject = useSelector((state) => state.projects.newProject);

  const changeTitle = (event) => {
    dispatch(setProjectTitle(event.target.value));
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    dispatch(addProject());
    handleClose();
  };

  const handleSubmitWithEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (isProjectValid(newProject)) {
        handleSubmitProject(event);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="projectTitle">
            <Form.Control
              as="textarea"
              type="text"
              value={newProject.title}
              onChange={changeTitle}
              onKeyPress={handleSubmitWithEnter}
              placeholder="Project name"
              rows={3}
              autoFocus
              spellCheck={false}
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>

        <Row className="mt-3 d-flex align-items-center">
          <Col
            xs={{ span: 2, offset: 7 }}
            className="d-flex justify-content-end"
          >
            <Button variant="outline-primary" onClick={handleClose}>
              Close
            </Button>
          </Col>

          <Col
            xs={3}
            className="d-flex justify-content-end"
            style={{ paddingLeft: 0 }}
          >
            <Button
              variant="primary"
              disabled={!isProjectValid(newProject)}
              onClick={handleSubmitProject}
            >
              Add Project
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddProjectPopup;
