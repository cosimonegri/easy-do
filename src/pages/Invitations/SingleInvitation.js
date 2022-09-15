import React from "react";
import { useDispatch } from "react-redux";

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

import styles from "pages/Invitations/singleinvitation.module.css";

const SingleInvitation = ({ invitation }) => {
  const dispatch = useDispatch();
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
