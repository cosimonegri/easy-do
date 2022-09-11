import React from "react";
import { useDispatch } from "react-redux";

import { deleteTask } from "redux/tasks.slice";
import styles from "components/task.module.css";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className={styles["task-container"]}>
      <span className={styles["left-content"]}>
        {task.title} {task.projectTitle}
      </span>
      <span className={styles["right-content"]}>
        <button type="button" onClick={handleDeleteTask}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default Task;
