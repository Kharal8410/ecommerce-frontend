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
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";

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
    <Container
      className="d-flex justify-content-center align-items-center mt-5 p-5 w-50 rounded-2"
      style={{
        backgroundColor: "lightbrown",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="d-flex">
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <img
              src="https://images.unsplash.com/photo-1573495628363-04667cedc587?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-75 rounded"
              alt=""
            />
          </Col>
          <Col xs={12} md={6}>
            <h1 className="text-center">Login</h1>
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
                    <span style={{ color: "red" }}>
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
                      type="password"
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>
                      {touched.password && errors.password}
                    </span>
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="mt-2"
                  >
                    Login
                  </Button>

                  <p className="mt-2 d-flex justify-content-between">
                    <a style={{ textDecoration: "none" }} href="../SignUp">
                      Register here..
                    </a>
                    <a style={{ textDecoration: "none" }} href="*">
                      Forget Password?
                    </a>
                  </p>

                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      textTransform: "none",
                    }}
                    fullWidth
                  >
                    <FcGoogle />
                    Continue with google
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    className="mt-2"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    <FaGithubSquare />
                    Continue with github
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
