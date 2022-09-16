import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import Textarea from "components/Textarea";

import { addInvitation, setInvitationToEmail } from "redux/invitations.slice";

import { isInvitationValid } from "utils/helpers/valid.helpers";
import styles from "components/sharepopup.module.css";

const SharePopup = ({ show, close }) => {
  const dispatch = useDispatch();
  const newInvitation = useSelector((state) => state.invitations.newInvitation);

  const changeEmail = (event) => {
    dispatch(setInvitationToEmail(event.target.value));
  };

  const handleSubmitInvitation = (event) => {
    event.preventDefault();
    if (isInvitationValid(newInvitation)) {
      dispatch(addInvitation());
      close();
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Body>
        <Textarea
          text={newInvitation.toEmail}
          onChangeFunction={changeEmail}
          onSubmitFunction={handleSubmitInvitation}
          placeholder="Email"
          rows={1}
        />

        <div id={styles["buttons-row"]}>
          <Button
            id={styles["cancel-btn"]}
            type="button"
            onClick={close}
            variant="outline-secondary"
          >
            Cancel
          </Button>

          <button
            id={styles["submit-btn"]}
            type="submit"
            onClick={handleSubmitInvitation}
            disabled={!isInvitationValid(newInvitation)}
          >
            Invite
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SharePopup;
