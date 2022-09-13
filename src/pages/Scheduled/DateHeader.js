import React from "react";

import {
  getTodayDate,
  getTomorrowDate,
  getDayName,
  getMonthName,
  areDatesEqual,
} from "utils/helpers/date.helpers";

const DateHeader = ({ date }) => {
  const getDateHeaderString = () => {
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();

    const extraString = areDatesEqual(date, today)
      ? "Today \u00B7"
      : areDatesEqual(date, tomorrow)
      ? "Tomorrow \u00B7"
      : "";

    return `${date.getDate()} ${getMonthName(
      date
    )} ${date.getFullYear()} \u00B7 ${extraString} ${getDayName(date)}`;
  };

  return <div>{getDateHeaderString()}</div>;
};

export default DateHeader;
