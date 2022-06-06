import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

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

import { grey2, grey4 } from "utils/constants";
import styles from "layouts/Sidebar/sidebar.module.css";

export const Sidebar = () => {
  const { currentUser } = useAuth(); // to write project list
  const iconSize = 24;

  const pages = [
    ["home", homeIcon, homeBlueIcon],
    ["today", clockIcon, clockBlueIcon],
    ["tomorrow", tomorrowIcon, tomorrowBlueIcon],
    ["upcoming", upcomingIcon, upcomingBlueIcon],
    ["projects", folderIcon, folderBlueIcon],
  ];

  const show = (tooltip) => {
    document.getElementById(tooltip).style.visibility = "visible";
  };

  const hide = (tooltip) => {
    document.getElementById(tooltip).style.visibility = "hidden";
  };

  const sidebarElements = pages.map(([page, icon, blueIcon], index) => {
    let url = page === "home" ? "/app" : "/app/" + page;
    let id = "tooltip" + index;
    return (
      <div key={index} className={styles["element-outer"]}>
        <Link
          to={url}
          className={styles["element-clickable"]}
          onMouseOver={() => show(id)}
          onMouseOut={() => hide(id)}
        >
          {window.location.pathname === url ? (
            <img src={blueIcon} width={iconSize} height={iconSize} alt="" />
          ) : (
            <img src={icon} width={iconSize} height={iconSize} alt="" />
          )}
        </Link>
        <small
          id={id}
          className={styles.tooltip}
          style={{ backgroundColor: grey4 }}
        >
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </small>
      </div>
    );
  });

  return (
    <nav id={styles["sidebar-outer"]}>
      <div id={styles["sidebar-inner"]} style={{ backgroundColor: "white" }}>
        {sidebarElements}
      </div>
      <div id={styles.divider} style={{ backgroundColor: grey2 }}></div>
    </nav>
  );
};
