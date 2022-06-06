import React, { useEffect } from "react";
import Main from "layouts/Main";
import { useData } from "contexts/data-context";

import styles from "pages/Home/home.module.css";

export const Home = () => {
  const { myTasks, sharedTasks, deleteTask } = useData();

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId); // errors handles in the function
  };

  let taskElements = [...myTasks, ...sharedTasks].map((task) => {
    return (
      <div className={styles.task} key={task.id}>
        <p className={styles["task-text"]}>
          {task.title} {task.id} {task.projectId && task.projectId}
        </p>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>
          Delete Task
        </button>
      </div>
    );
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
