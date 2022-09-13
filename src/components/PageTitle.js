import React from "react";

import { getMonthName } from "utils/helpers/date.helpers";
import styles from "components/pagetitle.module.css";

const PageTitle = ({ title, footerDate }) => {
  const getFooter = () => {
    if (!footerDate) {
      return "";
    } else {
      return `${footerDate.getDate()} ${getMonthName(footerDate)}`;
    }
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <span className={styles.footer}>{getFooter()}</span>
    </div>
  );
};

export default PageTitle;
