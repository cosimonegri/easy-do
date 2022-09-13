import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import PageTitle from "components/PageTitle";
import Task from "components/Task";
import ExpiredHeader from "pages/Scheduled/ExpiredHeader";
import DateHeader from "pages/Scheduled/DateHeader";

import {
  getTodayDate,
  areDatesEqual,
  isDateBefore,
} from "utils/helpers/date.helpers";

import styles from "pages/Scheduled/scheduled.module.css";

export const Scheduled = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const getElements = () => {
    const elements = [];
    const today = getTodayDate();
    let lastDate = null;

    for (let task of tasks) {
      const taskDate = task.dueDate.toDate();
      const dateBefore = isDateBefore(taskDate, today);

      if (dateBefore && elements.length === 0) {
        elements.push(<ExpiredHeader key={0} />);
      } else if (
        !dateBefore &&
        (lastDate === null || !areDatesEqual(lastDate, taskDate))
      ) {
        elements.push(
          <DateHeader key={taskDate.toDateString()} date={taskDate} />
        );
        lastDate = taskDate;
      }

      elements.push(<Task key={task.id} task={task} dateInFooter={false} />);
    }
    return elements;
  };

  return (
    <Main>
      <PageTitle title={"Scheduled"} />
      <div id={styles["page-content"]}>{getElements()}</div>
    </Main>
  );
};
