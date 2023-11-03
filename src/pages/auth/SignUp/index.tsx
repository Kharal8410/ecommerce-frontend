/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../services/toaster.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerSubmitHandeler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      warningToast("Password And Confirm Password Must Be Same");
    } else {
      const data = {
        name,
        password,
        email,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          data
        );
        if (response.data.status) {
          navigate("/");
          successToast(response.data.message);
        }
      } catch (error: any) {
        errorToast(error.response.data.error);
      }
    }
  };

  return (
    
     <Container className="d-flex gap-5 justify-content-center p-2 align-items-center">
       <img
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="  w-25 rounded"
          alt=""
        />
      
        <Row className="d-flex w-50">
          <Col xs={12} md={12} className="my-auto">
            <h1>Sign Up</h1>
            <Form onSubmit={registerSubmitHandeler}>
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
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="conformPassword"
                label="Conform Password"
                className="mb-4"
                required
                fullWidth
                variant="standard"
                placeholder="Conform Your Password"
                autoFocus
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" fullWidth>
                Sign Up
              </Button>
              <p>
                Already have an account? <a href="../">Login</a>{" "}
              </p>
            </Form>
          </Col>
        </Row>
      
      
       
      
     </Container>
      
    
  );
};

export default SignUp;
