import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Alert,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "contexts/auth-context";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const { signup, loginWithGoogle, emailVerification, setAuthPersistence } =
    useAuth();

  const isFormValid = () => {
    return (
      email.length > 0 && password.length > 0 && confirmPassword.length > 0
    );
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoadingGoogle(true);

    try {
      await loginWithGoogle();
    } catch (error) {
      if (error.code === "auth/internal-error") {
        setError(
          "Could not connect with the server.Check your connection or try later"
        );
      } else {
        console.log(error);
        setError("Failed to log in with Google");
      }
      setIsLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      setAuthPersistence(remember);
      console.log("Persistence setted correctly");
    } catch {
      console.log("Failed to set desired persistence");
    }

    try {
      await signup(email, password);

      try {
        await emailVerification();
        setMessage("Verfication email sent to " + email);
      } catch (error) {
        setError("Failed to send verification email");
      }

      // try {
      //   await createUserData(
      //     userCredential.user.uid,
      //     userCredential.user.email
      //   );
      //   console.log("successfully initialized account data");
      // } catch (error) {
      //   setError("Failed to create user data");
      //   console.log("failed to create user data");
      // }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Could not connect with the server. Check your connection or try later"
        );
      } else {
        console.log(error);
        setError("Failed to sign in");
      }
    }

    setIsLoading(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="rounded p-2 pb-1 mt-3 mb-3">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>

            <Button
              className="w-100"
              variant="outline-primary"
              type="button"
              disabled={isLoading || isLoadingGoogle}
              onClick={handleGoogle}
            >
              Continue with Google
            </Button>

            <Row className="mt-3 mb-3 d-flex align-items-center">
              <Col xs="5" style={{ paddingRight: 0 }}>
                <hr />
              </Col>
              <Col>
                <div className="w-100 text-center" style={{ color: "grey" }}>
                  OR
                </div>
              </Col>
              <Col xs="5" style={{ paddingLeft: 0 }}>
                <hr />
              </Col>
            </Row>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" id="email">
                <Form.Control
                  autoFocus
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" id="psw">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" id="confirm-psw">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="checkbox">
                <Form.Check
                  checked={remember}
                  type="checkbox"
                  label="Remember me"
                  onChange={(e) => setRemember(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button
                className="w-100"
                variant="primary"
                type="submit"
                disabled={isLoading || isLoadingGoogle || !isFormValid()}
              >
                {!isLoading ? (
                  "Sign up with Email"
                ) : (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </Button>
            </Form>

            <hr />

            <div className="w-100 text-center" style={{ fontSize: "15px" }}>
              Already have an account?{" "}
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

export default Signup;
