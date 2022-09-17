import React from "react";

import {
  getTodayDate,
  getTomorrowDate,
  getDayName,
  getMonthName,
  areDatesEqual,
} from "utils/helpers/date.helpers";
import styles from "pages/Scheduled/dateheader.module.css";

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

  return <div className={styles["date-header"]}>{getDateHeaderString()}</div>;
};

export default DateHeader;
