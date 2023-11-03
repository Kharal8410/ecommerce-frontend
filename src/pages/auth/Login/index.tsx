/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "../../../services/toaster.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginSubmitHandeler = async (e: any) => {
    e.preventDefault();
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data
      );
      if (response.data.status) {
        navigate("/dashboard");
        successToast(response.data.message);
      }
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={loginSubmitHandeler}>
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
          autoFocus
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <p>Don't have an account? <a href="../SignUp">Signup</a> </p>
      </Form>
    </Container>
  );
};

export default Login;
