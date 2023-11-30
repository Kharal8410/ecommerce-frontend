/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
// import { logout } from "../../slice/authSlice";
// import { successToast } from "../../services/toaster.service";
// import { resetCart } from "../../slice/productSlice";
// import { resetOrder } from "../../slice/orderSlice";
import Search from "../Search";
import Profile from "./Profile";
import IconButton from "@mui/joy/IconButton";
import { FaUser } from "react-icons/fa";

function NavbarComponent() {
  const { role } = useSelector(
    (state: { auth: { name: string; role: string } }) => state.auth
  );

  // const dispatch = useDispatch();

  // const logoutHandler = () => {
  //   localStorage.removeItem("persist:root");
  //   dispatch(logout());
  //   dispatch(resetCart());
  //   dispatch(resetOrder());
  //   successToast("Logged out successfully");
  // };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#1F7A1F" }}>
      <Container>
        <Link to={"/products"} className="text-decoration-none">
          <Navbar.Brand className="text-light">Bazzar</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Search />
          <Nav className="ms-auto ">
            {role === "user" && (
              <Link to={"/cart"} className="text-light">
                <RiShoppingCart2Fill />
              </Link>
            )}
          </Nav>

          <NavDropdown
            title="Profile"
            id="basic-nav-dropdown"
            align="end"
            className="ms-2"
            style={{ color: "white" }}
          >
            <Profile />
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
