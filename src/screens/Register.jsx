import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Col, Container, Form, Input, Row, Button } from "reactstrap";
import "./Login.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterAccount = () => {
    login();
    navigate("/dashboard");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="login-container">
      <Row className="vh-100">
        <Col className="left-side"></Col>
        <Col className="right-side d-flex align-items-center justify-content-center">
          <div className="login-form">
            <h2>Register</h2>
            <Form>
              <Input className="mb-3" placeholder="Email" />
              <Input type="password" className="mb-3" placeholder="Password" />
              <Button color="primary" onClick={handleRegisterAccount}>
                Register
              </Button>
              <Button
                color="primary"
                onClick={handleLogin}
                style={{ marginLeft: 20 }}
              >
                Log into existing account
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
