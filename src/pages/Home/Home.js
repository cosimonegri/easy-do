import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import PageTitle from "components/PageTitle";
import Task from "components/Task";

import {
  getTodayDate,
  getTomorrowDate,
  areDatesEqual,
} from "utils/helpers/date.helpers";

import styles from "pages/Home/home.module.css";

export const Home = () => {
  //! remember to get also the shared tasks
  const tasks = useSelector((state) => state.tasks.tasks);

  const getTodayTaskElements = () => {
    const taskElements = [];
    const today = getTodayDate();

    for (let task of tasks) {
      const taskDate = task.dueDate.toDate();
      if (areDatesEqual(today, taskDate)) {
        taskElements.push(
          <Task key={task.id} task={task} dateInFooter={false} />
        );
      }
    }
    return taskElements;
  };

  const getTomorrowTaskElements = () => {
    const taskElements = [];
    const tomorrow = getTomorrowDate();

    for (let task of tasks) {
      const taskDate = task.dueDate.toDate();
      if (areDatesEqual(tomorrow, taskDate)) {
        taskElements.push(
          <Task key={task.id} task={task} dateInFooter={false} />
        );
      }
    }
    return taskElements;
  };

  return (
    <Main>
      <div id={styles.wrapper}>
        <div id={styles["left-section"]}>
          <PageTitle title={"Today"} footerDate={getTodayDate()} />
          <div className={styles["page-content"]}>{getTodayTaskElements()}</div>
        </div>

        <div id={styles["right-section"]}>
          <PageTitle title={"Tomorrow"} footerDate={getTomorrowDate()} />
          <div className={styles["page-content"]}>
            {getTomorrowTaskElements()}
          </div>
        </div>
      </div>
    </Main>
  );
};
