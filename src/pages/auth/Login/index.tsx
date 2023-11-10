/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField } from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { string, object } from "yup";
import { AuthInterface } from "../../../interface/auth.interface";
import { successToast } from "../../../services/toaster.service";
import { Formik } from "formik";
import { postData } from "../../../services/axios.service";
import { login } from "../../../slice/authSlice";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authValidationSchema = object({
    email: string().email().required("Email is a required field"),
    password: string()
      .min(8, "Minimum length of password should be 8")
      .required("Password is a required field."),
  });
  const loginHandler = async (values: AuthInterface) => {
    const resp = await postData("/auth/login", values);
    if (resp.status === "success") {
      const data = {
        jwt: resp.token,
        role: resp.authData.role,
        email: resp.authData.email,
        name: resp.authData.name,
      };
      dispatch(login(data));
      if (resp.authData.role === "admin") {
        navigate("/products");
      } else if (resp.authData.role === "user") {
        navigate("/all/products");
      }

      successToast("User logged in successfully");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center full-height">
      <Container
        className="p-3"
        style={{
          backgroundColor: "lightbrown",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
            <h1>Login</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={authValidationSchema}
              onSubmit={loginHandler}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <TextField
                      id="email"
                      label="Email"
                      required
                      fullWidth
                      onBlur={handleBlur}
                      variant="standard"
                      placeholder="Enter Email Here"
                      autoFocus
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {touched.email && errors.email}
                    </span>
                  </div>
                  <div className="mb-4">
                    <TextField
                      id="password"
                      label="Password"
                      required
                      fullWidth
                      onBlur={handleBlur}
                      variant="standard"
                      placeholder="Enter Password Here"
                      autoFocus
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {touched.password && errors.password}
                    </span>
                  </div>
                  <Button type="submit" variant="contained" fullWidth>
                    Login
                  </Button>
                  <p>
                    Don't have an account? <a href="../SignUp">Signup</a>
                  </p>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
