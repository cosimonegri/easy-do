import React from "react";
import { useDispatch } from "react-redux";

import { deleteTask } from "redux/tasks.slice";

import HoverIcon from "components/HoverIcon";

import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import {
  getPrettyDateString,
  getTodayDate,
  isDateBefore,
} from "utils/helpers/date.helpers";
import { red } from "utils/constants/constants";

import styles from "components/task.module.css";

const Task = ({ task, dateInFooter }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const getFooter = () => {
    if (!dateInFooter) {
      return task.projectTitle;
    }
    return getPrettyDateString(task.dueDate.toDate());
  };

  const isTaskExpired = () => {
    const date = task.dueDate.toDate();
    const today = getTodayDate();
    if (dateInFooter && isDateBefore(date, today)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles["task-container"]}>
      <span className={styles["left-content"]}>
        <span className={styles["main-part"]}>{task.title}</span>
        <span
          className={styles["footer-part"]}
          style={{ color: isTaskExpired() ? red : "grey" }}
        >
          {getFooter()}
        </span>
      </span>

      <span className={styles["right-content"]}>
        <HoverIcon
          icon={binIcon}
          hoverIcon={binRedIcon}
          onClickFunction={handleDeleteTask}
        />
      </span>
    </div>
  );
};

export default Task;
