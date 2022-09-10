import React from "react";
import Main from "layouts/Main";
import { useData } from "hooks/useData";

import { Task } from "components/Task";
import { Weekdays, Months } from "utils/constants";

export const Today = () => {
  const { tasks } = useData();

  const date = new Date();
  const taskElements = tasks.map((task) => {
    return (
      <div key={task["id"]}>
        <Task task={task} />
        <hr className="divider" />
      </div>
    );
  });

  return (
    <Main>
      <header className="page-header">
        <h3 style={{ display: "inline", fontSize: "20px" }}>Today</h3>
        <p className="date">
          {Weekdays[date.getDay()]} {date.getDate()} {Months[date.getMonth()]}
        </p>
      </header>
      <div className="page-content">{taskElements}</div>
    </Main>
  );
};
