import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  clearInvitation,
  setInvitationProject,
  setInvitationFromEmail,
  resetInvitationSuccess,
  resetInvitationError,
} from "redux/invitations.slice";
import { useAuth } from "contexts/auth-context";

import Main from "layouts/Main";
import PageTitle from "components/PageTitle";
import ShareButton from "pages/ProjectPage/ShareButton";
import HoverIcon from "components/HoverIcon";
import Task from "components/Task";
import SharePopup from "components/SharePopup";

import leftIcon from "images/left.png";
import leftBlueIcon from "images/left-blue.png";

import { getToastStyle } from "utils/helpers/helpers";
import styles from "pages/ProjectPage/projectpage.module.css";

export const ProjectPage = ({ projectId, projectTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const tasksWithProject = useSelector((state) => state.tasks.tasksWithProject);
  const invitationSuccess = useSelector((state) => state.invitations.success);
  const invitationError = useSelector((state) => state.invitations.error);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const openSharePopup = () => {
    dispatch(clearInvitation());
    dispatch(setInvitationProject({ id: projectId, title: projectTitle }));
    dispatch(setInvitationFromEmail(currentUser.email));
    setShowSharePopup(true);
  };

  const getTaskElements = () => {
    const taskElements = [];
    for (let task of tasksWithProject) {
      if (task.projectId === projectId) {
        taskElements.push(
          <Task key={task.id} task={task} dateInFooter={true} />
        );
      }
    }
    return taskElements;
  };

  useEffect(() => {
    if (invitationSuccess) {
      toast.dismiss();
      toast.success(invitationSuccess, getToastStyle());
      dispatch(resetInvitationSuccess());
    }
  }, [invitationSuccess]);

  useEffect(() => {
    if (invitationError) {
      toast.dismiss();
      toast.error(invitationError, getToastStyle());
      dispatch(resetInvitationError());
    }
  }, [invitationError]);

  return (
    <Main>
      <SharePopup
        show={showSharePopup}
        handleClose={() => setShowSharePopup(false)}
      />

      <div className={styles.header}>
        <span className={styles["back-icon"]}>
          <HoverIcon
            icon={leftIcon}
            hoverIcon={leftBlueIcon}
            onClickFunction={() => navigate("/app/projects")}
          />
        </span>
        <span className={styles.title}>
          <PageTitle title={projectTitle} />
        </span>
        <ShareButton onClickFunction={openSharePopup} />
      </div>

      <div className="page-content">{getTaskElements()}</div>
    </Main>
  );
};
