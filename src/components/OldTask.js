import React, { useContext } from "react";
import { FiInbox } from "react-icons/fi";

import { useAuth } from "contexts/auth-context";
import { useData } from "hooks/useData";
import { removeTask } from "utils/helpers";

export const Task = ({ task }) => {
  const { currentUser } = useAuth();
  const { tasks, setTasks } = useData();
  const { id, text, project, category } = task;

  const handleRemoveTask = () => {
    removeTask(currentUser.uid, tasks, setTasks, id);
  };

  return (
    <div className="task-box">
      <div className="task-text-box">
        <p className="task-text">{text}</p>
        <button type="button" className="right-btn" onClick={handleRemoveTask}>
          remove
        </button>
      </div>
      <div className="task-category">
        <span style={{ float: "right" }}>
          {category + " "}
          {category === "Inbox" && <FiInbox size={12} color="blue" />}
        </span>
      </div>
    </div>
  );
};
