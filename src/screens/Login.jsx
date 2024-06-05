import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Col, Container, Form, Input, Row, Button } from "reactstrap";
import axiosClient from "../client/axios-client";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", { username: email, password });
      console.log("response", response);
      login(); 
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
        <Col className="left-side"></Col>
        <Col className="right-side d-flex align-items-center justify-content-center">
          <div className="login-form">
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <Input 
                className="mb-3" 
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input 
                type="password" 
                className="mb-3" 
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button color="primary" type="submit">
                Login
              </Button>
              <Button
                color="primary"
                onClick={handleCreateAccount}
                style={{ marginLeft: 20 }}
              >
                Create new account
              </Button>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
