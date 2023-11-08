/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { successToast, warningToast } from "../../../services/toaster.service";

import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/axios.service";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const registerSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      warningToast("Password And Confirm Password Must Be Same");
    } else {
      const data = {
        name,
        password,
        email,
      };
      const response = await postData("/auth/register", data);
      if (response.status) {
        navigate("/");
        successToast(response.message);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center full-height p-5">
      <Container
        className="p-3"
        style={{
          backgroundColor: "lightbrown",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Row className="d-flex w-100">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <img
              src="https://images.unsplash.com/photo-1573495628363-04667cedc587?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-75 rounded"
              alt=""
            />
          </Col>
          <Col xs={12} md={6} className="my-auto">
            <h1>Sign Up</h1>
            <Form onSubmit={registerSubmitHandler}>
              <TextField
                id="name"
                label="Name"
                className="mb-4"
                required
                fullWidth
                variant="standard"
                placeholder="Enter Name Here"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                label="Email"
                className="mb-4"
                required
                fullWidth
                variant="standard"
                placeholder="Enter Email Here"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                className="mb-4"
                required
                fullWidth
                variant="standard"
                placeholder="Enter Password Here"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                className="mb-4"
                required
                fullWidth
                variant="standard"
                placeholder="Confirm Your Password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mb-2"
              >
                Sign Up
              </Button>
              <p>
                Already have an account? <a href="../">Login</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
