import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Row, Button } from "react-bootstrap";

import { addInvitation, setInvitationToEmail } from "redux/invitations.slice";

import { isInvitationValid } from "utils/helpers/valid.helpers";

const SharePopup = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const newInvitation = useSelector((state) => state.invitations.newInvitation);

  const changeEmail = (event) => {
    dispatch(setInvitationToEmail(event.target.value));
  };

  const handleSubmitInvitation = (event) => {
    event.preventDefault();
    dispatch(addInvitation());
    handleClose();
  };

  const handleSubmitWithEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (isInvitationValid(newInvitation)) {
        handleSubmitInvitation(event);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Row className="mt-3 d-flex align-items-center">
          <Form>
            <Form.Group className="mb-3" controlId="shareEmail">
              <Form.Control
                autoFocus
                type="email"
                placeholder="Email"
                value={newInvitation.toEmail}
                onChange={changeEmail}
                onKeyPress={handleSubmitWithEnter}
                spellCheck={false}
              />
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            disabled={!isInvitationValid(newInvitation)}
            onClick={handleSubmitInvitation}
          >
            Invite
          </Button>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SharePopup;
