import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteTask, setNewTask, setUpdateTaskId } from "redux/tasks.slice";
import { openTaskPopup, setIsUpdating } from "redux/popups.slice";

import HoverIcon from "components/HoverIcon";

import pencilIcon from "images/pencil.png";
import pencilBlueIcon from "images/pencil-blue.png";
import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import {
  getPrettyDateString,
  getTodayDate,
  isDateBefore,
} from "utils/helpers/date.helpers";
import { getProjectTitleFromId } from "utils/helpers/helpers";
import { red } from "utils/constants/constants";

import styles from "components/task.module.css";

const Task = ({ task, dateInFooter }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);

  const handleUpdateTask = () => {
    const taskId = task.id;
    const taskWithoutId = { ...task };
    delete taskWithoutId.id;
    taskWithoutId.dueDate = taskWithoutId.dueDate.toDate();

    dispatch(setNewTask(taskWithoutId));
    dispatch(setUpdateTaskId(taskId));
    dispatch(openTaskPopup());
    dispatch(setIsUpdating());
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
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

  const getFooter = () => {
    if (dateInFooter) {
      return getPrettyDateString(task.dueDate.toDate());
    }
    return getProjectTitleFromId(task.projectId, projects, memberships);
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
          icon={pencilIcon}
          hoverIcon={pencilBlueIcon}
          onClickFunction={handleUpdateTask}
        />
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
