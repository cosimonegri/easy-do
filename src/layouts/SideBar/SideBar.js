import React from "react";

import PageButton from "layouts/SideBar/PageButton";

import homeIcon from "images/home.png";
import homeBlueIcon from "images/home-blue.png";
import clockIcon from "images/clock.png";
import clockBlueIcon from "images/clock-blue.png";
import tomorrowIcon from "images/tomorrow.png";
import tomorrowBlueIcon from "images/tomorrow-blue.png";
import upcomingIcon from "images/upcoming.png";
import upcomingBlueIcon from "images/upcoming-blue.png";
import folderIcon from "images/folder.png";
import folderBlueIcon from "images/folder-blue.png";

import { grey2 } from "utils/constants";
import styles from "layouts/SideBar/sidebar.module.css";

export const SideBar = () => {
  const pageButtonsData = [
    ["home", homeIcon, homeBlueIcon],
    ["today", clockIcon, clockBlueIcon],
    ["tomorrow", tomorrowIcon, tomorrowBlueIcon],
    ["upcoming", upcomingIcon, upcomingBlueIcon],
    ["projects", folderIcon, folderBlueIcon],
  ];

  const showTooltip = (tooltipId) => {
    document.getElementById(tooltipId).style.visibility = "visible";
  };

  const hideTooltip = (tooltipId) => {
    document.getElementById(tooltipId).style.visibility = "hidden";
  };

  const pageButtons = pageButtonsData.map(
    ([pageName, icon, blueIcon], index) => {
      return (
        <PageButton
          key={index}
          index={index}
          pageName={pageName}
          icon={icon}
          blueIcon={blueIcon}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
        />
      );
    }
  );

  return (
    <nav id={styles["sidebar-outer"]}>
      <div id={styles["sidebar-inner"]} style={{ backgroundColor: "white" }}>
        {pageButtons}
      </div>

      <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
    </nav>
  );
};
