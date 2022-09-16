import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteInvitation } from "redux/invitations.slice";
import {
  addMembership,
  setMembershipProject,
  setMembershipUser,
} from "redux/memberships.slice";
import { useAuth } from "contexts/auth-context";

import HoverIcon from "components/HoverIcon";

import checkIcon from "images/check.png";
import checkBlueIcon from "images/check-blue.png";
import binIcon from "images/bin.png";
import binRedIcon from "images/bin-red.png";

import { MAX_PROJECTS } from "utils/constants/constants";
import { getToastStyle } from "utils/helpers/helpers";

import styles from "pages/Invitations/singleinvitation.module.css";

const SingleInvitation = ({ invitation }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const memberships = useSelector((state) => state.memberships.memberships);
  const { currentUser } = useAuth();

  const handleDeleteInvitation = () => {
    dispatch(
      deleteInvitation({
        projectId: invitation.projectId,
        toEmail: invitation.toEmail,
      })
    );
  };

  const handleAcceptInvitation = () => {
    if (projects.length + memberships.length >= MAX_PROJECTS) {
      toast.dismiss();
      toast.error(
        `You've reached the limit of ${MAX_PROJECTS} shared projects.`,
        getToastStyle()
      );
      return;
    }

    dispatch(
      setMembershipProject({
        id: invitation.projectId,
        title: invitation.projectTitle,
      })
    );
    dispatch(
      setMembershipUser({
        userId: currentUser.uid,
        userEmail: currentUser.email,
      })
    );
    dispatch(addMembership());
    handleDeleteInvitation();
  };

  const getFooter = () => {
    return `From: ${invitation.fromEmail}`;
  };

  return (
    <div className={styles["task-container"]}>
      <span className={styles["left-content"]}>
        <span className={styles["main-part"]}>{invitation.projectTitle}</span>
        <span className={styles["footer-part"]}>{getFooter()}</span>
      </span>

      <span className={styles["right-content"]}>
        <span className={styles["check-icon"]}>
          <HoverIcon
            icon={checkIcon}
            hoverIcon={checkBlueIcon}
            onClickFunction={handleAcceptInvitation}
          />
        </span>
        <HoverIcon
          icon={binIcon}
          hoverIcon={binRedIcon}
          onClickFunction={handleDeleteInvitation}
        />
      </span>
    </div>
  );
};

export default SingleInvitation;
