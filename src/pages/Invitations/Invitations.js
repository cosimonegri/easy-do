import React from "react";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import PageTitle from "components/PageTitle";
import SingleInvitation from "pages/Invitations/SingleInvitation";

import styles from "pages/Invitations/invitations.module.css";

export const Invitations = () => {
  const invitations = useSelector(
    (state) => state.invitations.invitationsReceived
  );

  const getInvitationElements = () => {
    return invitations.map((invitation) => {
      return (
        <SingleInvitation key={invitation.projectId} invitation={invitation} />
      );
    });
  };

  return (
    <Main>
      <PageTitle title={"Invitations"} />
      <div id={styles["page-content"]}>{getInvitationElements()}</div>
    </Main>
  );
};
