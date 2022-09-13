import React from "react";
import { useSelector, useDispatch } from "react-redux";

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

import {
  addTask,
  setTaskTitle,
  setTaskDueDate,
  setTaskProject,
} from "redux/tasks.slice";
import { useAuth } from "contexts/auth-context";

const AddTaskPopup = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const newTask = useSelector((state) => state.tasks.newTask);
  const projects = useSelector((state) => state.projects.projects);
  const { currentUser } = useAuth();

  const getDateOneYearForward = () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  };

  const changeTitle = (event) => {
    dispatch(setTaskTitle(event.target.value));
  };
  const changeProject = (project) => {
    if (project) {
      dispatch(setTaskProject(project));
    } else {
      dispatch(setTaskProject({ id: "", title: "" }));
    }
  };
  const changeDueDate = (date) => {
    console.log(date);
    dispatch(setTaskDueDate(date));
  };

  const isTaskValid = () => {
    return newTask.dueDate && newTask.title && newTask.title.length <= 200;
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    dispatch(addTask(currentUser.uid));
    handleClose();
  };

  const handleSubmitWithEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (isTaskValid()) {
        handleSubmitTask(event);
      }
    }
  };

  const projectElements = projects.map((project) => {
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
              <Dropdown.Item onClick={() => changeProject(null)}>
                No Project
              </Dropdown.Item>
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
