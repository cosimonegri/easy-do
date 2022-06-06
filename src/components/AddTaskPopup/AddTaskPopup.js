import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";

import { useAuth } from "contexts/auth-context";
import { useData } from "hooks/useData";
// import styles from 'components/AddTaskPopup/index.module.css';

export const AddTaskPopup = ({ close }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [projectId, setProjectId] = useState(null);
  // const [taskDate, setTaskDate] = useState(new Date());

  const { currentUser } = useAuth();
  const { addTask } = useData();
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

  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (taskTitle) {
      addTask(taskTitle, projectId);
    }
    close();
  };

  const handleEnter = (e) => {
    // when Enter pressed, not new line but submit
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitTask(e);
    }
  };

  return (
    <div
      className="add-task-popup-wrapper"
      style={{
        width:
          windowWidth > 750 ? "550px" : (windowWidth - 70).toString() + "px",
        height:
          windowHeight > 290 ? "230px" : (windowHeight - 60).toString() + "px",
      }}
    >
      <hr className="add-task-popup-divider" />

      <div className="add-task-popup-content">
        <textarea
          type="text"
          className="add-task-popup-textarea"
          id="taskName"
          name="taskName"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyPress={handleEnter}
          autoFocus
          placeholder="Task name"
        />

        <div className="add-task-popup-button-layer1">
          {/* <Popup
                        trigger={<button type="button" className="add-task-popup-btn1">Today</button>}
                        position="bottom center"
                        arrow={false}
                        nested
                        contentStyle={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}
                    >
                        {close => (
                            <DatePicker
                                selected={taskDate}
                                onChange={(date) => setTaskDate(date)}
                                dateFormat={"dd/MM/yyyy"}
                                inline
                                arrowStyle={false}
                                minDate={new Date()}
                                fixedHeight={false}
                            />
                        )}
                    </Popup> */}

          <Popup
            trigger={
              <button type="button" className="add-task-popup-btn1">
                {taskCategory || taskProject}
              </button>
            }
            position="bottom center"
            nested
          >
            {(close) => (
              <ChooseCategoryPopup
                close={close}
                setTaskProject={setTaskProject}
                setTaskCategory={setTaskCategory}
              />
            )}
          </Popup>
        </div>

        <div className="add-task-popup-button-layer2">
          <button
            type="submit"
            className="add-task-popup-submit-btn"
            onClick={handleSubmitTask}
          >
            Add task
          </button>
          <button
            type="button"
            className="add-task-popup-cancel-btn"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ChooseCategoryPopup = ({ close, setTaskProject, setTaskCategory }) => {
  const { projects, categories } = useData();

  const handleSubmitProject = (project) => {
    setTaskProject(project);
    setTaskCategory(null);
    close();
  };

  const handleSubmitCategory = (category) => {
    setTaskProject(null);
    setTaskCategory(category);
    close();
  };

  const categoriesButtons = [
    <div key="1">
      <button type="button" onClick={() => handleSubmitCategory("Inbox")}>
        Inbox
      </button>
    </div>,
    ...categories.map((category) => {
      return (
        <div key={category["id"]}>
          <button
            type="button"
            onClick={() => handleSubmitCategory(category["name"])}
          >
            {category["name"]}
          </button>
        </div>
      );
    }),
    ...projects.map((project) => {
      return (
        <div key={project["id"]}>
          <button
            type="button"
            onClick={() => handleSubmitProject(project["name"])}
          >
            {project["name"]}
          </button>
        </div>
      );
    }),
  ];

  return <div>{categoriesButtons}</div>;
};
