import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Col, Container, Form, Input, Row, Button } from "reactstrap";
import axiosClient from "../client/axios-client";
import "./Login.css";

const LoginForm = ({ onSubmit, onCreateAccount, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return isEmailValid(email) && password;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      onSubmit(null, "Please ensure all fields are filled correctly.");
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        className="mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        className="mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="d-grid gap-2">
        <Button color="primary" type="submit" disabled={!isFormValid()}>
          Login
        </Button>
        <Button color="secondary" onClick={onCreateAccount}>
          Create new account
        </Button>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (credentials) => {
    if (!credentials) {
      setError("Please ensure all fields are filled correctly.");
      return;
    }

    try {
      const response = await axiosClient.post("/auth/login", {
        username: credentials.email,
        password: credentials.password,
      });
      console.log("response", response);
      login(credentials.email);
      navigate("/dashboard");
    } catch (error) {
      console.error("error", error);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <Container fluid className="login-container">
      <Row className="vh-100">
        <Col md="6" className="left-side d-none d-md-flex">
          <h1>Welcome Back!</h1>
        </Col>
        <Col
          xs="12"
          md="6"
          className="right-side d-flex align-items-center justify-content-center"
        >
          <div className="login-form">
            <h2>Login</h2>
            <LoginForm
              onSubmit={handleLogin}
              onCreateAccount={handleCreateAccount}
              error={error}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
