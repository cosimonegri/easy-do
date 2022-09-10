import React from "react";
import DatePicker from "react-datepicker";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { useData } from "contexts/data-context";

const AddTaskPopup = ({ show, handleClose, newTask, dispatch }) => {
  const { addTask, myProjects } = useData();

  const getDateOneYearForward = () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  };

  const changeTitle = (event) => {
    dispatch({
      type: "update",
      payload: { key: "title", value: event.target.value },
    });
  };

  const changeProject = (project) => {
    dispatch({
      type: "update",
      payload: { key: "projectId", value: project.id },
    });
    dispatch({
      type: "update",
      payload: { key: "projectTitle", value: project.title },
    });
  };

  const setNoProject = () => {
    let project = { id: "", title: "" };
    changeProject(project);
  };

  const changeDueDate = (date) => {
    dispatch({
      type: "update",
      payload: { key: "dueDate", value: date },
    });
  };

  const isTaskValid = () => {
    return newTask.dueDate && newTask.title && newTask.title.length <= 200;
  };

  const handleSubmitTask = async (event) => {
    event.preventDefault();
    handleClose();

    try {
      const docRef = await addTask(newTask);
      console.log(`Task added with id ${docRef.id}`);
    } catch (error) {
      console.log("Could not add task.");
      console.log(error);
    }
  };

  const handleSubmitWithEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (isTaskValid()) {
        handleSubmitTask(event);
      }
    }
  };

  const projectElements = myProjects.map((project) => {
    console.log(project);
    return (
      <Dropdown.Item key={project.id} onClick={() => changeProject(project)}>
        {project.title}
      </Dropdown.Item>
    );
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Control
              as="textarea"
              type="text"
              value={newTask.title}
              onChange={changeTitle}
              onKeyPress={handleSubmitWithEnter}
              placeholder="Task name"
              rows={3}
              autoFocus
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>

        <Row>
          <Col>
            <DropdownButton
              title={
                newTask.projectTitle
                  ? " " + newTask.projectTitle
                  : " No Project"
              }
              id="taskProject"
              variant="secondary"
              size="sm"
              drop="start"
            >
              <Dropdown.Item onClick={setNoProject}>No Project</Dropdown.Item>
              <Dropdown.Divider />
              {projectElements}
            </DropdownButton>
          </Col>
        </Row>

        <Row className="mt-3 d-flex align-items-center">
          <Col xs={7}>
            <DatePicker
              selected={newTask.dueDate}
              onChange={changeDueDate}
              dateFormat="dd MMM yyyy"
              minDate={new Date()}
              maxDate={getDateOneYearForward()}
              placeholderText="Select a date"
              calendarStartDay={1}
            />
          </Col>

          <Col xs={2} className="p-0 d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Col>

          <Col xs={3} className="d-flex justify-content-end">
            <Button
              variant="primary"
              disabled={!isTaskValid()}
              onClick={handleSubmitTask}
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskPopup;
