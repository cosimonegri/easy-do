import React from "react";

import Task from "components/Task";
import Main from "layouts/Main";
import { useData } from "contexts/data-context";

import styles from "pages/Home/home.module.css";

export const Home = () => {
  const { myTasks, sharedTasks, deleteTask } = useData();

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId); // errors handles in the function
  };

  let taskElements = [...myTasks, ...sharedTasks].map((task) => {
    return <Task task={task} key={task.id} />;
  });

  return (
    <Main>
      <div id={styles["page-header"]}>
        <h1>Home</h1>
      </div>
      <div id={styles["page-content"]}>{taskElements}</div>
    </Main>
  );
};
