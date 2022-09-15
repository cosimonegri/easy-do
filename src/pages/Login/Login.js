import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Alert,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "contexts/auth-context";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const { login, loginWithGoogle, setAuthPersistence } = useAuth();
  const navigate = useNavigate();

  const isFormValid = () => {
    return email.length > 0 && password.length > 0;
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
          "Could not connect with the server. Check your connection or try later"
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
    setError("");
    setIsLoading(true);
    try {
      await setAuthPersistence(remember);
      console.log("Persistence setted correctly");
    } catch {
      console.log("Failed to set desired persistence");
    }
    try {
      const userCredential = await login(email, password);
      if (userCredential.user.emailVerified) {
        navigate("/app");
      } else {
        setError("You must first verify the email");
        setIsLoading(false);
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found. Check the email");
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong password");
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Could not connect with the server. Check your connection or try later"
        );
      } else {
        console.log(error);
        setError("Failed to log in");
      }
      setIsLoading(false);
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="rounded p-2 pb-1 mt-3 mb-3">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>

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

              <Row>
                <Col>
                  <Form.Group className="mb-4" controlId="checkbox">
                    <Form.Check
                      checked={remember}
                      type="checkbox"
                      label="Remember me"
                      onChange={(e) => setRemember(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>
                </Col>

                <Col className="text-end">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </Col>
              </Row>

              <Button
                className="w-100"
                variant="primary"
                type="submit"
                aria-label="login-button"
                disabled={isLoading || isLoadingGoogle || !isFormValid()}
              >
                {!isLoading ? (
                  "Log in"
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
              Need an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/signup">
                Sign up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
