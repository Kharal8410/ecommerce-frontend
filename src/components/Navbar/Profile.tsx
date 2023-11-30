import CardContent from "@mui/material/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Button from "@mui/joy/Button";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../../services/toaster.service";
import { logout } from "../../slice/authSlice";
import { resetCart } from "../../slice/productSlice";
import { resetOrder } from "../../slice/orderSlice";
import Typography from "@mui/material/Typography";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const { name, email } = useSelector(
    (state: { auth: { name: string; email: string } }) => state.auth
  );
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("persist:root");
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetOrder());
    successToast("Logged out successfully");
  };

  return (
    <div>
      <CardContent>
        <Typography style={{ fontSize: "small" }}>
          <FaUser style={{ fontSize: "small" }} />: {name}
        </Typography>
        <Typography style={{ fontSize: "small" }}>
          <MdEmail style={{ fontSize: "small" }} /> {email}
        </Typography>
      </CardContent>

      <CardOverflow>
        <Button
          className="w-100 mt-2 bg-danger"
          onClick={logoutHandler}
          fullWidth
        >
          Logout
        </Button>
      </CardOverflow>
    </div>
  );
};

export default Profile;
