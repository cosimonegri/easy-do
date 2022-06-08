import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Alert, Card, Form, Button } from "react-bootstrap";
import { useAuth } from "contexts/auth-context";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setMessage("Check your email inbox to change the password");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found. Check the email");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Could not connect with the server. Check your connection or try later"
        );
      } else {
        console.log(error);
        setError("Failed to reset password");
      }
    }

    setIsLoading(false);
  };

  const isFormValid = () => {
    return email.length > 0;
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="rounded p-2 mt-3">
          <Card.Body>
            <h2 className="text-center mb-4">Forgot your password?</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" id="email">
                <Form.Control
                  autoFocus
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button
                className="w-100"
                variant="primary"
                type="submit"
                disabled={isLoading || !isFormValid()}
              >
                Reset password
              </Button>
            </Form>

            <hr />

            <div className="w-100 text-center" style={{ fontSize: "15px" }}>
              <Link style={{ textDecoration: "none" }} to="/login">
                Go to login
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
