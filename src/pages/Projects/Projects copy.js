import React, { useState } from "react";
import { useSelector } from "react-redux";

import SingleProject from "pages/Projects/SingleProject";
import Main from "layouts/Main";
import styles from "pages/Projects/projects.module.css";

export const Projects = () => {
  const projects = useSelector((state) => state.projects.projects);
  // const [invitedUsersEmail, setInvitedUsersEmail] = useState({});

  // const { currentUser } = useAuth();

  // const handleLeaveProject = async (projectId) => {
  //   try {
  //     await deleteMembership(projectId);
  //     console.log(`Membership deleted in project ${projectId}`);
  //   } catch (error) {
  //     console.log("Could not delete membership.");
  //     console.log(error);
  //   }
  // };

  //! aggiungere motivi per il fallimento nel mandare l'invito
  // const handleSendInvitation = async (e, projectId) => {
  //   e.preventDefault();
  //   const email = invitedUsersEmail[projectId];

  //   let temp = { ...invitedUsersEmail };
  //   temp[projectId] = "";
  //   setInvitedUsersEmail(temp);

  //   if (email == currentUser.email) {
  //     console.log("You can't invite yourself.");
  //     return;
  //   }

  //   try {
  //     await addInvitation(projectId, email);
  //     console.log("Invitation sent to", email);
  //   } catch (error) {
  //     console.log("Could not send invitation to", email);
  //     console.log(error);
  //   }
  // };

  // const handleAcceptInvitation = async (projectId) => {
  //   try {
  //     await addMembership(projectId);
  //     console.log(`Membership added in project ${projectId}`);
  //   } catch (error) {
  //     console.log("Could not add membership.");
  //     console.log(error);
  //     return;
  //   }

  //   try {
  //     await deleteInvitation(projectId, currentUser.email);
  //     console.log(`Invitation deleted in project ${projectId}.`);
  //   } catch (error) {
  //     console.log("Could not delete invitation.");
  //     console.log(error);
  //   }
  // };

  // const handleDeclineInvitation = async (projectId) => {
  //   try {
  //     await deleteInvitation(projectId, currentUser.email);
  //     console.log(`Invitation deleted in project ${projectId}`);
  //   } catch (error) {
  //     console.log("Could not delete invitation.");
  //     console.log(error);
  //   }
  // };

  let myProjectElements = myProjects.map((project) => {
    return (
      <div className={styles.project} key={project.id}>
        <p className={styles["project-text"]}>
          {project.title} {project.id}
        </p>
        <button type="button" onClick={() => handleDeleteProject(project.id)}>
          Delete Project
        </button>
        <button type="button" onClick={() => handleAddTask(project.id)}>
          Add Task
        </button>
        <form onSubmit={(e) => handleSendInvitation(e, project.id)}>
          <label>Share with:</label>
          <input
            type="email"
            name="invitedUser"
            value={invitedUsersEmail[project.id] ?? ""}
            onChange={(e) => {
              let temp = { ...invitedUsersEmail };
              temp[project.id] = e.target.value;
              setInvitedUsersEmail(temp);
            }}
          />
          <button type="submit">Invite</button>
        </form>
      </div>
    );
  });

  let sharedProjectElements = memberships.map((membership) => {
    return (
      <div className={styles.project} key={membership.projectId}>
        <p className={styles["project-text"]}>{membership.projectId}</p>
        <button
          type="button"
          onClick={() => handleLeaveProject(membership.projectId)} //! trasformare in delete membership
        >
          Leave Project
        </button>
        <button
          type="button"
          onClick={() => handleAddTask(membership.projectId)}
        >
          Add Task
        </button>
      </div>
    );
  });

  const invitationElements = invitations.map((invitation) => {
    return (
      <div className={styles.project} key={invitation.projectId}>
        <p className={styles["project-text"]}>
          {invitation.fromUserId} {invitation.projectId}
        </p>
        <button
          type="button"
          onClick={() => handleAcceptInvitation(invitation.projectId)}
        >
          Accept invitation
        </button>
        <button
          type="button"
          onClick={() => handleDeclineInvitation(invitation.projectId)}
        >
          Decline invitation
        </button>
      </div>
    );
  });

  return (
    <Main>
      <div id={styles["page-header"]}>
        <h1>Projects</h1>
        <button type="button" onClick={handleAddProject}>
          Add Project
        </button>
      </div>
      <div id={styles["page-content"]}>
        {myProjectElements} {sharedProjectElements} {invitationElements}
      </div>
    </Main>
  );
};
