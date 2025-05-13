import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      console.log(response);
      if (response) {
        navigate("/notes");
      }
    } catch (e) {
      setError("Email atau password salah!", e);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg" style={{ backgroundColor: "#f4f7fb" }}>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 style={{ color: "#3a5a99" }}>Login</h2>
              </div>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label style={{ color: "#6c757d" }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderColor: "#3a5a99",
                      borderRadius: "0.375rem",
                      backgroundColor: "#e9eff6",
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label style={{ color: "#6c757d" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderColor: "#3a5a99",
                      borderRadius: "0.375rem",
                      backgroundColor: "#e9eff6",
                    }}
                  />
                </Form.Group>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2"
                  style={{ backgroundColor: "#3a5a99", borderColor: "#3a5a99" }}
                >
                  Login
                </Button>
              </Form>
              <p className="mt-3 text-center" style={{ color: "#6c757d" }}>
                Belum punya akun?{" "}
                <Link to="/register" style={{ color: "#3a5a99" }}>
                  Daftar di sini
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
