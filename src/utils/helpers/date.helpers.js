import { DAYS, MONTHS } from "utils/constants/date.constants";

export const getTodayDate = () => {
  return new Date();
};

export const getTomorrowDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

export const getOneYearForwardDate = () => {
  let date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
};

export const getDayName = (date) => {
  return DAYS[date.getDay()];
};

export const getMonthName = (date) => {
  return MONTHS[date.getMonth()];
};

export const areDatesEqual = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isDateBefore = (date1, date2) => {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  if (year1 < year2) {
    return true;
  } else if (year1 > year2) {
    return false;
  }

  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  if (month1 < month2) {
    return true;
  } else if (month1 > month2) {
    return false;
  }

  const day1 = date1.getDate();
  const day2 = date2.getDate();
  if (day1 < day2) {
    return true;
  } else {
    return false;
  }
};

export const getPrettyDateString = (date) => {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  if (isDateBefore(date, today)) {
    return "Expired";
  } else if (areDatesEqual(date, today)) {
    return "Today";
  } else if (areDatesEqual(date, tomorrow)) {
    return "Tomorrow";
  } else {
    return `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`;
  }
};
