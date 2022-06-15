import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

import { useData } from "contexts/data-context";

const AddProjectPopup = ({
  show,
  handleClose,
  newProjectTitle,
  setNewProjectTitle,
}) => {
  const { addProject } = useData(); //! impedire creazione 2 progetti con stesso nome

  const changeTitle = (event) => {
    setNewProjectTitle(event.target.value);
  };

  const isTitleValid = () => {
    return newProjectTitle && newProjectTitle.length <= 60;
  };

  const handleSubmitProject = async (event) => {
    event.preventDefault();
    handleClose();

    try {
      const docRef = await addProject(newProjectTitle);
      console.log(`Project added with id ${docRef.id}`);
    } catch (error) {
      console.log("Could not add project.");
      console.log(error);
    }
  };

  const handleSubmitWithEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (isTitleValid()) {
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
              value={newProjectTitle}
              onChange={changeTitle}
              onKeyPress={handleSubmitWithEnter}
              placeholder="Project name"
              rows={3}
              autoFocus
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>

        <Row className="mt-3 d-flex align-items-center">
          <Col
            xs={{ span: 2, offset: 6 }}
            className="p-0 d-flex justify-content-end"
          >
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Col>

          <Col xs={4} className="p-0 pr-2 d-flex justify-content-end">
            <Button
              variant="primary"
              disabled={!isTitleValid()}
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
