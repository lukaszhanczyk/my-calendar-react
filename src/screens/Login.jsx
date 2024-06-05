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

  const handleLogin = (event) => {
    axiosClient
      .post("/auth/login", { username: email, password })
      .then((response) => {
        console.log("response", response);
        login();
      })
      .catch((error) => {
        console.log("error", error);
      });
    navigate("/dashboard");
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
            <Form>
              <Input className="mb-3" placeholder="Email" />
              <Input type="password" className="mb-3" placeholder="Password" />
              <Button color="primary" onClick={handleLogin}>
                Login
              </Button>
              <Button
                color="primary"
                onClick={handleCreateAccount}
                style={{ marginLeft: 20 }}
              >
                Create new account
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
