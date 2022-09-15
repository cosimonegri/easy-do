import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import HalfPage from "layouts/HalfPage";
import PageTitle from "components/PageTitle";
import Task from "components/Task";

import {
  getTodayDate,
  getTomorrowDate,
  areDatesEqual,
} from "utils/helpers/date.helpers";

import styles from "pages/Home/home.module.css";

export const Home = () => {
  const tasksWithoutProject = useSelector(
    (state) => state.tasks.tasksWithoutProject
  );
  const tasksWithProject = useSelector((state) => state.tasks.tasksWithProject);

  const getTaskElementsWithDate = (date) => {
    const taskElements = [];

    for (let task of tasksWithoutProject) {
      const taskDate = task.dueDate.toDate();
      if (areDatesEqual(date, taskDate)) {
        taskElements.push(
          <Task key={task.id} task={task} dateInFooter={false} />
        );
      }
    }
    for (let task of tasksWithProject) {
      const taskDate = task.dueDate.toDate();
      if (areDatesEqual(date, taskDate)) {
        taskElements.push(
          <Task key={task.id} task={task} dateInFooter={false} />
        );
      }
    }

    return taskElements;
  };

  const getTodayTaskElements = () => {
    const today = getTodayDate();
    return getTaskElementsWithDate(today);
  };

  const getTomorrowTaskElements = () => {
    const tomorrow = getTomorrowDate();
    return getTaskElementsWithDate(tomorrow);
  };

  return (
    <Main>
      <div id={styles.wrapper}>
        <HalfPage side={"left"}>
          <PageTitle title={"Today"} footerDate={getTodayDate()} />
          <div className={styles["page-content"]}>{getTodayTaskElements()}</div>
        </HalfPage>

        <HalfPage side={"right"}>
          <PageTitle title={"Tomorrow"} footerDate={getTomorrowDate()} />
          <div className={styles["page-content"]}>
            {getTomorrowTaskElements()}
          </div>
        </HalfPage>
      </div>
    </Main>
  );
};
