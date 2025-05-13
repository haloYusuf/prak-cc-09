import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Ganti useHistory dengan useNavigate
import axios from "axios";
import { BASE_URL } from "../utils/utils.js";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // Menyimpan error jika registrasi gagal
  const navigate = useNavigate(); // Untuk melakukan redirect setelah berhasil registrasi

  const handleRegister = async (e) => {
    e.preventDefault();

    // Cek jika password dan konfirmasi password tidak cocok
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok");
      return;
    }

    try {
      // Panggil API untuk registrasi
      const response = await axios.post(`${BASE_URL}/register`, {
        email,
        password,
      });
      if (response) {
        // Jika registrasi berhasil, arahkan ke halaman login
        navigate("/"); // Redirect ke halaman login
      }
    } catch (e) {
      setError("Gagal mendaftar. Silakan coba lagi!", e); // Menampilkan error jika registrasi gagal
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
                <h2 style={{ color: "#3a5a99" }}>Daftar</h2>
              </div>
              <Form onSubmit={handleRegister}>
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
                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label style={{ color: "#6c757d" }}>
                    Konfirmasi Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Konfirmasi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      borderColor: "#3a5a99",
                      borderRadius: "0.375rem",
                      backgroundColor: "#e9eff6",
                    }}
                  />
                </Form.Group>
                {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                {/* Menampilkan error */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2"
                  style={{ backgroundColor: "#3a5a99", borderColor: "#3a5a99" }}
                >
                  Daftar
                </Button>
              </Form>
              <p className="mt-3 text-center" style={{ color: "#6c757d" }}>
                Sudah punya akun?{" "}
                <Link to="/" style={{ color: "#3a5a99" }}>
                  Masuk di sini
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
