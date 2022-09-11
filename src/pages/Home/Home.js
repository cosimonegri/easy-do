import React from "react";
import { useSelector } from "react-redux";

import Task from "components/Task";
import Main from "layouts/Main";
import styles from "pages/Home/home.module.css";

export const Home = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  let taskElements = tasks.map((task) => {
    return <Task task={task} key={task.id} />;
  });

  // let taskElements = [...myTasks, ...sharedTasks].map((task) => {
  //   return <Task task={task} key={task.id} />;
  // });

  return (
    <Main>
      <div id={styles["page-header"]}>
        <h1>Home</h1>
      </div>
      <div id={styles["page-content"]}>{taskElements}</div>
    </Main>
  );
};
