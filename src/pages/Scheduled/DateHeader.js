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
      ? "\u00B7 Today"
      : areDatesEqual(date, tomorrow)
      ? "\u00B7 Tomorrow"
      : "";

    return `${date.getDate()} ${getMonthName(
      date
    )} ${date.getFullYear()} \u00B7 ${getDayName(date)} ${extraString}`;
  };

  return <div>{getDateHeaderString()}</div>;
};

export default DateHeader;
