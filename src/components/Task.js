import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteTask } from "redux/tasks.slice";

import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import styles from "components/task.module.css";

const Task = ({ task }) => {
  const iconSize = 20;

  const dispatch = useDispatch();
  const [bin, setBin] = useState(binIcon);

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className={styles["task-container"]}>
      <span className={styles["left-content"]}>
        {task.title} {task.projectTitle}
      </span>
      <span
        className={styles["right-content"]}
        onMouseOver={() => setBin(binRedIcon)}
        onMouseLeave={() => setBin(binIcon)}
      >
        <img
          src={bin}
          width={iconSize}
          height={iconSize}
          alt=""
          onClick={handleDeleteTask}
        />
      </span>
    </div>
  );
};

export default Task;
