/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import { successToast } from "../../services/toaster.service";

function NavbarComponent() {
  const { name, role } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("persist:root");
    dispatch(logout());
    successToast("Logged out successfully");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" variant="light">
      <Container>
        <Link to={"/products"}>
          <Navbar.Brand>ECOMM</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {role === "user" && <BsFillCartCheckFill />}
            <NavDropdown title={name} id="basic-nav-dropdown">
              <Button variant="secondary" className="w-100">
                Profile
              </Button>
              <br />
              <Button className="w-100 mt-2 bg-danger" onClick={logoutHandler}>
                Logout
              </Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
