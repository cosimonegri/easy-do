import React from "react";
import styles from "components/task.module.css";

const Task = ({ task }) => {
  console.log(task);
  return (
    <div className={styles["task-container"]}>
      <span className={styles["left-content"]}>
        {task.title} {task.projectTitle}
      </span>
      <span className={styles["right-content"]}>Delete</span>
    </div>
  );
};

export default Task;

{
  /* <div className={styles.task} key={task.id}>
  <p className={styles["task-text"]}>
    {task.title} {task.id} {task.projectId && task.projectId}
  </p>
  <button type="button" onClick={() => handleDeleteTask(task.id)}>
    Delete Task
  </button>
</div>; */
}
