import React, { useEffect, useState } from "react";
import Main from "layouts/Main";
import { useAuth } from "contexts/auth-context";
import { useData } from "contexts/data-context";

import styles from "pages/Projects/projects.module.css";

export const Projects = () => {
  const [invitedUsersEmail, setInvitedUsersEmail] = useState({});
  const { currentUser } = useAuth();
  const {
    myProjects,
    memberships,
    invites,
    addProject,
    deleteProject,
    addTask,
    addInvite,
    acceptInvite,
    declineInvite,
  } = useData();

  const handleAddProject = () => {
    addProject("Project"); // errors handled in the function
  };
  const handleDeleteProject = (projectId, asOwner) => {
    deleteProject(projectId, asOwner); // errors handled in the function
  };
  const handleAddTask = (projectId) => {
    addTask("Task", projectId); // errors handled in the function
  };

  const handleAddInvite = (e, projectId) => {
    e.preventDefault();
    const email = invitedUsersEmail[projectId];

    let temp = { ...invitedUsersEmail };
    temp[projectId] = "";
    setInvitedUsersEmail(temp);

    if (email != currentUser.email) {
      addInvite(email, projectId); // errors handled in the function
      console.log("Sending invite to", email);
    } else {
      console.log("You can't invite yourself");
    }
  };

  const handleAcceptInvite = (projectId) => {
    acceptInvite(projectId);
  };
  const handleDeclineInvite = (projectId) => {
    declineInvite(projectId);
  };

  let myProjectElements = myProjects.map((project) => {
    return (
      <div className={styles.project} key={project.id}>
        <p className={styles["project-text"]}>
          {project.title} {project.id}
        </p>
        <button
          type="button"
          onClick={() => handleDeleteProject(project.id, true)}
        >
          Delete Project
        </button>
        <button type="button" onClick={() => handleAddTask(project.id)}>
          Add Task
        </button>
        <form onSubmit={(e) => handleAddInvite(e, project.id)}>
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
          onClick={() => handleDeleteProject(membership.projectId, false)} // trasformare in delete membership
        >
          Delete Project
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

  let inviteElements = invites.map((invite) => {
    return (
      <div className={styles.project} key={invite.projectId}>
        <p className={styles["project-text"]}>
          {invite.fromUserId} {invite.projectId}
        </p>
        <button
          type="button"
          onClick={() => handleAcceptInvite(invite.projectId)}
        >
          Accept invite
        </button>
        <button
          type="button"
          onClick={() => handleDeclineInvite(invite.projectId)}
        >
          Decline invite
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
        {myProjectElements} {sharedProjectElements} {inviteElements}
      </div>
    </Main>
  );
};
