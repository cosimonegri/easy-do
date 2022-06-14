import React, { useState } from "react";
import DatePicker from "react-datepicker";

import Modal from "layouts/Modal";
import { useData } from "contexts/data-context";

export const AddTaskPopup = ({ handleClosing }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Modal>
      <h1>Add Task Popup</h1>
      <button onClick={handleClosing}>Close</button>
    </Modal>
  );
};

{
  /* <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="dd/MM/yyyy"
  minDate={new Date()}
/>; */
}
