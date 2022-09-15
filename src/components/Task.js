import React from "react";
import { useDispatch } from "react-redux";

import { deleteTask } from "redux/tasks.slice";

import HoverIcon from "components/HoverIcon";

import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import {
  getTodayDate,
  getTomorrowDate,
  areDatesEqual,
  isDateBefore,
  getMonthName,
} from "utils/helpers/date.helpers";
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

    const date = task.dueDate.toDate();
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();

    if (isDateBefore(date, today)) {
      return "Expired";
    } else if (areDatesEqual(date, today)) {
      return "Today";
    } else if (areDatesEqual(date, tomorrow)) {
      return "Tomorrow";
    } else {
      return `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`;
    }
  };

  return (
    <div className={styles["task-container"]}>
      <span className={styles["left-content"]}>
        <span className={styles["main-part"]}>{task.title}</span>
        <span className={styles["footer-part"]}>{getFooter()}</span>
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
