// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Col, Container, Form, Input, Row, Button } from "reactstrap";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <Container fluid className="login-container">
      <Row className="vh-100">
        <Col className="left-side"></Col>
        <Col className="right-side d-flex align-items-center justify-content-center">
          <div className="login-form">
            <h2>Login</h2>
            <Form>
              <Input className="mb-3" placeholder="Username" />
              <Input type="password" className="mb-3" placeholder="Password" />
              <Button color="primary" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
