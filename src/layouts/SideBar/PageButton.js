import React from "react";
import { Link } from "react-router-dom";

import { grey4 } from "utils/constants/constants";
import styles from "layouts/SideBar/pagebutton.module.css";

const PageButton = ({
  index,
  pageName,
  icon,
  blueIcon,
  showTooltip,
  hideTooltip,
}) => {
  const iconSize = 24;
  const url = "/app/" + pageName;
  const tooltipId = "toltip" + index;

  const getCapitalizedString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={styles["element-outer"]}>
      <Link
        to={url}
        className={styles["element-clickable"]}
        onMouseOver={() => showTooltip(tooltipId)}
        onMouseOut={() => hideTooltip(tooltipId)}
      >
        {window.location.pathname === url ? (
          <img src={blueIcon} width={iconSize} height={iconSize} alt="" />
        ) : (
          <img src={icon} width={iconSize} height={iconSize} alt="" />
        )}
      </Link>
      <small
        id={tooltipId}
        className={styles.tooltip}
        style={{ backgroundColor: grey4 }}
      >
        {getCapitalizedString(pageName)}
      </small>
    </div>
  );
};

export default PageButton;
