import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";

import { setNewTaskDueDate } from "redux/tasks.slice";

const ChooseDateDropdown = () => {
  const dispatch = useDispatch();
  const newTask = useSelector((state) => state.tasks.newTask);

  const changeDueDate = (date) => {
    dispatch(setNewTaskDueDate(date));
  };

  return (
    <DatePicker
      selected={newTask.dueDate}
      onChange={changeDueDate}
      dateFormat="dd MMM yyyy"
      minDate={new Date()}
      calendarStartDay={1}
      inline
    />
  );
};

export default ChooseDateDropdown;
