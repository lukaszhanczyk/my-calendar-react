import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Col, Container, Form, Input, Row, Button } from "reactstrap";
import axiosClient from "../client/axios-client";
import "./Register.css";

const RegisterForm = ({ onSubmit, onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      isEmailValid(email) &&
      password &&
      verifyPassword &&
      password === verifyPassword
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      onSubmit(null, "Please ensure all fields are filled correctly.");
      return;
    }
    onSubmit({ email, password, verifyPassword });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        className="mb-3 input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        className="mb-3 input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        className="mb-3 input"
        placeholder="Verify Password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <div className="d-grid gap-2 buttons-container">
        <Button
          className={`button login ${isFormValid() ? "login-valid" : ""}`}
          type="submit"
          disabled={!isFormValid()}
        >
          Register
        </Button>
        <Button className="button button-secondary" onClick={onLogin}>
          Log into existing account
        </Button>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleRegister = async (credentials) => {
    if (!credentials) {
      setError("Please ensure all fields are filled correctly.");
      return;
    }

    try {
      const response = await axiosClient.post("/auth/register", {
        email: credentials.email,
        password: credentials.password,
        verify_password: credentials.verifyPassword,
      });
      console.log("response", response);
      navigate("/login");
    } catch (error) {
      console.error("error", error);
      setError(
        "Failed to register. Please check your credentials and try again."
      );
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="login-container">
      <Row className="vh-100">
        <Col md="6" className="left-side d-none d-md-flex">
          <h1>Let's Get Started!</h1>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </Col>
        <Col
          xs="12"
          md="6"
          className="right-side d-flex align-items-center justify-content-center"
        >
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="login-form">
            <h2>Register</h2>
            <RegisterForm
              onSubmit={handleRegister}
              onLogin={handleLogin}
              error={error}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
