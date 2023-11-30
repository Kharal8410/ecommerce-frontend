/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import NavbarComponent from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../slice/productSlice";
import axios from "axios";
import { config } from "../../config";
import { errorToast } from "../../services/toaster.service";

const Success = () => {
  const dispatch = useDispatch();
  const [orde, setOrder] = useState<any>({});
  const { order } = useSelector((state: any) => state.order);
  const { jwt } = useSelector((state: any) => state.auth);

  async function successFn() {
    try {
      const { data } = await axios.post(
        `${config.SERVER_URL}/order/${order._id}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setOrder(data);

      dispatch(resetCart());
    } catch (error) {
      errorToast("fail");
    }
    // dispatch(resetOrder());
  }

  useEffect(() => {
    successFn();
  }, []);

  return (
    <>
      <NavbarComponent />
      {orde.status === "success" && (
        <h3>
          Your payment is succesfull. Will be delivered in 2 days.
          <Link to={"/all/products"}> Continue shopping</Link>
        </h3>
      )}
    </>
  );
};

export default Success;
